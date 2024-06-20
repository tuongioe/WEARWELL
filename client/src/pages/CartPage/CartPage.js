import React, { useEffect, useMemo } from "react";
import HeaderComponent from "./../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "./../../components/FooterComponent/FooterComponent";
import "./CartPage.css";
import { useCart } from "../../redux/slides/cart/cartSlice";
import { formatPrice } from "./../../utils/index";
import { useDispatch } from "react-redux";
import { getCart } from "../../redux/slides/cart/cartApi";
import { useAuth } from "../../redux/slides/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCT_TYPES } from "./../../utils/constant";
import { toast } from "react-toastify";

function CartPage() {
  const { products, cartId } = useCart();
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && !cartId) return;

    dispatch(getCart({ userId, cartId }));
  }, []);

  const total = useMemo(() => {
    if (!products.length) return { quantity: 0, price: 0 };

    const quantity = products.reduce((total, val) => (total += val.quantity), 0);
    const price = products.reduce((total, val) => (total += val.quantity * val.product_price), 0);

    return { quantity, price };
  }, [products]);

  const handleCheckout = () => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập trước khi đặt hàng!");
      navigate("/login", { replace: true });
      return;
    }

    navigate("/checkout", { replace: true });
  };

  return (
    <>
      <HeaderComponent />

      <main className="cart-main">
        <h2 className="cart-title">Giỏ hàng của bạn</h2>

        <table className="table-custom">
          <tr>
            <th>Tên sản phẩm</th>
            <th style={{ textAlign: "center" }}>Ảnh</th>
            <th style={{ textAlign: "center" }}>Size</th>
            <th style={{ textAlign: "center" }}>Giá</th>
            <th style={{ textAlign: "center" }}>Số lượng</th>
            <th style={{ textAlign: "center" }}>Thành tiền</th>
          </tr>
          {products.length ? (
            <>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Link
                      to={
                        item.product_type === PRODUCT_TYPES.FEMALE
                          ? `/product/female/${item._id}`
                          : `/product/male/${item._id}`
                      }
                    >
                      {item.product_name}
                    </Link>
                  </td>
                  <td align="center">
                    <img src={item.product_thumb} loading="lazy" width={50} height={50} alt="" />
                  </td>
                  <td align="center">{item.product_size}</td>
                  <td align="center">{formatPrice(item.product_price)}</td>
                  <td align="center">{item.quantity}</td>
                  <td align="center">{formatPrice(item.product_price * item.quantity)}</td>
                </tr>
              ))}
              <tr style={{ background: "aliceblue", color: "red", fontWeight: "bold" }}>
                <td></td>
                <td style={{ height: 50 }}></td>
                <td></td>
                <td align="center">Tổng</td>
                <td align="center">{total.quantity}</td>
                <td align="center">{formatPrice(total.price)}</td>
              </tr>
              <tr>
                <td style={{ height: 50 }} colSpan={5}></td>
                <td align="center">
                  <button className="btn" onClick={handleCheckout}>
                    Đặt hàng
                  </button>
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan={6}>Chưa có sản phẩm trong giỏ hàng</td>
            </tr>
          )}
        </table>
      </main>

      <FooterComponent />
    </>
  );
}

export default CartPage;
