import Breadcrumb from "../../components/Breadcrumb";
import { Routes } from "../Routes";
import "./cart.scss"
const Cart = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Giỏ hàng", path: Routes.Cart.path },
    ];

    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <>
            <div className="div-empty"></div>
            <div className="container contact-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <div className="cart-container mt-5">

                </div>
            </div>
        </>
    );
};

export default Cart;
