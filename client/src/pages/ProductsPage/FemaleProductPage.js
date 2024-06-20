import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import React, { useEffect, useState } from "react";
import "./FemaleProductPage.css";
import Products from "../../components/ProductComponent/WomenProductComponent";
import { Link } from "react-router-dom";
import productService from "../../services/productService";
import { PRODUCT_TYPES } from "./../../utils/constant";
function FemaleProductPage() {
  const [products, setProducts] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);

  useEffect(() => {
    productService.getAllProduct(PRODUCT_TYPES.FEMALE).then((response) => {
      setProducts(response);
    });
  }, []);

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

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
    if (height < 160 && weight < 50) {
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
        <div className="FemaleProduct__Preview">
          <img
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBjbG90aGluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
        <div className="FemaleProduct__Item">
          <div className="FemaleProduct__Input">
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
                    to={`/product/female/${product._id}`}
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
                    to={`/product/female/${product._id}`}
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

export default FemaleProductPage;
