import React from "react";
import { useAppContext } from "../context/AppContextInstance";

const MatchResult = () => {
  const { matchedDog, dogs, generateMatch } = useAppContext();

  // Find the matched dog from the list of dogs
  const matchedDogDetails = dogs.find((dog) => dog.id === matchedDog);

  return (
    <div>
      <button onClick={generateMatch}>Generate Match</button>
      <h1>Your Match</h1>
      {matchedDogDetails ? (
        <div>
          <img src={matchedDogDetails.img} alt={matchedDogDetails.name} />
          <h2>{matchedDogDetails.name}</h2>
          <p>Breed: {matchedDogDetails.breed}</p>
          <p>Age: {matchedDogDetails.age}</p>
        </div>
      ) : (
        <p>No match found.</p>
      )}
    </div>
  );
};

export default MatchResult;
