import React from "react";
import { useAppContext } from "../context/AppContextInstance";
import Select from "react-select";

const SearchFilters = () => {
  const { dispatch, filters, breeds } = useAppContext();
  const [field, sortOrder] = filters.sort.split(":");
  const handleFilterChanges = (e) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...filters, [e.target.name]: e.target.value },
    });
  };

  const handleChange = (e) => {
    const selectedBreeds = e ? e.map((option) => option.value) : ["All"];

    if (selectedBreeds.includes("All")) {
      dispatch({
        type: "FILTER_BREEDS",
        payload: [],
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
    console.log(
      `${field}      varName: ${name}     , varValue: ${value}                 ,        ${sortOrder}`
    );
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
      <Select
        isMulti
        options={breeds.map((a) => ({ value: a, label: a }))}
        onChange={handleChange}
        closeMenuOnSelect={false} // Keeps the menu open after selection
        placeholder="Select genres..."
      />
      <input
        type="number"
        name="ageMin"
        placeholder="Min Age"
        onChange={handleFilterChanges}
      />
      <input
        type="number"
        name="ageMax"
        placeholder="Max Age"
        onChange={handleFilterChanges}
      />
      <label htmlFor="sortField">Sort By:</label>
      <select
        id="sortField"
        name="sortField"
        value={field}
        onChange={handleSortChange}
      >
        <option value="name">Name</option>
        <option value="breed">Breed</option>
        <option value="age">Age</option>
      </select>

      <label htmlFor="sortOrder">Sort Order:</label>
      <select
        id="sortOrder"
        name="sortOrder"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </>
  );

  //   return (
  //     <div>
  //       <select name="breed" multiple={true} onChange={handleChange}>
  //         <option value="All">Select All</option>
  //         {breeds.map((breed) => (
  //           <option key={breed} value={breed}>
  //             {breed}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //   );
};

export default SearchFilters;
