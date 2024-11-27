import React from 'react';
import { Button } from 'antd';

interface CartSummaryProps {
    total: number;
    onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout }) => {
    return (
        <div className="pt-3 mt-3 cart-summary">
            <div className="mb-3 d-flex justify-content-end">
                <div>Tổng tiền:</div>
                <div className="fw-bold ms-2 price">{total.toLocaleString()}₫</div>
            </div>
            <Button onClick={onCheckout} disabled={total === 0} className='btn-buy'>
                Mua Hàng
            </Button>
        </div>
    );
};

export default CartSummary;
