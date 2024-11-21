import "../order.scss"

const OrderStatus = () => {
    const order = {
        id: 'ORDER12345',
        status: 'Đang giao hàng', // Các trạng thái: Chờ xác nhận, Đang giao hàng, Đã giao, Đã hủy
        steps: ['Chờ xác nhận', 'Đang xử lý', 'Đang giao hàng', 'Đã giao'],
    };

    // Xác định trạng thái hiện tại
    const currentStepIndex = order.steps.indexOf(order.status);

    return (
        <div className="order-status-container">
            <h2>Trạng thái đơn hàng</h2>
            <p>Mã đơn hàng: {order.id}</p>

            <div className="stepper">
                {order.steps.map((step, index) => (
                    <div key={index} className={`step ${index <= currentStepIndex ? 'active' : ''}`}>
                        <div className="circle">{index + 1}</div>
                        <p>{step}</p>
                    </div>
                ))}
            </div>

            <div className="status-message">
                <h3>Trạng thái hiện tại:</h3>
                <p>{order.status}</p>
            </div>
        </div>
    );
};

export default OrderStatus;
