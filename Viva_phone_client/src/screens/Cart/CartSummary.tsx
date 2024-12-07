import React from 'react';
import { Button, Checkbox } from 'antd';

interface CartSummaryProps {
    total: number; // Tổng tiền
    onCheckout: () => void; // Hàm xử lý thanh toán
    selectedIds: number[]; // Mảng chứa các ID sản phẩm đã chọn
    handleSelectAll: (checked: boolean) => void; // Hàm xử lý việc chọn/deselect tất cả sản phẩm
    cart: { id: number }[]; // Danh sách sản phẩm, mỗi sản phẩm có ít nhất id
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout, selectedIds, handleSelectAll, cart }) => {
    // Kiểm tra nếu tất cả các sản phẩm đã được chọn
    const isAllSelected = selectedIds.length === cart.length;
    const coupon = 100000

    return (
        <div className="pt-3 mt-1 cart-summary">
            <div className="d-flex gap-4">
                <div className="d-flex">
                    <div className="text-center">
                        <Checkbox
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            checked={isAllSelected} // Kiểm tra tất cả các sản phẩm đã được chọn hay chưa
                        />
                    </div>
                    <div className="ms-2">Chọn tất cả</div>
                </div>
                <div>I</div>
                <div>
                    Tổng số sản phẩm: 3 (sản phẩm)
                </div>
                <div>I</div>
                <div>
                    Ưu đãi giảm giá: <span className='price'>{coupon.toLocaleString()}₫</span>
                </div>
            </div>
            <div className="text-end">
                <div className="mb-3 d-flex justify-content-end">
                    <div>Tổng tiền:</div>
                    <div className="fw-bold ms-2 price">{total.toLocaleString()}₫</div>
                </div>
                <Button onClick={onCheckout} disabled={total === 0} className="btn-buy">
                    Mua Hàng
                </Button>
            </div>
        </div>
    );
};

export default CartSummary;
