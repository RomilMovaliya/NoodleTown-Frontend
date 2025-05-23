// src/pages/ProfilePage.tsx

import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { passwordReset } from "../utils/auth";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";


const ProfilePage = () => {


  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      console.log("response.data.user", response.data.user);

      return response.data.user;
    } catch (error) {
      return null;
    }
  };

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: () => passwordReset(user?.email || "", newPassword),
  });


  const [authCheckTick, setAuthCheckTick] = useState(0);

  // Check auth token and redirect if missing
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [authCheckTick, navigate]);

  // Every 5 seconds, increment tick to trigger re-render
  useEffect(() => {
    const interval = setInterval(() => {
      setAuthCheckTick((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval); // cleanup
  }, []);


  const handleLogout = () => {

    const response = axiosInstance.get("/logout");
    console.log("response of logout", response);
    //dispatch(logout()); // Dispatch to log out the user
    // Cookies.remove("isLoggedIn"); // Remove isLoggedIn from cookies
    //Cookies.remove("userId"); // Remove userId from cookies
    Cookies.remove("authToken"); // Remove authToken from cookies
    // Cookies.remove("name");
    // Cookies.remove("email");
    // Cookies.remove("AccessToken");

    navigate("/auth");
  };

  const handlePasswordReset = async () => {
    setErrorMessage(""); // clear previous error

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      const data = await resetPasswordMutation.mutateAsync();

      if (data) {

        setNewPassword("");
        setConfirmNewPassword("");
        toast.success("Password updated successfully!")
      } else {
        setErrorMessage(data?.message || "Password update failed.");
        console.log(errorMessage);

      }
    } catch (err) {
      console.error("Password reset error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }



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
          <Typography fontSize={70}>{user?.name?.charAt(0).toUpperCase()}</Typography>
        </Box>

        <Typography fontSize={20} fontWeight={500}>
          {user?.name}
        </Typography>
        <Typography fontSize={16} color="gray">
          {user?.email}
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

        <Typography>Confirm New Password</Typography>
        <TextField
          fullWidth
          sx={{
            mt: 1,
          }}
          label="Confirm New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
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

        <Link to={`/order`} style={{ width: "100%" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: yellow[700],
              width: "100%",
              marginTop: 3,
              height: "40px",
            }}
          >
            View Orders
          </Button>
        </Link>
      </Box>
    </Box>

  );
};

export default ProfilePage;
