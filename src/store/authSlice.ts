import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Type for user data
export interface User {
  name: string;
  email: string;
  userId: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};


// Redux slice to manage user state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Set users from localStorage or registration
    setUsers: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Log out and clear user data
    logout: (state) => {
      state.user = null;
    },

  },
});

export const {

  setUsers,
  logout

} = authSlice.actions;

export default authSlice.reducer;
