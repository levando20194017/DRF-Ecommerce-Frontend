import React, { useState } from 'react';
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
import { getTotalDiscountByOrder } from '../../../helps/getTotalDiscount';
import ModalReview from '../../Reviews/ModalReview';

const OrderList: React.FC<any> = ({ listOrders, handleGetListOrder }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [productReview, setProductReview] = useState({})

    const handleCancelOrder = async (id: number) => {
        try {
            const response = await apiCanceledOrder({ order_id: id })
            if (response.status === 200) {
                message.success("Hủy đơn hàng thành công.")
                handleGetListOrder("")
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

    const onCloseModal = () => {
        setModalVisible(false)
    }

    const handleClickReview = (product: any) => {
        setProductReview(product)
        setModalVisible(true)
    }

    return (
        <div className="order-list">
            <ModalReview visible={modalVisible} onClose={onCloseModal} productReview={productReview} />
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
                                    <div className='qty'>Ưu đãi: {item.promotion_name ? item.promotion_name : "Không"}</div>
                                    {item.promotion_name &&
                                        <div className='qty'>Giảm giá: <span className="price">
                                            {item.promotion_discount_type === promotionType.PERCENT ?
                                                `${item.promotion_discount_value}%` :
                                                `${formatPrice(item.promotion_discount_value)}`}
                                        </span>
                                        </div>}
                                </div>
                                <div className='d-flex flex-column justify-content-between'>
                                    <div className="price">{formatPrice(item.unit_price)}</div>
                                    {order.order_status === OrderStatusType.DELIVERY &&
                                        <button className="rate-btn" onClick={() => handleClickReview(item.product)}>Đánh giá</button>
                                    }
                                </div>
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
                            {getTotalDiscountByOrder(order.items) ? <div className='total'>Khuyến mãi: <span className='price'>{formatPrice(getTotalDiscountByOrder(order.items))}</span></div> : ""}
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
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
