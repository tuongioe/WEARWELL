import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { formatPrice, sleep } from "../../utils";
import { PRODUCT_TYPES } from "../../utils/constant";
import productService from "./../../services/productService";
import "./SearchProduct.css";

const SearchProduct = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryValue = searchParams.get("q");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!queryValue) {
      navigate("/", { replace: true });
      return;
    }

    setLoading(true);

    productService.getAllProduct(null, queryValue).then(async (response) => {
      await sleep(1000);
      setLoading(false);
      setProducts(response);
    });
  }, [queryValue]);

  return (
    <>
      <HeaderComponent />

      <main className="checkout-main" style={{ height: "auto !important" }}>
        {loading ? (
          <h2 className="checkout-title">Đang tải...</h2>
        ) : (
          <>
            <h2 className="checkout-title">Kết quả tìm kiếm. {`(${products.length} kết quả)`}</h2>

            <div className="show-products" style={{ height: "100% !important" }}>
              {products.length ? (
                products.map((product, index) => (
                  <Link
                    key={index}
                    to={
                      product?.product_type === PRODUCT_TYPES.FemaleProductPage
                        ? `/product/female/${product?._id}`
                        : `/product/male/${product?._id}`
                    }
                    className="cart-product"
                  >
                    <img loading="lazy" src={product.product_thumb} alt="" className="pImage" />
                    <p className="pName">{product.product_name}</p>
                    <p className="pPrice">{formatPrice(product.product_price)}</p>
                    <p className="pSize">{product.product_size}</p>
                  </Link>
                ))
              ) : (
                <h2>Không có sản phẩm</h2>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default SearchProduct;
