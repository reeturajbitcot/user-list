import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/slice/authSlice";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let userData = {
      email,
      password,
    };

    try {
      const resultAction = dispatch(loginUser(userData));
      console.log(resultAction.fulfilled.match(resultAction));
      if (loginUser.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Successful",
          text: "User Created successfully",
          icon: "success",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    if (email && password) {
      console.log(email, password);
    }
  };

  const signupClick = () => {
    navigate("/signup");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <div
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <small>Don't have an account?</small>
          <Button variant="outlined" onClick={signupClick}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
