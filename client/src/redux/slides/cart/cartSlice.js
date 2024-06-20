import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { addToCart, getCart } from "./cartApi";

const initialState = {
  cartId: localStorage.getItem("__cartId") || null,
  products: [],
  countProduct: 0,
  loading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.products = [];
      state.countProduct = 0;
    },
  },
  extraReducers: (builder) => {
    // addToCart
    builder.addCase(addToCart.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?._id) {
        if (!localStorage.getItem("__cartId")) {
          localStorage.setItem("__cartId", payload._id);
        }

        state.cartId = payload._id;
        state.countProduct = payload.cart_count_product;
      } else {
        state.products = [];
        state.countProduct = 0;
        state.cartId = null;
        localStorage.removeItem("__cartId");
      }
    });
    builder.addCase(addToCart.rejected, (state, { payload }) => {
      state.loading = false;
    });
    // getCart
    builder.addCase(getCart.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?._id) {
        if (!localStorage.getItem("__cartId")) {
          localStorage.setItem("__cartId", payload._id);
        }
        state.cartId = payload._id;
        state.countProduct = payload.cart_count_product;
        state.products = payload.cart_products;
      } else {
        state.cartId = null;
        state.products = [];
        state.countProduct = 0;
        localStorage.removeItem("__cartId");
      }
    });
    builder.addCase(getCart.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;
export const useCart = () => useSelector((state) => state.cart);
export default cartSlice.reducer;
