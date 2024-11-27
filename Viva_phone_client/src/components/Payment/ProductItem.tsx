import React from 'react';
import { Product } from '../../types';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <div className="d-flex align-items-center py-3 cart-item">
            {/* Checkbox */}
            <div className='d-flex col-6'>
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

            <div className='col-6 d-flex'>
                <div className="col-4 price text-center">
                    {product.price.toLocaleString()}₫
                </div>

                <div className="col-4 text-center">
                    {product.quantity}
                </div>

                <div className="col-4 text-center fw-bold price">
                    {(product.price * product.quantity).toLocaleString()}₫
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
