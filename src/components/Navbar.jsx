import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slice/authSlice";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        padding: "20px 40px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <ApartmentIcon
          fontSize="large"
          color="primary"
          onClick={() => navigate("/")}
        />
      </div>
      <Button variant="contained" size="small" onClick={handleLogout}>
        Logout Please
      </Button>
    </div>
  );
}

export default Navbar;
