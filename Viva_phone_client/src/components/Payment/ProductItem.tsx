import React from 'react';
// import { Product } from '../../types';
import { formatPrice } from '../../utils/format';
import { promotionType } from '../../utils/promotionType';
import { checkPromotionValid } from '../../helps/checkPormotionValid';
import { Image } from 'antd';

// interface ProductItemProps {
//     product: Product;
// }

const ProductItem: React.FC<any> = ({ item }) => {
    return (
        <div className="d-flex align-items-center py-3 cart-item">
            {/* Checkbox */}
            <div className='d-flex col-6'>
                <Image
                    src={(item.product.image)}
                    alt={item.product.name}
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: "4px" }}
                    className="me-3"
                />
                <div>
                    <div className='product-name fw-bold'>{item.product.name}</div>
                    <div className='another-info'>Màu sắc: {item.color}</div>
                    <div className='another-info'>Ưu đãi: {checkPromotionValid(item.product) ? item.product.promotion_name : "Không"}</div>
                    {checkPromotionValid(item.product) && <div className='another-info'>
                        Giảm giá:
                        <span className="price">
                            {item.product.promotion_discount_type === promotionType.PERCENT ?
                                `${item.product.promotion_discount_value}%` :
                                `${formatPrice(item.product.promotion_discount_value)}`}
                        </span>
                    </div>}
                </div>
            </div>

            <div className='col-6 d-flex'>
                <div className="col-4 price text-center">
                    {formatPrice(item.product.price)}
                </div>

                <div className="col-4 text-center">
                    {item.quantity}
                </div>

                <div className="col-4 text-center fw-bold price">
                    {formatPrice(item.product.price * item.quantity)}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
