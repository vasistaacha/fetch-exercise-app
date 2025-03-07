import React from "react";
import { useAppContext } from "../context/AppContextInstance";
import DogCard from "../components/DogCard";
import SearchFilters from "../components/SearchFilters";
import { Container, Typography, Grid } from "@mui/material";
import Pagination from "./Pagination";

const SearchPage = () => {
  const { dogs, favorites, dispatch } = useAppContext();

  const handleFavorite = (dogId) => {
    if (favorites.includes(dogId)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: dogId });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: dogId });
    }
  };

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Search Dogs
      </Typography>
      <SearchFilters />
      <Grid container spacing={0}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={8} md={4} lg={3} key={dog.id}>
            <DogCard
              dog={dog}
              isFavorite={favorites.includes(dog.id)}
              onFavorite={handleFavorite}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination />
    </Container>
  );
};

export default SearchPage;
