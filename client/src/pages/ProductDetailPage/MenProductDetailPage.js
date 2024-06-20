import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { formatPrice } from "../../utils";
import productService from "./../../services/productService";
import "./MenProductDetailPage.css";
import { useAuth } from "../../redux/slides/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slides/cart/cartApi";
import { useCart } from "../../redux/slides/cart/cartSlice";

function MenProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { userId } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartId } = useCart();

  useEffect(() => {
    if (!productId) return;

    productService.getProductById(productId).then((response) => {
      setProduct(response);
    });
  }, [productId]);

  const handleAddToCart = (productId) => {
    if (!userId && !cartId) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm");
      navigate("/login", { replace: true });
      return;
    }

    const payloadAddToCart = {
      userId,
      cartId,
      product_id: productId,
      quantity: 1,
    };

    dispatch(addToCart(payloadAddToCart));
  };
  const handleBuy = (productId) => {
    if (!userId && !cartId) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm");
      navigate("/login", { replace: true });
      return;
    }

    const payloadAddToCart = {
      userId,
      cartId,
      product_id: productId,
      quantity: 1,
    };

    dispatch(addToCart(payloadAddToCart));
    
    navigate("/cart");
  };

  return (
    <div>
      <HeaderComponent />
      {!product ? (
        <div>
          <p>Sản phẩm không tồn tại</p>
        </div>
      ) : (
        <div className="Detail__Display">
          <div className="Detail__Display--Left">
            {product.product_images?.map((t) => (
              <img src={t} alt="" key={t} loading="lazy" />
            ))}
          </div>
          <div className="Detail__Display--Right">
            <p className="Detail__Display--Name">{product.product_name}</p>
            <p className="Detail__Display--Size">Kích cỡ: {product.product_size}</p>
            <p className="Detail__Display--Price">{formatPrice(product.product_price)}</p>
            <hr className="Detail__Display--Line" />
            <p className="Detail__Display--Description">{product.product_desc}</p>
            <hr className="Detail__Display--Line" />
            <div className="Detail__Button--Block">
              <button className="AddToCart__Button" onClick={() => handleAddToCart(productId)}>
                Thêm vào giỏ hàng
              </button>
              <button className="Buy__Button" onClick={() => handleBuy(productId)}>Mua ngay</button>
            </div>
          </div>
        </div>
      )}
      <FooterComponent />
    </div>
  );
}

export default MenProductDetail;
