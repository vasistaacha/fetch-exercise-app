import React from "react";
import { useAppContext } from "../context/AppContextInstance";
import DogCard from "../components/DogCard";
import SearchFilters from "../components/SearchFilters";

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
    <div>
      <h1>Search Dogs</h1>
      <SearchFilters />
      <div>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            onFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
