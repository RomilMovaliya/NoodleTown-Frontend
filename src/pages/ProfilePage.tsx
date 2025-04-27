// src/pages/ProfilePage.tsx

import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUsers } from "../store/authSlice";
import { RootState } from "../main";
import Cookies from "js-cookie";
import { Link } from "react-router";

const ProfilePage = () => {
  const { currentUser, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updatecontact, setUpdatecontact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      dispatch(logout());
      navigate("/auth", { replace: true });
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch to log out the user
    Cookies.remove("isLoggedIn"); // Remove isLoggedIn from cookies
    Cookies.remove("userId"); // Remove userId from cookies
    Cookies.remove("authToken"); // Remove authToken from cookies
    navigate("/auth/");
  };

  const handlePasswordReset = () => {
    if (currentUser?.password !== currentPassword) {
      setErrorMessage("Current password is incorrect.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    // Update password in the users array
    const users = JSON.parse(window.localStorage.getItem("users") || "[]");

    // Find the current user
    const updatedUsers = users.map((user: any) => {
      if (user.email === currentUser?.email) {
        return { ...user, password: newPassword }; // Update password
      }
      return user;
    });

    // Update the users list in localStorage
    window.localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update state in Redux (to reflect the change in the UI)
    dispatch(setUsers(updatedUsers));

    // Clear form fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");
    alert("Password updated successfully!");



  };

  return (
    <Box
      sx={{
        marginTop: "100px",
        marginInline: "10%",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 2,
        padding: 2,
      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#F4F6F9",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          boxShadow: "0 2px 8px 0px rgba(0, 0, 0, 0.2)",
          borderRadius: 3,
        }}
      >
        {/* Profile Circle */}
        <Box
          sx={{
            borderRadius: "50%",
            height: "200px",
            width: "200px",
            backgroundColor: "#E0E7FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontSize={70}>D</Typography>
        </Box>

        <Typography fontSize={20} fontWeight={500}>
          dency
        </Typography>
        <Typography fontSize={16} color="gray">
          dency123@gmail.com
        </Typography>


        <Button
          variant="contained"
          sx={{
            backgroundColor: yellow[700],
            width: "100%",
            mt: 1,
            height: "40px",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Link to={`/order`} style={{ width: "100%" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: yellow[700],
              width: "100%",
              marginTop: 1,
              height: "40px",
            }}
          >
            View Orders
          </Button>
        </Link>
      </Box>

      {/* Update Password Section */}
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#F4F6F9",
          boxShadow: "0 2px 8px 0px rgba(0, 0, 0, 0.2)",
          borderRadius: 3,
        }}
      >
        <Typography fontSize={30} fontWeight={600} textAlign="center">
          Update Password
        </Typography>

        <Typography mt={4}>Current Password</Typography>
        <TextField
          fullWidth
          sx={{
            mt: 1,
          }}
          label="Current Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <Typography>New Password</Typography>
        <TextField
          fullWidth
          sx={{
            mt: 1,
          }}
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: yellow[700],
            width: "100%",
            mt: 1,
            height: "40px",
          }}
          onClick={handlePasswordReset}
        >
          Update Password
        </Button>


      </Box>
    </Box>

  );
};

export default ProfilePage;
