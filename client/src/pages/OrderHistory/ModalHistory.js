import React, { useMemo } from "react";
import classes from "./ModalHistory.module.css";
import { formatPrice } from "../../utils";
import { Link } from "react-router-dom";
import { PRODUCT_TYPES } from "./../../utils/constant";
import { formatDate } from "../../utils/date";

const ModalHistory = ({ products = [], cartInfo, onClose }) => {
  const quantity = useMemo(() => {
    if (!products.length) return 0;

    return products.reduce((total, val) => (total += val.quantity), 0);
  }, [products]);

  return (
    <div className={classes.main}>
      <div className={classes.wrapperModal}>
        <div className={classes.titleModal}>
          <h1 className={classes.title}>Chi tiết đơn đặt hàng</h1>
          <button className={classes.btnClose} title="Đóng" onClick={onClose}>
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>

        <div className={classes.body}>
          <div className={classes.info}>
            <p>
              Người nhận: <span>{cartInfo?.order_shipping?.fullName}</span>
            </p>
            <p>
              Số điện thoại: <span>{cartInfo?.order_shipping?.phone}</span>
            </p>
            <p>
              Địa chỉ nhận hàng: <span>{cartInfo?.order_shipping?.address}</span>
            </p>
            <p>
              Trạng thái: <span>{cartInfo?.order_status}</span>
            </p>
            <p>
              Tổng giá trị: <span>{formatPrice(cartInfo?.order_checkout?.totalPrice)}</span>
            </p>
            <p>
              Ngày đặt: <span>{formatDate(cartInfo?.createdAt)}</span>
            </p>
          </div>

          <h2>Chi tiết sản phẩm</h2>

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
                      <img src={item.product_thumb} loading="lazy" width={50} height={50} />
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
                  <td align="center">{quantity}</td>
                  <td align="center">{formatPrice(cartInfo?.order_checkout?.totalPrice)}</td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={6}>Chưa có sản phẩm trong giỏ hàng</td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalHistory;
