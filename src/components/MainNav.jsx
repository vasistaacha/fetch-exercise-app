import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Snackbar } from "@mui/material";
import { useAppContext } from "../context/AppContextInstance";

export default function MainNav() {
  const { user, logout, favorites } = useAppContext(); // Assuming favorites is part of your context
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control snackbar visibility

  const handleLogout = async () => {
    await logout(user.name, user.email);
    navigate("/");
  };

  const handleMatchClick = () => {
    if (favorites.length === 0) {
      setSnackbarOpen(true); // Show snackbar if no favorites are selected
    } else {
      navigate("/match"); // Navigate to match page if favorites exist
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dog Adoption App
        </Typography>

        {user ? (
          <>
            <Typography variant="h6" style={{ marginRight: "20px" }}>
              Welcome, {user.name}!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button color="inherit">Login</Button>
          </NavLink>
        )}

        <NavLink
          to="/search"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "yellow" : "inherit",
          })}
        >
          <Button color="inherit">Search</Button>
        </NavLink>
        <NavLink
          to="/favorites"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "yellow" : "inherit",
          })}
        >
          <Button color="inherit">Favorites</Button>
        </NavLink>
        <Button color="inherit" onClick={handleMatchClick}>
          Match
        </Button>

        {/* Snackbar for no favorites selected */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="Please select at least one favorite before proceeding to match."
        />
      </Toolbar>
    </AppBar>
  );
}
