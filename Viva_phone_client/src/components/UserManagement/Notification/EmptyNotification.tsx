import React from 'react';
import '../Order/Order.scss';
import EmptyNotiImg from "../../../assets/images/no-notification.png"
const EmptyNoti: React.FC = () => {
    return (
        <div className="empty-order">
            <img src={EmptyNotiImg} />
            <div className='fs-5'>Chưa có thông báo</div>
        </div>
    );
};

export default EmptyNoti;
