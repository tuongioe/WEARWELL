import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, register, updateProfile } from "./authApi";
import { useSelector } from "react-redux";

const initialState = {
  user: null,
  userId: localStorage.getItem("__authUserId") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      localStorage.removeItem("__authUserId");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.fulfilled, (state, { payload }) => {
      localStorage.setItem("__authUserId", payload._id);
      state.user = payload;
      state.userId = payload._id;
    });

    // Register
    builder.addCase(register.fulfilled, (state, { payload }) => {
      localStorage.setItem("__authUserId", payload._id);
      state.user = payload;
      state.userId = payload._id;
    });

    // getMe
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    // updateProfile
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;
export const useAuth = () => useSelector((state) => state.auth);
export default authSlice.reducer;
