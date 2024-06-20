import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosClient from "../../../utils/http";
import { cartActions } from "../cart/cartSlice";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosClient.post("/order/checkout", data);
      dispatch(cartActions.resetCart());
      return response;
    } catch (error) {
      console.log(`createOrder Error`, error);
      toast.error(error?.response?.data?.message ?? error?.message);
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);
