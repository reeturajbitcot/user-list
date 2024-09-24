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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userData = {
      email,
      password,
    };

    try {
      const resultAction = await dispatch(loginUser(userData));
      // console.log(resultAction);
      if (loginUser.fulfilled.match(resultAction)) {
        if (resultAction.payload) {
          Swal.fire({
            title: "Successful",
            text: "User Created successfully",
            icon: "success",
            confirmButtonText: "Close",
            timer: 1500,
            timerProgressBar: true,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.timer
            ) {
              navigate("/dashboard");
            }
          });
        } else {
          console.log("something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
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
