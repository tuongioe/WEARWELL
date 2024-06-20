import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createOrder } from "./orderApi";

const initialState = {
  data: [],
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createOrder
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const orderActions = orderSlice.actions;
export const useOrder = () => useSelector((state) => state.order);
export default orderSlice.reducer;
