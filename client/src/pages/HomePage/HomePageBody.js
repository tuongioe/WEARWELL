import React, { useState, useEffect } from "react";
import "./HomePageBody.css";
import { Link } from "react-router-dom";

function HomePageBody() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoaW5nJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000); // Thay đổi ảnh sau mỗi 3 giây

    return () => {
      clearInterval(interval); // Xóa interval khi component unmount
    };
  }, [currentImageIndex, images.length]);
  return (
    <div className="HomePage__Body">
      <div className="HomePage__Body--PreviewItem">
        <img src={images[currentImageIndex]} alt="" />
      </div>
      <div className="HomePage__Body--Item">
        <div className="HomePage__Body--Caption">Sản phẩm</div>
        <Link to="/product/male">
          <div className="HomePage__Body--MenItem">
            <p className="MenItem__Jacket--Text">Áo khoác</p>
            <img
              className="HomePage__MenItem--Image"
              src="https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            <p className="MenItem__TShirt--Text">Áo thun</p>
            <img
              className="HomePage__MenItem--Image"
              src="https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="Men__Item">
              <button className="Men__Item--Button">Thời trang nam</button>
              <img
                className="Men__Item--Image"
                src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
        </Link>
        <Link to="/product/female">
          <div className="HomePage__Body--WomenItem">
            <div className="Women__Item">
              <button className="Women__Item--Button">Thời trang nữ</button>
              <img
                className="Women__Item--Image"
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <p className="WomenItem__Dress--Text">Đầm lụa</p>
            <img
              className="HomePage__WomenItem--Image"
              src="https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <p className="WomenItem__Set--Text">Áo thun&Quần</p>
            <img
              className="HomePage__WomenItem--Image"
              src="https://images.unsplash.com/photo-1552874869-5c39ec9288dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww"
              alt=""
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePageBody;
