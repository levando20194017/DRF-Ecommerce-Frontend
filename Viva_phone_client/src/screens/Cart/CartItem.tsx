import React from 'react';
import { Checkbox, InputNumber, Button } from 'antd';
import { Product } from '../../types';

interface CartItemProps {
    product: Product;
    onQuantityChange: (id: number, quantity: number) => void;
    onSelect: (id: number, selected: boolean) => void;
    selected: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ product, onQuantityChange, onSelect, selected }) => {
    return (
        <div className="d-flex align-items-center py-3">
            {/* Checkbox */}
            <div className="col-1 text-center">
                <Checkbox
                    checked={selected}
                    onChange={(e) => onSelect(product.id, e.target.checked)}
                />
            </div>

            {/* Product Info */}
            <div className="col-5 d-flex">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                    className="me-3"
                />
                <div>
                    <div>{product.name}</div>
                    <div>{product.variant}</div>
                    <div>Shop: {product.shop}</div>
                </div>
            </div>

            {/* Unit Price */}
            <div className="col-2 text-center">
                {product.price.toLocaleString()}₫
            </div>

            {/* Quantity */}
            <div className="col-2 text-center">
                <InputNumber
                    min={1}
                    value={product.quantity}
                    onChange={(value) => onQuantityChange(product.id, value || 1)}
                />
            </div>

            {/* Total Price */}
            <div className="col-2 text-center fw-bold">
                {(product.price * product.quantity).toLocaleString()}₫
            </div>

            {/* Actions */}
            <div className="col-2 text-center">
                <Button type="link" danger>
                    Xóa
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
