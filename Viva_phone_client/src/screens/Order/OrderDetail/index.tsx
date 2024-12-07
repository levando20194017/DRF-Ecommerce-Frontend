import "../order.scss"

const OrderDetail = () => {
    const order = {
        id: 'ORDER12345',
        items: [
            {
                id: 1,
                name: 'iPhone 15 Plus 128GB',
                price: 22990000,
                quantity: 1,
            },
            {
                id: 2,
                name: 'Samsung Galaxy S23 Ultra',
                price: 25990000,
                quantity: 1,
            },
        ],
        address: '46 Ngõ 61 Định Công, Hoàng Mai, Hà Nội',
        status: 'Đang xử lý',
        paymentStatus: 'Chưa thanh toán',
        totalPrice: 48980000,
    };

    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div className="order-detail-container">
            <h2>Chi tiết đơn hàng</h2>
            <p>Mã đơn hàng: {order.id}</p>
            <p>Địa chỉ: {order.address}</p>
            <p>Trạng thái đơn hàng: {order.status}</p>
            <p>Trạng thái thanh toán: {order.paymentStatus}</p>
            <div className="order-items">
                <h3>Sản phẩm</h3>
                {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                        <p>{item.name}</p>
                        <p>Số lượng: {item.quantity}</p>
                        <p>Giá: {formatPrice(item.price)}</p>
                    </div>
                ))}
            </div>
            <h3>Tổng cộng: {formatPrice(order.totalPrice)}</h3>
        </div>
    );
};

export default OrderDetail;
