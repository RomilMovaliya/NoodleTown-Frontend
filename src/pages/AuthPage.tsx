import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axiosInstance from "../utils/axiosInstance";

const AuthPage = () => {

  useEffect(() => {
    const token = Cookies.get("authToken");
    console.log("user id in login page", token);
    if (token) {
      navigate("/profile");
    }
  })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {

    try {
      const response = await axiosInstance.post("/register");

      if (response.status === 200) {
        toast.success("Registration successful!");
      }

      console.log(userData);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };


  const loginUser = async (email: string, password: string) => {

    const response = await axiosInstance.post("/login", {
      email,
      password
    });


    if (response.status != 200) {
      toast.error("Invalid Credentials!")
      throw new Error("Login failed!");
    }

    toast.success("Login successful!");
    setShowAlert(true);

    // If login is successful, set the token and userId in cookies
    const { token } = response.data;
    Cookies.set("authToken", token, { expires: 12 / 24 });
    //Cookies.set("userId", userId, { expires: 12 / 24 });

    console.log("Login response:", response.data);
    setShowAlert(false);

    navigate("/profile");
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegister) {
      // Handle registration logic
      if (password !== confirmPassword) {
        toast.error("Passwords don't match.");
        return;
      }

      const emailValidationRegEx =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailValidationRegEx.test(email)) {
        toast.error("Invalid email format.");
        return;
      }

      const passwordValidationRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordValidationRegex.test(password)) {
        toast.error(
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
        );
        return;
      }

      const userData = { name, email, password };
      registerUser(userData);
    } else {
      // Handle login logic
      loginUser(email, password);
    }
  };

  return (
    <Box
      marginTop={15}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        "@media (max-width:430px)": {
          marginInline: "30px",
        },
      }}
    >


      <form
        onSubmit={onSubmitHandler}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontFamily: "Poppins",
            fontWeight: "700",
            color: yellow[700],
          }}
        >
          {isRegister ? "Register" : "Login"}
        </Typography>

        {isRegister && (
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister && (
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: yellow[700],
            width: "100%",
            marginTop: 2,
            padding: "12px",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </Button>
      </form>

      <Button
        onClick={() => setIsRegister(!isRegister)}
        sx={{ marginTop: 2, color: yellow[700] }}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </Button>

      {/* Conditional Alert for successful login */}
      {showAlert && <Alert severity="success">Login successful!</Alert>}


    </Box>
  );
};

export default AuthPage;
