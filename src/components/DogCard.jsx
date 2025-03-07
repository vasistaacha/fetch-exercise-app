import React, { useState } from "react";
import { useAppContext } from "../context/AppContextInstance";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";

const DogCard = ({ dog, isFavorite, onFavorite }) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { favorites } = useAppContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent dialog from opening when clicking the button
    if (favorites.length > 100) {
      setSnackbarOpen(true); // Show snackbar if favorites exceed 100
    } else {
      onFavorite(dog.id); // Call the onFavorite function if under limit
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 345,
          height: 400,
          margin: "16px",
          position: "relative",
          transition: "0.3s",
          boxShadow: isFavorite
            ? "0 0 10px rgba(0, 255, 4, 0.5)"
            : "0 0 5px rgba(0, 0, 0, 0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 72, 255, 0.53)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isFavorite
            ? "0 0 10px rgba(0, 255, 4, 0.5)"
            : "0 0 5px rgba(0, 0, 0, 0.2)";
        }}
      >
        <CardMedia
          component="img"
          height="210"
          image={dog.img}
          alt={dog.name}
          onClick={handleClickOpen}
          style={{ cursor: "pointer" }}
        />
        <CardContent>
          <Typography variant="h5">{dog.name}</Typography>
          <Typography variant="body2">Breed: {dog.breed}</Typography>
          <Typography variant="body2">Age: {dog.age}</Typography>
          <Typography variant="body2">Zip Code: {dog.zip_code}</Typography>
        </CardContent>
        <Button
          variant="contained"
          color={isFavorite ? "secondary" : "primary"}
          onClick={handleFavoriteClick}
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px",
          }}
        >
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dog.name}</DialogTitle>
        <DialogContent>
          <img
            src={dog.img}
            alt={dog.name}
            style={{ width: "100%", height: "auto" }}
          />
          <Typography variant="body1">Breed: {dog.breed}</Typography>
          <Typography variant="body1">Age: {dog.age}</Typography>
          <Typography variant="body1">Zip Code: {dog.zip_code}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => onFavorite(dog.id)}>
            {isFavorite ? "Remove Favorite" : "Add Favorite"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="You can only have upto 100 favorites."
      />
    </>
  );
};

export default DogCard;
