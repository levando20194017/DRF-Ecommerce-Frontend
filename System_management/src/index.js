import React from "react";
import createRoot from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
// core styles
import "./scss/mint.scss";
import "./scss/styles.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import Login from "./pages/auth/login";
import ScrollToTop from "./components/layout/ScrollToTop";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./pages/auth/authConfig";
import {
    MsalProvider,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Redirect } from "react-router-dom";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot.render(

  // <React.StrictMode>
  //   <MsalProvider store={store} instance={msalInstance}>
  //     <BrowserRouter>
  //       <ScrollToTop />
  //       <Route path="/" component={HomePage} />
  //     </BrowserRouter>
  //   </MsalProvider>
  // </React.StrictMode>,
  // document.getElementById("root")
  <React.StrictMode>
  <MsalProvider store={store} instance={msalInstance}>
      <BrowserRouter>
          <AuthenticatedTemplate>
              <ScrollToTop />
              <Route path="/" component={HomePage} />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
              <Login />
              <Redirect to="/login" />
          </UnauthenticatedTemplate>
      </BrowserRouter>
  </MsalProvider>
</React.StrictMode>,
document.getElementById("root")
);
