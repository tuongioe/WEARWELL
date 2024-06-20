import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage/CheckoutSuccessPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import MenProductDetail from "./pages/ProductDetailPage/MenProductDetailPage";
import WomenProductDetail from "./pages/ProductDetailPage/WomenProductDetailPage";
import FemaleProductPage from "./pages/ProductsPage/FemaleProductPage";
import MaleProductPage from "./pages/ProductsPage/MaleProductPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchProduct from "./pages/SearchProduct/SearchProduct";

function App() {
  return (
    <AuthComponent>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/male" element={<MaleProductPage />} />
          <Route path="/product/female" element={<FemaleProductPage />} />
          <Route path="/product/male/:productId" element={<MenProductDetail />} />
          <Route path="/product/female/:productId" element={<WomenProductDetail />} />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success-checkout" element={<CheckoutSuccessPage />} />
          <Route path="/search-product" element={<SearchProduct />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </Router>
    </AuthComponent>
  );
}

export default App;
