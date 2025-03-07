import React from "react";
import { useAppContext } from "../context/AppContextInstance";
import Select from "react-select";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  Grid,
} from "@mui/material";

const SearchFilters = () => {
  const { dispatch, filters, breeds } = useAppContext();
  const [field, sortOrder] = filters.sort.split(":");

  const handleFilterChanges = (e) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...filters, [e.target.name]: e.target.value },
    });
  };

  const handleChange = (selectedOptions) => {
    const selectedBreeds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    if (selectedBreeds.includes("All")) {
      dispatch({
        type: "FILTER_BREEDS",
        payload: breeds,
      });
    } else {
      dispatch({
        type: "FILTER_BREEDS",
        payload: selectedBreeds,
      });
    }
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_FILTERS",
      payload: {
        ...filters,
        sort:
          name === "sortOrder" ? `${field}:${value}` : `${value}:${sortOrder}`,
      },
    });
  };

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel id="breed-select-label">Select Breeds</InputLabel>
        <Select
          isMulti
          options={breeds.map((a) => ({ value: a, label: a }))}
          onChange={handleChange}
          closeMenuOnSelect={false} // Keeps the menu open after selection
          placeholder="Select breeds..."
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "white", // Set background color to white
              zIndex: 1000, // Ensure it appears above other elements
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 1000, // Ensure the dropdown menu appears above other elements
            }),
          }}
        />
      </FormControl>

      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="number"
            name="ageMin"
            label="Min Age"
            onChange={handleFilterChanges}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="number"
            name="ageMax"
            label="Max Age"
            onChange={handleFilterChanges}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="sortField-label">Sort By</InputLabel>
            <MuiSelect
              id="sortField"
              name="sortField"
              value={field}
              onChange={handleSortChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    zIndex: 1300, // Ensure the dropdown appears above other elements
                  },
                },
              }}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="breed">Breed</MenuItem>
              <MenuItem value="age">Age</MenuItem>
            </MuiSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="sortOrder-label">Sort Order</InputLabel>
            <MuiSelect
              id="sortOrder"
              name="sortOrder"
              value={sortOrder}
              onChange={handleSortChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    zIndex: 1300, // Ensure the dropdown appears above other elements
                  },
                },
              }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </MuiSelect>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchFilters;
