import React, { useState } from "react";
import "./RegisterPage.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slides/auth/authApi";
import { toast } from "react-toastify";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    if (!username || !password || !fullName || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin đăng nhập!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu và mật khẩu xác nhận không khớp. Vui lòng nhập lại!!!");
      return;
    } else {
      dispatch(register({ username, password, fullName })).then(({ payload }) => {
        if (payload?._id) {
          toast.success("Đăng ký thành công");
          navigate("/", { replace: true });
        }
      });
    }
  };

  return (
    <div>
      <HeaderComponent />
      <div className="Register__Cap--Wrapper">
        <div className="Register__Cap--Block">
          <Link to="/login">
            <p className="Register__Cap--SignIn">Đăng nhập</p>
          </Link>
          <Link to="/register">
            <p className="Register__Cap--SignUp">Đăng ký</p>
          </Link>
        </div>
        <div className="Register__Block">
          <h1>Đăng ký tài khoản</h1>
          <div className="Register__Input">
            <input
              type="text"
              placeholder="Họ và tên"
              value={fullName}
              onChange={({ target: { value } }) => setFullName(value)}
              required
            />
          </div>
          <div className="Register__Input">
            <input
              type="text"
              placeholder="Tên tài khoản"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="Register__Input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {showPassword ? (
              <FiEye size={24} className="Register__Icon1" onClick={togglePasswordVisibility} />
            ) : (
              <FiEyeOff size={24} className="Register__Icon1" onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className="Register__Input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {showConfirmPassword ? (
              <FiEye
                size={24}
                className="Register__Icon2"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <FiEyeOff
                size={24}
                className="Register__Icon2"
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
          </div>
          <button className="Register__Button" onClick={handleRegistration}>
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
