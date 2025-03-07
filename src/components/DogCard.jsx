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
          height: 300, // Set a fixed height for the card
          margin: "16px",
          position: "relative",
          transition: "0.3s", // Smooth transition for hover effect
          boxShadow: isFavorite
            ? "0 0 10px rgba(0, 255, 4, 0.5)"
            : "0 0 5px rgba(0, 0, 0, 0.2)", // Shadow for favorite
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 72, 255, 0.53)"; // Glow effect on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isFavorite
            ? "0 0 10px rgba(0, 255, 4, 0.5)"
            : "0 0 5px rgba(0, 0, 0, 0.2)"; // Reset shadow
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={dog.img}
          alt={dog.name}
          onClick={handleClickOpen} // Open dialog on image click
          style={{ cursor: "pointer" }} // Change cursor to pointer
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
          onClick={handleFavoriteClick} // Updated click handler
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px", // Make the button stretch across the bottom
          }} // Position the button at the bottom
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

      {/* Snackbar for displaying the message */}
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
