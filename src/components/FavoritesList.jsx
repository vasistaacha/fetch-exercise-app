import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContextInstance";
import DogCard from "./DogCard";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";

const FavoritesList = () => {
  const { favorites, dispatch, fetchDogsWithID, favoritesData, dataLoading } =
    useAppContext();

  useEffect(() => {
    fetchDogsWithID(favorites);
  }, [favorites, fetchDogsWithID]);

  const handleFavorite = (dogId) => {
    if (favorites.includes(dogId)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: dogId });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: dogId });
    }
  };

  return (
    <div>
      {dataLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={4}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Favorites
            </Typography>
          </Box>
          {favoritesData.length > 0 ? (
            <Grid container spacing={2}>
              {favoritesData.map((dog) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
                  <DogCard
                    dog={dog}
                    isFavorite={true}
                    onFavorite={handleFavorite}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No favorites added yet.</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesList;
