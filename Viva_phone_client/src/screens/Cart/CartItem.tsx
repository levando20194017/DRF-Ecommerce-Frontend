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
        <div className="d-flex align-items-center py-3 cart-item">
            {/* Checkbox */}
            <div className='d-flex col-5'>
                <div className="col-1 text-center d-flex align-items-center justify-content-center">
                    <Checkbox
                        checked={selected}
                        onChange={(e) => onSelect(product.id, e.target.checked)}
                    />
                </div>

                {/* Product Info */}
                <div className="col-11 d-flex">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: 80, height: 80, objectFit: 'cover' }}
                        className="me-3"
                    />
                    <div>
                        <div className='product-name'>{product.name}</div>
                        <div className='another-info'>{product.variant}</div>
                        <div className='another-info'>Ưu đãi: {product.shop}</div>
                    </div>
                </div>
            </div>

            <div className='col-7 d-flex price'>
                <div className="col-4 text-center">
                    {product.price.toLocaleString()}₫
                </div>

                <div className="col-3 text-center">
                    <InputNumber
                        min={1}
                        value={product.quantity}
                        onChange={(value) => onQuantityChange(product.id, value || 1)}
                    />
                </div>

                {/* Total Price */}
                <div className="col-3 text-center fw-bold price">
                    {(product.price * product.quantity).toLocaleString()}₫
                </div>

                {/* Actions */}
                <div className="col-2 text-center">
                    <Button type="link" danger>
                        Xóa
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
