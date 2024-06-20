import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosClient from "../../../utils/http";
import { cartActions } from "../cart/cartSlice";

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosClient.post("/user/login", data);
    dispatch(cartActions.resetCart());
    return response;
  } catch (error) {
    console.log(`login Error`, error);
    toast.error(error?.response?.data?.message ?? error?.message);
    return rejectWithValue(error?.response?.data?.message ?? error?.message);
  }
});

export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("/user/register", data);
    return response;
  } catch (error) {
    console.log(`register Error`, error);
    toast.error(error?.response?.data?.message ?? error?.message);
    return rejectWithValue(error?.response?.data?.message ?? error?.message);
  }
});

export const getMe = createAsyncThunk("auth/getMe", async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get(`/user/me/${userId}`);
    return response;
  } catch (error) {
    console.log(`getMe Error`, error);
    toast.error(error?.response?.data?.message ?? error?.message);
    return rejectWithValue(error?.response?.data?.message ?? error?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/user/profile/${userId}`, data);
      return response;
    } catch (error) {
      console.log(`updateProfile Error`, error);
      toast.error(error?.response?.data?.message ?? error?.message);
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);
