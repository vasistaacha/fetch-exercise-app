import React from "react";

const DogCard = ({ dog, isFavorite, onFavorite }) => {
  return (
    <div>
      <img src={dog.img} alt={dog.name} />
      <h2>{dog.name}</h2>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <button onClick={() => onFavorite(dog.id)}>
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  );
};

export default DogCard;
