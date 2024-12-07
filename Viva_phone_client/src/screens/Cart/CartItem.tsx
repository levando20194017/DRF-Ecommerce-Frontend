import React from 'react';
import { Checkbox, InputNumber, Button, Popconfirm } from 'antd';
import { getImageUrl } from '../../helps/getImageUrl';
import { formatPrice } from '../../utils/format';
import { promotionType } from '../../utils/promotionType';
import { checkPromotionValid } from '../../helps/checkPormotionValid';

interface CartItemProps {
    cartItem: any;
    onQuantityChange: (id: number, quantity: number) => void;
    onSelect: (id: number, selected: boolean) => void;
    selected: boolean;
    handleRemoveCartItem: (cartId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, onQuantityChange, onSelect, selected, handleRemoveCartItem }) => {

    const confirm = (cartId: number) => {
        handleRemoveCartItem(cartId)
    };

    return (
        <div className="d-flex align-items-center py-3 cart-item">
            {/* Checkbox */}
            <div className='d-flex col-5'>
                <div className="col-1 text-center d-flex align-items-center justify-content-center">
                    <Checkbox
                        checked={selected}
                        onChange={(e) => onSelect(cartItem.id, e.target.checked)}
                    />
                </div>

                {/* Product Info */}
                <div className="col-11 d-flex">
                    <img
                        src={getImageUrl(cartItem.product.image)}
                        alt={cartItem.product.name}
                        style={{ width: 80, height: 80, objectFit: 'cover' }}
                        className="me-3"
                    />
                    <div>
                        <div className='product-name fw-bold'>{cartItem.product.name}</div>
                        <div className='another-info'>Màu sắc: {cartItem.color}</div>
                        <div className='another-info'>Ưu đãi: {checkPromotionValid(cartItem.product) ? cartItem.product.promotion_name : "Không"}</div>
                        {checkPromotionValid(cartItem.product) && <div className='another-info'>
                            Giảm giá:
                            <span className="price">
                                {cartItem.product.promotion_discount_type === promotionType.PERCENT ?
                                    `${cartItem.product.promotion_discount_value}%` :
                                    `${formatPrice(cartItem.product.promotion_discount_value)}`}
                            </span>
                        </div>}
                    </div>
                </div>
            </div>

            <div className='col-7 d-flex price'>
                <div className="col-4 text-center">
                    {formatPrice(cartItem.product.price)}
                </div>

                <div className="col-3 text-center">
                    <InputNumber
                        min={1}
                        value={cartItem.quantity}
                        onChange={(value) => onQuantityChange(cartItem.id, value || 1)}
                    />
                </div>

                {/* Total Price */}
                <div className="col-3 text-center fw-bold price">
                    {(cartItem.product.price * cartItem.quantity).toLocaleString()}₫
                </div>

                {/* Actions */}
                <div className="col-2 text-center">
                    <Popconfirm
                        title="Xoá sản phẩm"
                        description="Xác nhận xóa sản phẩm khỏi giỏ hàng?"
                        onConfirm={() => confirm(cartItem.id)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
