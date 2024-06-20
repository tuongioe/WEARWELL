import React, { useState } from "react";
import "./MenProductComponent.css";
import { formatPrice } from "./../../utils/index";

function Products(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`Product__Image ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <img loading="lazy" src={isHovered ? props.hoverImage : props.image} alt="" />
      <p className="Product__Name">{props.name}</p>
      <p className="Product__Price">{formatPrice(props.price)}</p>
      <p className="Product__Size">{props.size}</p>
    </div>
  );
}

export default Products;
