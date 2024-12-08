import React from 'react';
// import OrderItem from './OrderItem';
import './Order.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from '../../../screens/Routes';
import { formatPrice } from '../../../utils/format';
import { getImageUrl } from '../../../helps/getImageUrl';
import { OrderStatusType, OrderStatusShow } from '../../../utils/orderStatus';
import { promotionType } from '../../../utils/promotionType';
import { apiCanceledOrder } from '../../../services/order';
import { Image, message, Popconfirm } from 'antd';
import { setOrderLocal } from '../../../helps/setLocalStorage';

const OrderList: React.FC<any> = ({ listOrders, handleGetListOrder }) => {
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
    const handleCancelOrder = async (id: number) => {
        try {
            const response = await apiCanceledOrder({ order_id: id })
            if (response.status === 200) {
                message.success("Hủy đơn hàng thành công.")
                handleGetListOrder()
            } else {
                message.error("Hủy đơn hàng thất bại, liên hệ chúng tôi để được hỗ trợ.")
            }
        } catch (e) {
            console.log(e);
            message.error("Hủy đơn hàng thất bại, liên hệ chúng tôi để được hỗ trợ.")
        }
    }
    const navigate = useNavigate();
    const handleBuyBackOrder = (orderDetail: any) => {
        if (orderDetail.items?.length > 0) {
            setOrderLocal(orderDetail.items)
            navigate(Routes.Payment.path)
        }
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
                                    <Image src={getImageUrl(item.product.image)} />
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
                                <Link to={Routes.OrderStatus.getPath({ orderId: order.id })}>
                                    <div>
                                        <button className="rate-btn">Chi tiết đơn hàng</button>
                                    </div>
                                </Link>
                                {(order.order_status === OrderStatusType.CANCELLED || order.order_status === OrderStatusType.DELIVERY) &&
                                    <button className='btn-cancel' onClick={() => { handleBuyBackOrder(order) }}>Mua lại</button>}
                                {order.order_status === OrderStatusType.PENDING &&
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn hủy đơn hàng này không?"
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={() => handleCancelOrder(order.id)}
                                        className="cursor-pointer text-center"
                                    >
                                        <button className='btn-cancel'>Hủy đơn</button>
                                    </Popconfirm>
                                }
                                {order.order_status === OrderStatusType.DELIVERY &&
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
