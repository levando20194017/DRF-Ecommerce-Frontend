import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo4 from "../../assets/images/logo4.png"

interface Props {
  title: string; // required
  btnLabel: string; // optional
}

export const ForgotPasswordForm = ({ title, btnLabel }: Props) => {
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
    <div className="forgotPassword">
      <div className="forgotPassword_form">
        <div className="brand"><img className="headerUser-right-avt rounded-circle" src={logo4} alt='avatar' width={85} height={80} /></div>
        <div className="brand mt-2"><h2><span style={{ color: colors.a }}>Viva</span><span style={{ color: colors.b, marginLeft: "15px" }}>Flower</span></h2></div>
        <div className="icons-forgot"><i className="fas fa-lock"></i></div>
        <h3>Forgot password</h3>
        <div className="form-sub-w3">
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
          />
        </div>
        <button className="btn-forgot">NEXT</button>
      </div>
    </div>
  );
};
