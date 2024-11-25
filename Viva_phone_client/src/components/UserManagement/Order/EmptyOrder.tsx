import React from 'react';
import './Order.scss';
import EmptyOrderImg from "../../../assets/images/empty_order.png"
const EmptyOrder: React.FC = () => {
    return (
        <div className="empty-order">
            <img src={EmptyOrderImg} />
            <div>Chưa có đơn hàng</div>
        </div>
    );
};

export default EmptyOrder;
