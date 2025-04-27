import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setCurrentUser, setLogin } from "../store/authSlice";
import { toast } from "react-toastify";
import { RootState } from "../store/store";
import Cookies from "js-cookie";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  //
  const registerUser = async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // Include cookies in response
      });

      if (!response.ok) {
        throw new Error("Registration failed!");
      }

      const data = await response.json();
      toast.success("Registration successful!");
      setShowSuccessPopup(true);

      Cookies.set("isLoggedIn", "true", { expires: 10 / (24 * 60) });
      //window.localStorage.setItem('isLoggedIn', 'true');
      setShowSuccessPopup(false);
      navigate("/profile", { replace: true }); // Redirect to profile page after registration
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important: This sends cookies with the request
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();
      toast.success("Login successful!");
      setShowAlert(true);
      // If login is successful, set the token and userId in cookies
      const { token, userId } = data;

      // Set the token in the cookies with an expiration time of 7 days
      Cookies.set("authToken", token, { expires: 10 / (24 * 60) });
      Cookies.set("userId", userId, { expires: 10 / (24 * 60) });
      Cookies.set("isLoggedIn", "true", { expires: 10 / (24 * 60) });

      dispatch(setLogin(true));

      console.log("Login response:", data);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/profile");
      }, 3000);
    } catch (error) {
      toast.error("Invalid credentials or login failed.");
    }
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
      {/* Lottie Animation Popup (Only visible when showSuccessPopup is true) */}
      {showSuccessPopup ? (
        <Box
          sx={{
            position: "fixed",
            top: "60%",
            left: "50%",
            width: "50%",
            transform: "translate(-50%, -50%)",
            padding: 3,
            borderRadius: 2,
            zIndex: 9999,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              marginTop: 2,
            }}
          >
            Registration Successful!
          </Typography>
        </Box>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default AuthPage;
