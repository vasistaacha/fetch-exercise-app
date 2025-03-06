import React from "react";
import { useAppContext } from "../context/AppContextInstance";
import DogCard from "./DogCard";

const FavoritesList = () => {
  const { favorites, dogs, dispatch } = useAppContext();
  console.log(useAppContext());
  const favoritedDogs = dogs.filter((dog) => favorites.includes(dog.id));
  const handleFavorite = (dogId) => {
    if (favorites.includes(dogId)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: dogId });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: dogId });
    }
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favoritedDogs.length > 0 ? (
        favoritedDogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={true}
            onFavorite={handleFavorite}
          />
        ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
