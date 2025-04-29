import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// Type for user data
interface User {
  name: string;
  email: string;
  password: string;
}

// Type for initial state
interface UserState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  items: any[]; // Add items property to the state
  uemail: string | null; // Add uemail property to the state
  uname: string | null; // Add uname property to the state
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  isLoggedIn: Cookies.get("isLoggedIn") === "true" || false,
  token: null,
  userId: null,
  items: [],
  uemail: null,
  uname: null
};

// Redux slice to manage user state
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },

    setLogin(state, action) {
      state.isLoggedIn = action.payload;
      state.userId = action.payload.userId;
      Cookies.set("isLoggedIn", action.payload.toString(), {
        expires: 10 / (24 * 60),
      }); // Set isLoggedIn in cookies for 5 minutes
    },
    setLogout(state) {
      state.isLoggedIn = false;
      Cookies.remove("isLoggedIn"); // Remove isLoggedIn from cookies
      Cookies.remove("authToken"); // Remove authToken from cookies
      Cookies.remove("userId"); // Remove userId from cookies
    },

    // Set users from localStorage or registration
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    // Set current user and login status
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },

    setProfileInfo: (state, action: PayloadAction<{ uname: string, uemail: string }>) => {
      state.uemail = action.payload.uemail;
      state.uname = action.payload.uname;
    },


    // Log out and clear user data
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    // Reset password for the current user
    resetPassword: (
      state,
      action: PayloadAction<{ currentPassword: string; newPassword: string }>
    ) => {
      if (
        state.currentUser &&
        state.currentUser.password === action.payload.currentPassword
      ) {
        state.currentUser.password = action.payload.newPassword;
      }
    },
  },
});

export const {
  setLogin,
  setLogout,
  setUsers,
  setCurrentUser,
  logout,
  setProfileInfo,
  clearCart,
  resetPassword,
} = userSlice.actions;

export default userSlice.reducer;
