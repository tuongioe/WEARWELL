import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slides/auth/authSlice";
import cartReducer from "./slides/cart/cartSlice";
import orderReducer from "./slides/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
