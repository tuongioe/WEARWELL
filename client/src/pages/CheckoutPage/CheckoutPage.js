import React, { useMemo, useState } from "react";
import "./CheckoutPage.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../redux/slides/auth/authSlice";
import { useCart } from "../../redux/slides/cart/cartSlice";
import { formatPrice } from "../../utils/index";
import { PRODUCT_TYPES } from "../../utils/constant";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrder } from "./../../redux/slides/order/orderApi";

const CheckoutPage = () => {
  const { userId, user } = useAuth();
  const { products, countProduct, cartId } = useCart();
  const [paymentOpt, setPaymentOpt] = useState("cod");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (!userId || !cartId) {
      toast.error("Vui lòng đăng nhập trước khi đặt hàng!");
      navigate("/login", { replace: true });
      return;
    }

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const payload = {
      userId,
      cartId,
      payment: paymentOpt,
      shipping: {
        ...formJson,
      },
    };

    dispatch(createOrder(payload)).then(({ payload }) => {
      if (payload._id) {
        navigate("/success-checkout", { replace: true });
      }
    });
  };

  const total = useMemo(() => {
    if (!products.length) return { quantity: 0, price: 0 };

    const quantity = products.reduce((total, val) => (total += val.quantity), 0);
    const price = products.reduce((total, val) => (total += val.quantity * val.product_price), 0);

    return { quantity, price };
  }, [products]);

  return (
    <>
      <HeaderComponent />

      <main className="checkout-main">
        <h2 className="checkout-title">Đặt hàng</h2>

        <p className="checkout-sub-title">
          *Vui lòng điền chính xác thông tin cá nhân để giao hàng nhanh nhất
        </p>

        <div className="row">
          <div className="col-70">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="fname">
                      <i className="fa fa-user" /> Họ và tên
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="fullName"
                      placeholder="VD: Nguyễn Văn A"
                      defaultValue={user?.user_fullName}
                      required
                    />
                    <label htmlFor="fname">
                      <i class="fa-solid fa-phone"></i> Số điện thoại
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="phone"
                      placeholder="VD: 0123456789"
                      defaultValue={user?.user_phone}
                      required
                    />

                    <label htmlFor="adr">
                      <i className="fa fa-address-card-o" /> Địa chỉ chi tiết
                    </label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      placeholder="VD: 542 Phạm Ngũ Lão"
                      defaultValue={user?.user_address}
                      required
                    />
                  </div>
                </div>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    value={"cod"}
                    checked={paymentOpt === "cod"}
                    onChange={({ target: { value } }) => setPaymentOpt(value)}
                  />
                  Thanh toán khi nhận hàng
                </label>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    value={"online"}
                    checked={paymentOpt === "online"}
                    onChange={({ target: { value } }) => setPaymentOpt(value)}
                  />
                  Thanh toán Online
                </label>

                {paymentOpt === "online" ? <img src="qr.png" width={250} alt="" /> : null}

                <button type="submit" className="btn">
                  Xác nhận đặt hàng
                </button>
              </form>
            </div>
          </div>

          <div className="col-30">
            <div className="container checkout-product">
              <h4 style={{ marginBottom: 20 }}>
                Sản phẩm
                <span className="count-item" style={{ color: "black" }}>
                  <i className="fa fa-shopping-cart" /> <b>{countProduct}</b>
                </span>
              </h4>
              {products?.map((item) => (
                <p key={item?._id}>
                  <Link
                    className="checkout-item-link"
                    to={
                      item?.product_type === PRODUCT_TYPES.FEMALE
                        ? `/product/female/${item?._id}`
                        : `/product/male/${item?._id}`
                    }
                  >
                    {item?.product_name}
                  </Link>
                  <span className="price">{`${item?.quantity}x${formatPrice(
                    item?.product_price
                  )}`}</span>
                </p>
              ))}

              <hr />
              <p>
                Tổng thanh toán
                <span className="total-price" style={{ color: "black" }}>
                  <b>{formatPrice(total.price)}</b>
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <FooterComponent />
    </>
  );
};

export default CheckoutPage;
