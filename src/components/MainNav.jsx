import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAppContext } from "../context/AppContextInstance";

export default function MainNav() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(user.name, user.email);
    navigate("/");
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
        <NavLink to="/search" style={{ textDecoration: "none" }}>
          <Button color="inherit">Search</Button>
        </NavLink>
        <NavLink to="/favorites" style={{ textDecoration: "none" }}>
          <Button color="inherit">Favorites</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
