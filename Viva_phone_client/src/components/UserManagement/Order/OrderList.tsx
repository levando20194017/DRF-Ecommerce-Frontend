import React from 'react';
// import OrderItem from './OrderItem';
import './Order.scss';
import { Link } from 'react-router-dom';
import { Routes } from '../../../screens/Routes';
import { formatPrice } from '../../../utils/format';
import { getImageUrl } from '../../../helps/getImageUrl';
import { OrderStatus, OrderStatusShow } from '../../../utils/orderStatus';
import { promotionType } from '../../../utils/promotionType';

const OrderList: React.FC<any> = ({ listOrders }) => {
    const handleGetDiscount = (order: any) => {
        return order.items.reduce((sum: number, item: any) => {
            if (item.product.promotion) {
                if (item.product.promotion_discount_type === promotionType.FIXED) {
                    return sum + (item.product.promotion_discount_value * item.quantity);
                } else {
                    return sum + ((item.product.promotion_discount_value * item.unit_price / 100) * item.quantity);
                }
            }
            return sum; // Nếu không có khuyến mãi, giữ nguyên tổng
        }, 0)
    }
    return (
        <div className="order-list">
            {listOrders.map((order: any, index: number) => (
                <div className="order-item" key={index}>
                    <div className="order-item_header">
                        <span className="d-flex gap-2">
                            <div className='shop-name'>
                                Đơn hàng #{order.id}
                            </div>
                            <div className='text-more ms-2 pt-1'>
                                Xem lại các sản phẩm mà bạn đã đặt bên dưới!
                            </div>
                        </span>
                        {order && order.order_status ? (
                            <span className="status">{OrderStatusShow[order.order_status]}</span>
                        ) : (
                            <span className="status">Trạng thái không xác định</span>
                        )}
                    </div>
                    <div className="items">
                        {order.items.map((item: any, index: number) => (
                            <div key={index} className="item">
                                <div className='image'>
                                    <img src={getImageUrl(item.product.image)} />
                                </div>
                                <div className="name ms-3">
                                    <div className='fw-bold'>{item.product.name}</div>
                                    <div className='qty'>Số lượng: {item.quantity}</div>
                                    <div className='qty'>Màu sắc: {item.product.color}</div>
                                    <div className='qty'>Ưu đãi: {item.product.promotion ? item.product.promotion_name : "Không"}</div>
                                    {item.product.promotion_discount_type && <div className='qty'>Giảm giá: <span className="price">{item.product.promotion_discount_type === promotionType.PERCENT ? `${item.product.promotion_discount_value}%` : `${formatPrice(item.product.promotion_discount_value)}`}</span></div>}
                                </div>
                                <div className="price">{formatPrice(item.unit_price)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="order-item_footer">
                        <div className='order-item_footer_left'>
                            <div>Nếu hàng nhận được có vấn đề, bạn có thể gửi yêu cầu Trả hàng/Hoàn tiền.</div>
                            <div>Bạn có thể hủy đơn hàng trong trạng thái chờ xác nhận.</div>
                            <Link to={Routes.Contact.path}>
                                Liên hệ với chúng tôi
                            </Link>
                        </div>
                        <div className='order-item_footer_right'>
                            {handleGetDiscount(order) ? <div className='total'>Khuyến mãi: <span className='price'>{formatPrice(handleGetDiscount(order))}</span></div> : ""}
                            <div className="total">Tổng thanh toán: <span className='price'>{formatPrice(order.total_cost)}</span></div>
                            <div className='d-flex gap-4 justify-content-end'>
                                {order.order_status === OrderStatus.PENDING &&
                                    <button className='btn-cancel'>Hủy đơn</button>
                                }
                                {order.order_status === OrderStatus.DELIVERY &&
                                    <button className="rate-btn">Đánh giá</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
