import React from "react";
import createRoot from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
// core styles
import "./scss/mint.scss";
import "./scss/styles.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/layout/ScrollToTop";

createRoot.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop />
            <Route path="/" component={HomePage} />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
    //   <React.StrictMode>
    //   <MsalProvider store={store} instance={msalInstance}>
    //       <BrowserRouter>
    //           <AuthenticatedTemplate>
    //               <ScrollToTop />
    //               <Route path="/" component={HomePage} />
    //           </AuthenticatedTemplate>
    //           <UnauthenticatedTemplate>
    //               <Login />
    //               <Redirect to="/login" />
    //           </UnauthenticatedTemplate>
    //       </BrowserRouter>
    //   </MsalProvider>
    // </React.StrictMode>,
    // document.getElementById("root")
);
