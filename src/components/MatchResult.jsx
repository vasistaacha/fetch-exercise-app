import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContextInstance";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
} from "@mui/material";

const MatchResult = () => {
  const { matchedDog, generateMatch, dataLoading } = useAppContext();

  useEffect(() => {
    generateMatch();
  }, [generateMatch]);

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
        onClick={generateMatch}
        style={{ marginBottom: "20px" }}
      >
        Generate New Match
      </Button>
      <Typography variant="h4" gutterBottom>
        Your Match
      </Typography>
      {dataLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : matchedDog ? (
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
