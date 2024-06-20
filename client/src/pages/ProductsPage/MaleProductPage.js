import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import React, { useEffect, useState } from "react";
import "./MaleProductPage.css";
import Products from "../../components/ProductComponent/MenProductComponent";
import { Link } from "react-router-dom";
import productService from "./../../services/productService";
import { PRODUCT_TYPES } from "../../utils/constant";
function MaleProductPage() {
  const [products, setProducts] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  useEffect(() => {
    productService.getAllProduct(PRODUCT_TYPES.MALE).then((response) => {
      setProducts(response);
    });
  }, []);

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleFilterClick = () => {
    const userSize = determineSize(parseInt(height), parseInt(weight));
    const filteredProducts = products.filter((product) => product.product_size === userSize);
    setFilteredProducts(filteredProducts);
    setShowAllProducts(false); // Ẩn các sản phẩm trưng bày
  };

  const determineSize = (height, weight) => {
    if (height < 160 && weight <= 50) {
      return "XS";
    } else if (height >= 160 && height <= 165 && weight >= 50 && weight <= 55) {
      return "S";
    } else if (height >= 165 && height <= 170 && weight >= 60 && weight <= 65) {
      return "M";
    } else if (height >= 170 && height <= 175 && weight <= 75) {
      return "L";
    } else if (height >= 180) {
      return "XL";
    } else {
      return "";
    }
  };

  return (
    <div>
      <HeaderComponent />
      <div>
        <div className="MaleProduct__Preview">
          <img
            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            loading="lazy"
          />
        </div>

        <div className="MaleProduct__Item">
          <div className="MaleProduct__Input">
            <input
              className="MarginLeft"
              type="text"
              placeholder="Chiều cao (cm)"
              value={height}
              onChange={handleHeightChange}
            />
            <input
              type="text"
              placeholder="Cân nặng (kg)"
              value={weight}
              onChange={handleWeightChange}
            />
            <button onClick={handleFilterClick}>OK</button>
          </div>

          <div className="Product__Display">
            {showAllProducts
              ? products.map((product, index) => (
                  <Link
                    key={index}
                    to={`/product/male/${product._id}`}
                    className="LinkWithoutUnderline"
                  >
                    <Products
                      key={index}
                      image={product.product_thumb}
                      hoverImage={product.product_hover}
                      name={product.product_name}
                      price={product.product_price}
                      size={product.product_size}
                    />
                  </Link>
                ))
              : filteredProducts.map((product, index) => (
                  <Link
                    key={index}
                    to={`/product/male/${product._id}`}
                    className="LinkWithoutUnderline"
                  >
                    <Products
                      key={index}
                      image={product.product_thumb}
                      hoverImage={product.product_hover}
                      name={product.product_name}
                      price={product.product_price}
                      size={product.product_size}
                    />
                  </Link>
                ))}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default MaleProductPage;
