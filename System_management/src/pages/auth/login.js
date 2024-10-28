import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "@themesberg/react-bootstrap";
import { apiLogin } from "../../services/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import IconMail from "../../assets/img/icons/icon-mail.png";
import IconPassword from "../../assets/img/icons/icon-password.png";
import IconEyeShow from "../../assets/img/icons/icon-eye-show.png";
import IconEyeHidden from "../../assets/img/icons/icon-eye-hidden.png";
import { ReactComponent as CheckIcon } from "../../assets/img/icons/icon_check.svg";
import { ReactComponent as CheckedIcon } from "../../assets/img/icons/icon_checked.svg";
import { Routes } from "../../routes";
import { ToastFailed } from "../../components/common/Toast";
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY || "";

console.log(secretKey);
const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [isHover, setIsHover] = useState({
    email: false,
    password: false,
  });
  const [isHoverButton, setIsHoverButton] = useState(false);
  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
  });

  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedPassword && storedUsername) {
      const bytes = CryptoJS.AES.decrypt(storedPassword, secretKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

      const storedRememberMe = localStorage.getItem('rememberMe');

      if (storedRememberMe && storedRememberMe === 'true') {
        setForm({
          email: storedUsername,
          password: decryptedText,
        })
        setRememberMe(true);
      }
    }
  }, []);



  const handleMouseEnter = (item) => {
    if (item === "email" && !isFocus.email && !error.email) {
      setIsHover({ ...isHover, email: true });
    }
    if (item === "password" && !isFocus.password && !error.password) {
      setIsHover({ ...isHover, password: true });
    }
  };

  const handleMouseLeave = (item) => {
    if (item === "email") {
      setIsHover({ ...isHover, email: false });
    }
    if (item === "password") {
      setIsHover({ ...isHover, password: false });
    }
  };

  const handleKeydown = (event) => {
    if (event.keyCode === 32) event.preventDefault();
  };

  const handleInputChange = (e, item) => {
    if (item === "email") {
      setError({ ...error, email: "" });
      setForm({ ...form, email: e.target.value });
    }
    if (item === "password") {
      setError({ ...error, password: "" });
      setForm({ ...form, password: e.target.value });
    }
  };

  useEffect(() => {
    if (form.email && form.password) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [form]);
  useEffect(() => {
    if (error.email || error.password) {
      setIsFormValid(false);
    }
  }, [error]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError({ ...error, email: "This field must be email." })
      return;
    }

    if (!isFormValid) {
      return;
    }
    try {
      const response = await apiLogin({ email, password });
      if (response.status === 200) {
        if (rememberMe) {
          localStorage.setItem('email', form.email);
          const encryptedPassword = CryptoJS.AES.encrypt(form.password, secretKey).toString()
          localStorage.setItem('password', encryptedPassword);
          localStorage.setItem('rememberMe', rememberMe.toString());
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
        let data = response.data;
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", true);
        window.location.reload();
        history.push("/");
      } else {
        if (response.data.message === "Email not existed or invalid") {
          setError({
            ...error,
            email: "Please try again, your email is incorrect.",
          });
        }
        if (response.data.message === "Password does not exactly") {
          setError({
            ...error,
            password: "Please try again, your password is incorrect.",
          });
        }
        if (response.data.message === "Email not verified") {
          setError({
            ...error,
            email: "Email not verified",
          });
        }
      }


    } catch (error) {
      console.log(error);
      ToastFailed("Login failed!")
    }
  };

  const handleMouseEnterButton = () => {
    setIsHoverButton(true);
  };
  const handleMouseLeaveButton = () => {
    setIsHoverButton(false);
  };
  return (
    <div className="background-page">
      <ToastContainer />
      <div className="form-bg-image">
        <div className="d-flex align-items-center justify-content-center">
          <div className="header">
            <div>
              <span className="header_title">Welcome to</span>
              <span className="header_brand ms-2">Mint Admin</span>
            </div>
            <div className="header_intro">
              Use your credentials to access your account.
            </div>
          </div>
        </div>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="email">
            <Form.Label className="form-label-login">Email</Form.Label>
            <div
              className="d-flex form-shadow"
              onMouseEnter={() => handleMouseEnter("email")}
              onMouseLeave={() => handleMouseLeave("email")}
            >
              <div
                className="email_icon"
                style={{
                  borderColor: `${error.email
                    ? "#E60013"
                    : isFocus.email
                      ? "#0D49BD"
                      : "#D1D5DB"
                    }`,
                  borderWidth: `${isFocus.email
                    ? "1px 0px 1px 1px"
                    : isHover.email
                      ? "2px 0px 2px 2px"
                      : "1px 0px 1px 1px"
                    }`,
                }}
              >
                <img src={IconMail} alt="icon-mail" width={20} height={20} />
              </div>
              <input
                type="text"
                placeholder="Enter your email"
                value={form.email}
                onKeyDown={(e) => handleKeydown(e)}
                onChange={(e) => handleInputChange(e, "email")}
                className="form-input"
                onFocus={() => setIsFocus({ ...isFocus, email: true })}
                onBlur={() => {
                  setIsFocus({ ...isFocus, email: false });
                }}
                style={{
                  borderColor: `${error.email
                    ? "#E60013"
                    : isFocus.email
                      ? "#0D49BD"
                      : "#D1D5DB"
                    }`,
                  borderWidth: `${isFocus.email ? "1px" : isHover.email ? "2px" : "1px"
                    }`,
                }}
                autoComplete="new-password"
              />
            </div>
            {error.email && <div className="error">{error.email}</div>}
          </Form.Group>
          <Form.Group className="password">
            <Form.Label className="form-label-login">Password</Form.Label>
            <div
              className="d-flex password_form form-shadow"
              onMouseEnter={() => handleMouseEnter("password")}
              onMouseLeave={() => handleMouseLeave("password")}
            >
              <div
                className="password_icon"
                style={{
                  borderColor: `${error.password
                    ? "#E60013"
                    : isFocus.password
                      ? "#0D49BD"
                      : "#D1D5DB"
                    }`,
                  borderWidth: `${isFocus.password
                    ? "1px 0px 1px 1px"
                    : isHover.password
                      ? "2px 0px 2px 2px"
                      : "1px 0px 1px 1px"
                    }`,
                }}
              >
                <img
                  src={IconPassword}
                  alt="icon-password"
                  width={20}
                  height={20}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => handleInputChange(e, "password")}
                className="form-input"
                onFocus={() => setIsFocus({ ...isFocus, password: true })}
                onBlur={() => {
                  setIsFocus({ ...isFocus, password: false });
                }}
                style={{
                  borderColor: `${error.password
                    ? "#E60013"
                    : isFocus.password
                      ? "#0D49BD"
                      : "#D1D5DB"
                    }`,
                  borderWidth: `${isFocus.password ? "1px" : isHover.password ? "2px" : "1px"
                    }`,
                }}
                autoComplete="new-password"
              />
              <img
                alt="icon"
                src={showPassword ? IconEyeHidden : IconEyeShow}
                width={20}
                height={20}
                onClick={togglePasswordVisibility}
                className="icon-eye cusor-pointer"
              />
            </div>
            {error.password && <div className="error">{error.password}</div>}
          </Form.Group>
          <div className="forget-remember">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className="cusor-pointer"
            >
              <span>
                {rememberMe ? (
                  <CheckedIcon width={20} height={20} className="mb-1" />
                ) : (
                  <CheckIcon width={20} height={20} className="mb-1" />
                )}
              </span>
              <span className="ms-2 remember">Remember me</span>
            </div>
            <Link to={`${Routes.ForgotPassword.path}`}>
              <div className="forget">Forget password?</div>
            </Link>
          </div>
          <Button
            type="submit"
            className="w-100 btn-signin"
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
            disabled={!isFormValid}
            style={{
              opacity: `${isFormValid ? 1 : 0.5}`,
              cursor: `${isFormValid ? "pointer" : "default"}`,
              backgroundColor: `${isFormValid
                ? isHoverButton
                  ? "#1a65f5"
                  : "#0d49bd"
                : "#0d49bd"
                }`,
            }}
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
