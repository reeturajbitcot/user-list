import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
      }}
    >
      {isAuthenticated ? (
        <>
          <h1> You have access to view Dashboard</h1>
          <div>
            <Button variant="contained" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>To show user info get authenticated</h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
