import React from 'react';
import { Button } from 'antd';

interface CartSummaryProps {
    total: number;
    onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout }) => {
    return (
        <div className="pt-3 mt-3">
            <div className="d-flex justify-content-between mb-3">
                <div>Tổng tiền:</div>
                <div className="fw-bold">{total.toLocaleString()}₫</div>
            </div>
            <Button type="primary" block onClick={onCheckout} disabled={total === 0}>
                Mua Hàng
            </Button>
        </div>
    );
};

export default CartSummary;
