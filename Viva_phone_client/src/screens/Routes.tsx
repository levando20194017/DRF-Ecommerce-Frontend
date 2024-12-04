export const Routes = {
    Login: { path: "/login" },
    SignUp: { path: "/register" },
    ForgotPassword: { path: "/fogot-password" },

    HomePage: { path: "/" },
    Store: { path: "/store" },
    News: { path: "/news" },
    NewDetail: { path: "/news/:slug" },
    Contact: { path: "/contact" },

    AddToCart: {
        path: "/store/product-detail",
        getPath: ({ storeId, productId, catalogId }: { storeId: number, productId: number, catalogId: number }) =>
            `/store/product-detail?store_id=${storeId}&product_id=${productId}&catalog_id=${catalogId}`
    },
    Cart: { path: "/cart" },
    OrderDetail: { path: "/order-detail" },
    OrderStatus: { path: "/order-status" },
    Payment: { path: "/payment" },

    User: { path: "/user" },
    UserInfor: { path: "/user/information" },
    UserVoucher: { path: "/user/voucher" },
    AllOrder: { path: "/user/order/all-orders" },
    OrderWaitConfirm: { path: "/user/order/waiting-for-confirm" },
    OrderTransit: { path: "/user/order/in-transit" },
    OrderReceived: { path: "/user/order/received" },
    OrderCanceled: { path: "/user/order/canceled" },
    OrderConfirm: { path: "/user/order/confirmed" },

    Notification: { path: "/user/notification" },
}