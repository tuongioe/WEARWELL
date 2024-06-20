import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../redux/slides/auth/authApi";
import { useAuth } from "./../../redux/slides/auth/authSlice";
import { useCart } from "../../redux/slides/cart/cartSlice";
import { getCart } from "../../redux/slides/cart/cartApi";

const AuthComponent = ({ children }) => {
  const { userId } = useAuth();
  const { cartId } = useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    dispatch(getMe(userId));
  }, [userId]);

  useEffect(() => {
    if (!userId && !cartId) return;

    // Get cart
    dispatch(getCart({ userId, cartId }));
  }, [userId, cartId]);

  return children;
};

export default AuthComponent;
