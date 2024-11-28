export const Routes = {
    Login: { path: "/login" },
    SignUp: { path: "/register" },
    ForgotPassword: { path: "/fogot-password" },

    User: { path: "/user" },

    HomePage: { path: "/" },
    Store: { path: "/store" },
    News: { path: "/news" },
    NewDetail: { path: "/news/:slug" },
    Contact: { path: "/contact" },

    AddToCart: { path: "/store/product-detail" },
    Cart: { path: "/cart" },
    OrderDetail: { path: "/order-detail" },
    OrderStatus: { path: "/order-status" },
    Payment: { path: "/payment/:id" },
}