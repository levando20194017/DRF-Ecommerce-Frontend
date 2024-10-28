import React from "react";
import { useHistory } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import backgroundImage from "../../assets/img/BackgroundLogin.png";
import Logo from "../../assets/img/Logo.png";
import "./style.scss";
const Login = () => {
    
  const { instance, accounts } = useMsal();
  
  const azureSSOLogin = () => {
      if (!accounts.length) {
          instance.loginRedirect({
              scopes: ["openid"],
          });
      }
  };

  const history = useHistory();
  if (accounts.length) {
      history.push("/");
  }

  return (
    <main>
      <section>
        <div className="login-page">
          <img src={backgroundImage} style={{ height: "100vh" }} />
          <div className="login-page_content">
            <div className="d-flex justify-content-center align-items-center">
              <img src={Logo} style={{ width: "70%" }} />
            </div>

            <h2 className="login-title mt-5" style={{ color: "black" }}>
              Log Into Your Portal Account
            </h2>
            <button className="btn-signin mt-5" onClick={() => azureSSOLogin()}>
              Sign in via SSO
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
