import React from 'react';
import EmptyOrderImg from "../../../assets/images/empty_order.png"
const EmptyVoucher: React.FC = () => {
    return (
        <div className="empty-order">
            <img src={EmptyOrderImg} />
            <div>Chưa có voucher nào</div>
        </div>
    );
};

export default EmptyVoucher;
