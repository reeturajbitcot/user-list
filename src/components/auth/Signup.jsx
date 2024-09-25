import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../store/slice/authSlice";
import Swal from "sweetalert2";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userData = {
      name,
      email,
      password,
      city,
      phoneNumber: phoneNo,
    };
    try {
      const resultAction = await dispatch(createUser(userData));
      if (createUser.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Successful",
          text: "User Created successfully! Redirecting to Login",
          icon: "success",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            loginClick();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginClick = () => {
    navigate("/login");
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
      <h1>Sign up</h1>
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
            label="Name"
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={name}
          />
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="primary"
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
            color="primary"
            type="password"
            value={password}
            fullWidth
            sx={{ mb: 3 }}
          />
          {/* city */}
          <TextField
            label="City"
            onChange={(e) => setCity(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            value={city}
            fullWidth
            sx={{ mb: 3 }}
          />
          {/* phone no */}
          <TextField
            label="phone No"
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="number"
            value={phoneNo}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Sign up
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
          <Button variant="outlined" onClick={loginClick}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
