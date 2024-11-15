import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import logo4 from "../../assets/images/logo4.png"
interface Props {
  title: string; // required
  btnLabel: string; // optional
}

export const LoginForm = ({ title, btnLabel }: Props) => {
  const [colors, setColors] = useState({
    a: '#ff652f',
    b: 'white',
  });
  useEffect(() => {
    let intervalId1: NodeJS.Timeout;
    let intervalId2: NodeJS.Timeout;

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

    return () => {
      // Xóa interval khi component bị unmount
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    }
  }, []);
  return (
    <div className="login">
      <div className="container demo-1">
        <div className="content">
          <div id="large-header" className="large-header">
            <h1>Đăng nhập</h1>
            <div className="main-agileits">
              <div className="form-w3-agile">
                <div className="brand"><img className="headerUser-right-avt rounded-circle" src={logo4} alt='avatar' width={85} height={80} /></div>
                <h2 className="mt-2"><span style={{ color: colors.a }}>Viva</span><span style={{ color: colors.b, marginLeft: "15px" }}>Phone</span></h2>
                <form action="#" method="post">
                  <div className="form-sub-w3">
                    <input
                      type="text"
                      name="Username"
                      placeholder="Email"
                    />
                    <div className="icon-w3">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="form-sub-w3">
                    <input
                      type="password"
                      name="Password"
                      placeholder="Password"
                    />
                    <div className="icon-w3">
                      <i
                        className="fa fa-unlock-alt"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                  <p className="p-bottom-w3ls">
                    Quên mật khẩu?
                    <Link to="/forgotpassword"> Nhấn vào đây</Link>
                  </p>
                  <p className="p-bottom-w3ls1">
                    Tạo tài khoản mới?
                    <Link to="/signup"> Đăng ký ngay</Link>
                  </p>
                  <div className="clear"></div>
                  <div className="submit-w3l">
                    <input type="submit" className="mt-5" value="Login" />
                  </div>
                </form>
                {/* <div className="social w3layouts">
                  <div className="heading">
                    <h5>Or Login with</h5>
                    <div className="clear"></div>
                  </div>
                  <div className="icons">
                    <ul className="social-agileinfo wthree2">
                      <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                      <li><a href="#"><i className="bi bi-google"></i></a></li>
                      <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                    </ul>
                    <div className="clear"></div>
                  </div>
                  <div className="clear"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
