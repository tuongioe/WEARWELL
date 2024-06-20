import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosClient from "../../../utils/http";

export const addToCart = createAsyncThunk("cart/addToCart", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("/cart", data);
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    return response;
  } catch (error) {
    console.log(`addToCart Error`, error);
    toast.error(error?.response?.data?.message ?? error?.message);
    return rejectWithValue(error?.response?.data?.message ?? error?.message);
  }
});

export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ userId, cartId }, { rejectWithValue }) => {
    try {
      const url = userId ? `/cart/user/${userId}` : `/cart/${cartId}`;
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.log(`getCart Error`, error);
      toast.error(error?.response?.data?.message ?? error?.message);
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);
