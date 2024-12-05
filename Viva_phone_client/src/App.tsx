import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import SignupPage from "./screens/Signup";
import LoginPage from "./screens/Login";
import ForgotPasswordPage from "./screens/ForgotPassword";
import { HomePage } from "./screens/Home";
import AddToCartPage from "./screens/AddToCart";
import NotFound from "./screens/NotFound";
import { Routes } from "./screens/Routes";
import StorePage from "./screens/Store";
import BlogPage from "./screens/Blog";
import ContactPage from "./screens/Contact";
import BlogDetail from "./screens/Blog/BlogDetail";
import Cart from "./screens/Cart/Cart";
import UserManagementPage from "./screens/UserManagementPage";
import PaymentPage from "./screens/Payment";

const App = () => {

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
          path: Routes.NewDetail.path,
          element: <BlogDetail />,
        },
        {
          path: Routes.Contact.path,
          element: <ContactPage />,
        },
        {
          path: Routes.AddToCart.path,
          element: <AddToCartPage />,
        },
        // {
        //   path: Routes.OrderDetail.path,
        //   element: <OrderDetail />,
        // },
        {
          path: Routes.Cart.path,
          element: <Cart />,
        },
        {
          path: Routes.Payment.path,
          element: <PaymentPage />,
        },
        {
          path: Routes.UserInfor.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.Notification.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.UserVoucher.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.OrderStatus.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.AllOrder.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.OrderCanceled.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.OrderConfirm.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.OrderReceived.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.OrderTransit.path,
          element: <UserManagementPage />,
        },
        {
          path: Routes.OrderWaitConfirm.path,
          element: <UserManagementPage />,
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

  return (
    <RouterProvider router={router} />
  );
};

export default App;
