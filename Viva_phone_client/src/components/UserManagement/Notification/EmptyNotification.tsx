import React from 'react';
import '../Order/Order.scss';
import EmptyNotiImg from "../../../assets/images/no-notification.png"
const EmptyNoti: React.FC = () => {
    return (
        <div className="empty-order">
            <img src={EmptyNotiImg} />
            <div>Chưa có thông báo</div>
        </div>
    );
};

export default EmptyNoti;
