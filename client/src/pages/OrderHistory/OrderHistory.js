import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useScroll } from "./../../utils/useScroll";
import { useAuth } from "../../redux/slides/auth/authSlice";
import orderService from "./../../services/orderService";
import { useNavigate } from "react-router-dom";
import { formatPrice, sleep } from "../../utils";
import ModalHistory from "./ModalHistory";
import { formatDate } from "../../utils/date";

const OrderHistory = () => {
  useScroll();
  const { userId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);

    orderService.getOrderByUserId(userId).then(async (response) => {
      await sleep(1000);
      setOrders(response);
      setLoading(false);
    });
  }, [userId]);

  return (
    <>
      <HeaderComponent />

      {selected ? (
        <ModalHistory
          cartInfo={selected}
          products={selected.order_products}
          onClose={() => setSelected(null)}
        />
      ) : null}

      <div className="checkout-main">
        {loading ? (
          <h1 className="checkout-title">Loading...</h1>
        ) : (
          <>
            <h1 className="checkout-title">Lịch sử đặt hàng</h1>

            <table className="table-custom">
              <tr>
                <th>Mã đặt hàng</th>
                <th style={{ textAlign: "center" }}>Người nhận</th>
                <th style={{ textAlign: "center" }}>Địa chỉ</th>
                <th style={{ textAlign: "center" }}>Số điện thoại</th>
                <th style={{ textAlign: "center" }}>Ngày đặt</th>
                <th style={{ textAlign: "center" }}>Tổng tiền</th>
                <th style={{ textAlign: "center" }}>Trạng thái</th>
                <th style={{ textAlign: "center" }}>Thanh toán</th>
                <th style={{ textAlign: "center" }}>Thao tác</th>
              </tr>
              {orders.length ? (
                <>
                  {orders.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.order_shipping.fullName}</td>
                      <td>{item.order_shipping.address}</td>
                      <td>{item.order_shipping.phone}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{formatPrice(item.order_checkout.totalPrice)}</td>
                      <td>{item.order_status}</td>
                      <td>{item.order_payment}</td>
                      <td>
                        <button className="btn" onClick={() => setSelected(item)}>
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={9}>Chưa có đơn hàng nào</td>
                </tr>
              )}
            </table>
          </>
        )}
      </div>

      <FooterComponent />
    </>
  );
};

export default OrderHistory;
