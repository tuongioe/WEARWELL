import React, { useState } from "react";
import "./LoginPage.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slides/auth/authApi";
import { toast } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin đăng nhập!");
      return;
    }

    dispatch(login({ username, password })).then(({ payload }) => {
      if (payload?._id) {
        toast.success("Đăng nhập thành công");
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div>
      <HeaderComponent />
      <div className="Login__Cap--Wrapper">
        <div className="Login__Cap--Block">
          <Link to="/login">
            <p className="Login__Cap--SignIn">Đăng nhập</p>
          </Link>
          <Link to="/register">
            <p className="Login__Cap--SignUp">Đăng ký</p>
          </Link>
        </div>
        <div className="Login__Block">
          <h1>Đăng nhập</h1>
          <div className="Login__Input">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="Login__Input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {showPassword ? (
              <FiEye size={24} className="Login__Icon" onClick={togglePasswordVisibility} />
            ) : (
              <FiEyeOff size={24} className="Login__Icon" onClick={togglePasswordVisibility} />
            )}
          </div>
          <button className="Login__Button" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
