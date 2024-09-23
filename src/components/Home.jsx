import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>To show user info get authenticated</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="contained" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Home;
