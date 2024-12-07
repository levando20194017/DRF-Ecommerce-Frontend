import React, { useState, useEffect } from "react";
// import FontAwesomeIcon from ''
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo4 from "../../assets/images/logo4.png"
import { apiRegister } from "../../services/userService";
import { ToastFailed } from "../Common/Toast";
interface UserRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}
export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<UserRegister & { confirm_password: string }>>({});
  const [formData, setFormData] = useState<UserRegister>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: ""
  })

  const [colors, setColors] = useState({
    a: '#ff652f',
    b: 'white',
  });
  const [colorsContent, setColorsContent] = useState('white');
  useEffect(() => {
    let intervalId1: NodeJS.Timeout;
    let intervalId2: NodeJS.Timeout;
    let intervalId3: NodeJS.Timeout;

    // Thiết lập interval để mỗi 1000ms tăng currentIndex lên 1
    intervalId1 = setInterval(() => {
      setColors({
        a: "#ff652f",
        b: "white",
      });
    }, 2000);

    setTimeout(() => {
      intervalId2 = setInterval(() => {
        setColors({
          a: "white",
          b: "#ff652f",
        });
      }, 2000);
    }, 1000);

    intervalId3 = setInterval(() => {
      setColorsContent(prev => (prev === "orange" ? "white" : "orange"))
    }, 500);

    return () => {
      // Xóa interval khi component bị unmount
      clearInterval(intervalId1);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<UserRegister & { confirm_password: string }> = {};

    if (!formData.first_name.trim()) newErrors.first_name = "Tên không được để trống.";
    if (!formData.last_name.trim()) newErrors.last_name = "Họ không được để trống.";
    if (!formData.email.trim()) newErrors.email = "Email không được để trống.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!formData.phone_number.trim()) newErrors.phone_number = "Số điện thoại không được để trống.";
    else if (!/^\d{10,12}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Số điện thoại phải có 10-12 chữ số.";
    }

    if (!formData.password.trim()) newErrors.password = "Mật khẩu không được để trống.";
    else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải dài ít nhất 6 ký tự.";
    }

    const confirmPassword = (document.getElementById("password2") as HTMLInputElement)?.value;
    if (formData.password !== confirmPassword) {
      newErrors.confirm_password = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Không có lỗi
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }))
  };


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn reload trang

    if (!validate()) return; // Nếu không hợp lệ, dừng xử lý

    setIsLoading(true);
    try {
      const response = await apiRegister(formData) as any;
      if (response.status === 200) {
        navigate("/login");
      } else {
        ToastFailed(response.message)
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signUp">
      <h1 className="w3ls">Đăng kí</h1>
      <div className="content-w3ls">
        <div className="content-agile1">
          <div className="brand"><img className="headerUser-right-avt rounded-circle" src={logo4} alt='avatar' width={85} height={80} /></div>
          <h2 className="agileits1 mt-2"><span style={{ color: colors.a }}>Viva</span><span style={{ color: colors.b, marginLeft: "15px" }}>Phone</span></h2>
          <p className="agileits2 offset-1" style={{ color: colorsContent }}>Viva Phone – Nâng tầm kết nối, dẫn lối công nghệ.</p>
        </div>
        <div className="content-agile2">
          <form onSubmit={handleSignUp}>
            <div>
              <input
                type="text"
                id="firstname"
                name="first_name"
                placeholder="Tên"
                title="Vui lòng nhập Tên của bạn"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              {errors.first_name && <p className="error-text">{errors.first_name}</p>}
            </div>
            <div>
              <input
                type="text"
                id="lastname"
                name="last_name"
                placeholder="Họ"
                title="Vui lòng nhập Họ của bạn"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              {errors.last_name && <p className="error-text">{errors.last_name}</p>}
            </div>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="mail@example.com"
                title="Vui lòng nhập Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                id="phonenumber"
                name="phone_number"
                placeholder="Số điện thoại"
                title="Vui lòng nhập số điện thoại của bạn"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
              {errors.phone_number && <p className="error-text">{errors.phone_number}</p>}
            </div>
            <div>
              <input
                type="password"
                className="lock"
                name="password"
                placeholder="Mật khẩu"
                id="password1"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <div>
              <input
                type="password"
                className="lock"
                name="confirm_password"
                placeholder="Xác nhận mật khẩu"
                id="password2"
              />
              {errors.confirm_password && <p className="error-text">{errors.confirm_password}</p>}
            </div>

            <input type="submit" className="register mt-5" value={isLoading ? "Đang xử lý..." : "ĐĂNG KÍ"} disabled={isLoading} />
          </form>

          {/* <p className="wthree w3l">Quick registration with your favorite social profiles.</p>
          <ul className="social-agileinfo wthree2">
            <li><a href="#"><i className="bi bi-facebook"></i></a></li>
            <li><a href="#"><i className="bi bi-google"></i></a></li>
            <li><a href="#"><i className="bi bi-twitter"></i></a></li>
          </ul> */}
        </div>
        <div className="clear"></div>
      </div>
    </div>
  );
};
