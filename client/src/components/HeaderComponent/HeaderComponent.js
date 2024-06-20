import React, { useEffect, useState } from "react";
import {
  RiAccountCircleLine,
  RiMenLine,
  RiSearchLine,
  RiShoppingCartLine,
  RiWomenLine,
} from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../redux/slides/auth/authSlice";
import { useCart } from "../../redux/slides/cart/cartSlice";
import "./HeaderComponent.css";
import logo from "./Logo.png";

function HeaderComponent() {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const { search: searchP } = useLocation();
  const searchParams = new URLSearchParams(searchP);
  const queryValue = searchParams.get("q");
  const { user } = useAuth();
  const { countProduct } = useCart();
  const [search, setSearch] = useState(queryValue ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearch = () => {
    if (!search) return;

    navigate(`/search-product?q=${search}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 0) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`Header__Element--Block ${isHeaderFixed ? "fixed" : ""}`}>
      <div className="Header__Element--Left">
        <div className="men-icon">
          <Link to="/product/male">
            <RiMenLine size={24} />
          </Link>
        </div>
        <div className="women-icon">
          <Link to="/product/female">
            <RiWomenLine size={24} />
          </Link>
        </div>
      </div>
      <div className="Header__Element--Center">
        <Link to="/">
          <img
            src={logo}
            alt=""
            style={{ maxWidth: "100px", maxHeight: "99px", height: "99px", width: "120px" }}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="Header__Element--Right">
        <div className="search-icon">
          <input
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
          />
          <RiSearchLine
            style={{ zIndex: 9, cursor: "pointer", padding: "0 2px" }}
            size={24}
            onClick={handleSearch}
          />
        </div>
        <div className="account-icon">
          <Link to={user?._id ? "/me" : "/login"}>
            <RiAccountCircleLine size={24} />
          </Link>
        </div>
        <div className="cart-icon">
          <Link to={"/cart"}>
            <RiShoppingCartLine size={24} />
          </Link>
          <span className="cart-count-item">{countProduct}</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
