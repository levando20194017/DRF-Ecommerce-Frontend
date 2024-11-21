import Breadcrumb from "../../components/Breadcrumb";
import { Routes } from "../Routes";
import "./cart.scss"
const Cart = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Giỏ hàng", path: Routes.Cart.path },
    ];

    const cartItems = [
        {
            id: 1,
            name: 'iPhone 15 Plus 128GB',
            price: 22990000,
            quantity: 2,
            image: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain',
        },
        {
            id: 2,
            name: 'Samsung Galaxy S23 Ultra',
            price: 25990000,
            quantity: 1,
            image: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain',
        },
    ];

    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <div className="div-empty"></div>
            <div className="container contact-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <div className="cart-container mt-5">
                    <h5>Giỏ hàng của bạn</h5>
                    <div className="cart-items mt-5">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <div className="item-name">{item.name}</div>
                                    <p>Giá: <span style={{ color: "red" }} className="fw-bold">{formatPrice(item.price)}</span></p>
                                    <div className="quantity-control">
                                        <button>-</button>
                                        <span>{item.quantity}</span>
                                        <button>+</button>
                                    </div>
                                </div>
                                <div className="item-total">
                                    <p style={{ color: "red" }} className="fw-bold">{formatPrice(item.price * item.quantity)}</p>
                                    <button>Xóa</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Tổng cộng: {formatPrice(totalPrice)}</h3>
                        <button className="checkout-btn mt-3">Thanh toán</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
