import React from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./ProfilePage.css";
import { authActions, useAuth } from "../../redux/slides/auth/authSlice";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/slides/auth/authApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (event) => {
    if (!user._id) return;
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    dispatch(updateProfile({ userId: user._id, data: formJson })).then(({ payload }) => {
      if (payload?._id) {
        toast.success("Cập nhật thành công");
      }
    });
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    toast.success("Đăng xuất thành công");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <HeaderComponent />

      <div className="main">
        <h2>Thông tin cá nhân</h2>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ height: "100%" }}>
              <button className="btn" type="button" onClick={handleLogout} style={{ margin: 0 }}>
                Đăng xuất
              </button>
            </div>

            <div style={{ height: "100%" }}>
              <Link
                to={"/order-history"}
                className="btn"
                style={{ height: "100%", display: "inline-block", padding: 10 }}
              >
                Lịch sử đặt hàng
              </Link>
            </div>
          </div>

          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>

            <form action="" onSubmit={handleOnSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>Tài khoản</td>
                    <td></td>
                    <td>
                      <input type="text" defaultValue={user?.user_username} disabled />
                    </td>
                  </tr>

                  <tr>
                    <td>Họ và tên</td>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        defaultValue={user?.user_fullName}
                        required
                        name="fullName"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Số điện thoại</td>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        defaultValue={user?.user_phone}
                        placeholder={user?.user_phone ? "" : "Chưa cập nhật"}
                        required
                        name="phone"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Địa chỉ</td>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        defaultValue={user?.user_address}
                        placeholder={user?.user_address ? "" : "Chưa cập nhật"}
                        required
                        name="address"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Mật khẩu</td>
                    <td></td>
                    <td>
                      <input type="password" placeholder={"Đổi mật khẩu"} name="password" />
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <button className="btn" type="submit">
                        Cập nhật
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default ProfilePage;
