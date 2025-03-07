import React, { useState } from "react";
import { useAppContext } from "../context/AppContextInstance";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(name, email);
    navigate("search");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
