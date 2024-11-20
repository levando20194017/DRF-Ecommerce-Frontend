import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import SignupPage from "./screens/Signup";
import LoginPage from "./screens/Login";
import ForgotPasswordPage from "./screens/ForgotPassword";
import store from "./store";
import { Provider } from "react-redux";
import { HomePage } from "./screens/Home";
import AddToCartPage from "./screens/AddToCart";
import "./index.css";
import { OrderStatus } from "./components/OrderStatus";
import NotFound from "./screens/NotFound";
import { Routes } from "./screens/Routes";
import StorePage from "./screens/Store"; 
import BlogPage from "./screens/Blog";
import ContactPage from "./screens/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: Routes.HomePage.path,
        element: <HomePage />,
      },
      {
        path: Routes.Store.path,
        element: <StorePage />,
      },
      {
        path: Routes.News.path,
        element: <BlogPage />,
      },
      {
        path: Routes.Contact.path,
        element: <ContactPage />,
      },
      {
        path: Routes.AddToCart.path,
        element: <AddToCartPage />,
      },
      {
        path: Routes.OrderStatus.path,
        element: <OrderStatus />,
      },
    ],
  },
  {
    path: Routes.SignUp.path,
    element: <SignupPage />,
  },
  {
    path: Routes.Login.path,
    element: <LoginPage />,
  },
  {
    path: Routes.ForgotPassword.path,
    element: <ForgotPasswordPage />,
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
