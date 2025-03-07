import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Snackbar } from "@mui/material";
import { useAppContext } from "../context/AppContextInstance";

export default function MainNav() {
  const { user, logout, favorites } = useAppContext();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogout = async () => {
    await logout(user.name, user.email);
    navigate("/");
  };

  const handleMatchClick = (e) => {
    if (favorites.length === 0) {
      e.preventDefault(); // Prevent navigation if no favorites are selected
      setSnackbarOpen(true); // Show snackbar
    }
    // If favorites exist, NavLink will handle navigation
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Adopt a Dog
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
        <NavLink
          to="/match"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "yellow" : "inherit",
          })}
          onClick={handleMatchClick} // Add onClick handler
        >
          <Button color="inherit">Match</Button>
        </NavLink>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message="Please select at least one favorite before proceeding to match."
        />
      </Toolbar>
    </AppBar>
  );
}
