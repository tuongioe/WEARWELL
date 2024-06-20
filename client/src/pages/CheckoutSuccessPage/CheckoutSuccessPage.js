import React from "react";
import classes from "./CheckoutSuccessPage.module.css";
import { Link } from "react-router-dom";

const CheckoutSuccessPage = () => {
  return (
    <main className={classes.main}>
      <div className={classes.cardSuccess}>
        <div
          style={{
            borderRadius: 200,
            height: 200,
            width: 200,
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className={classes.check}>✓</i>
        </div>
        <h1 className={classes.titleSuccess}>Thành công</h1>
        <p className={classes.subTitle}>
          Chúc mừng bạn đã đặt hàng thành công
          <br /> chúng tôi sẽ liên lạc với bạn ngay!
        </p>

        <Link to={"/"} className="btn" style={{ marginTop: 20, display: "block" }}>
          Quay lại trang trủ
        </Link>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
