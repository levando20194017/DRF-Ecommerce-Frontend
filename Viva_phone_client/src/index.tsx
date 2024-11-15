import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import Product from "./screens/Product";
import ProductDetail from "./screens/Product/ProductDetail";
import SignupPage from "./screens/Signup";
import LoginPage from "./screens/Login";
import ForgotPasswordPage from "./screens/ForgotPassword";
import store from "./store";
import { Provider } from "react-redux";
import { HomePage } from "./screens/Home";
import AddToCartPage from "./screens/AddToCart";
import "./index.css";
import { OrderStatus } from "./components/OrderStatus";
import Map from "./components/Map";
import Test from "./components/Test";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <p>Not found</p>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/addtocart",
        element: <AddToCartPage />,
      },
      {
        path: "/orderstatus",
        element: <OrderStatus />,
      },
      {
        path: "/map",
        element: <Map />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
