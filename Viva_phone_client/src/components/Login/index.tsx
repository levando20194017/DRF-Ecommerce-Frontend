import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import logo4 from "../../assets/images/logo4.png";
import { Routes } from "../../screens/Routes";
import { apiLogin } from "../../services/userService";
import { useDispatch } from "react-redux";
import { changeInformation } from "../../store/actions";

interface UserLogin {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [colors, setColors] = useState({ a: "#ff652f", b: "white" });
  const [formData, setFormData] = useState<UserLogin>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate()

  useEffect(() => {
    let intervalId1: NodeJS.Timeout;
    let intervalId2: NodeJS.Timeout;

    intervalId1 = setInterval(() => {
      setColors({ a: "#ff652f", b: "white" });
    }, 2000);

    setTimeout(() => {
      intervalId2 = setInterval(() => {
        setColors({ a: "white", b: "#ff652f" });
      }, 2000);
    }, 1000);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn reload trang
    if (!validate()) return;

    try {
      const response = await apiLogin(formData) as any;
      if (response.status === 200) {
        let data = response.data;
        localStorage.setItem("vivaphone_userData", JSON.stringify(data));
        dispatch(changeInformation(data))
        localStorage.setItem("vivaphone_isLoggedIn", "true");
        navigate("/");
      } else {
        setErrors({ ...errors, password: response?.message })
      }
    } catch (e) {
      console.error("Đăng nhập thất bại:", e);
    }
  };

  return (
    <div className="login">
      <div className="container demo-1">
        <div className="content">
          <div id="large-header" className="large-header">
            <h1>Đăng nhập</h1>
            <div className="main-agileits">
              <div className="form-w3-agile">
                <div className="brand">
                  <img
                    className="headerUser-right-avt rounded-circle"
                    src={logo4}
                    alt="avatar"
                    width={85}
                    height={80}
                  />
                </div>
                <h2 className="mt-2">
                  <span style={{ color: colors.a }}>Viva</span>
                  <span style={{ color: colors.b, marginLeft: "15px" }}>Phone</span>
                </h2>
                <form onSubmit={handleLogin}>
                  <div className="form-sub-w3">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <div className="icon-w3">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    {errors.email && <p className="error-text text-danger">{errors.email}</p>}
                  </div>
                  <div className="form-sub-w3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <div className="icon-w3">
                      <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                    </div>
                    {errors.password && <p className="error-text text-danger">{errors.password}</p>}
                  </div>
                  <p className="p-bottom-w3ls">
                    Quên mật khẩu?
                    <Link to={Routes.ForgotPassword.path}> Nhấn vào đây</Link>
                  </p>
                  <p className="p-bottom-w3ls1">
                    Tạo tài khoản mới?
                    <Link to={Routes.SignUp.path}> Đăng ký ngay</Link>
                  </p>
                  <div className="clear"></div>
                  <div className="submit-w3l">
                    <input className="mt-5" type="submit" value="Login" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
