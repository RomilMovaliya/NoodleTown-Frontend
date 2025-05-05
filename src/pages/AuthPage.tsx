import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Cookie } from "@mui/icons-material";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUsers } from "../store/authSlice";


// const dispatch = useDispatch();

const AuthPage = () => {

  const [email, setEmail] = useState("");
  // useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  //const userId = Cookies.get("userId");
  //const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  // useEffect(() => {
  //   if (userId) {
  //     navigate("/profile");
  //   }
  // }, []);

  //
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
    const { token, userId } = response.data;

    // dispatch(setUsers({
    //   name: response.data.name,
    //   email: response.data.email,
    //   userId: response.data.userId
    // }))



    //Set the token in the cookies with an expiration time of 7 days
    Cookies.set("authToken", token);
    Cookies.set("userId", userId);
    // Cookies.set("isLoggedIn", "true", { expires: 1 / 60 });
    // Cookies.set("email", uemail, { expires: 1 / 60 });
    // Cookies.set("name", uname, { expires: 1 / 60 })



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
