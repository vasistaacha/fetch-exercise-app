import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContextInstance";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const MatchResult = () => {
  const { matchedDog, generateMatch } = useAppContext();

  // Call generateMatch when the component mounts
  useEffect(() => {
    generateMatch();
  }, [generateMatch]);

  // Find the matched dog from the list of dogs

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={generateMatch} // Ensure this is correctly set
        style={{ marginBottom: "20px" }}
      >
        Generate New Match
      </Button>
      <Typography variant="h4" gutterBottom>
        Your Match
      </Typography>
      {matchedDog ? (
        <Card style={{ width: "50%", maxHeight: "600px" }}>
          <CardMedia
            component="img"
            height="300"
            image={matchedDog.img}
            alt={matchedDog.name}
            style={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h5">{matchedDog.name}</Typography>
            <Typography variant="body1">Breed: {matchedDog.breed}</Typography>
            <Typography variant="body1">Age: {matchedDog.age}</Typography>
            <Typography variant="body1">
              Zip Code: {matchedDog.zip_code}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          No match found.
        </Typography>
      )}
    </div>
  );
};

export default MatchResult;
