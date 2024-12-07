import React, { useEffect, useState } from 'react';
import './orderStatus.scss';
import { GrPrevious } from 'react-icons/gr';
import { message, Popconfirm, Steps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from '../../../screens/Routes';
import { apiCanceledOrder, apiGetOrderDetail } from '../../../services/order';
import { formatPrice, formatTime, formatTime2 } from '../../../utils/format';
import { getImageUrl } from '../../../helps/getImageUrl';
import { OrderStatusShow, OrderStatusType } from '../../../utils/orderStatus';
import { promotionType } from '../../../utils/promotionType';
import { PaymentMethodShow, PaymentStatus, PaymentStatusShow } from '../../../utils/paymentType';
import { getTotalDiscountByOrder } from '../../../helps/getTotalDiscount';
import { setOrderLocal } from '../../../helps/setLocalStorage';

const OrderStatus: React.FC = () => {
    const [items, setItems] = useState<any>([
        {
            title: 'Đơn hàng đã được tạo',
            description: "",
        },
        {
            title: 'Xác nhận',
            description: "",
        },
        {
            title: 'Giao cho đơn vị vận chuyển',
            description: "",
        },
        {
            title: 'Giao hàng thành công',
            description: "",
        },
    ]);

    const urlParams = new URLSearchParams(window.location.search);
    const order_id = Number(urlParams.get('order_id')) || 0; // Chuyển thành number, mặc định 0 nếu null
    const [orderDetail, setOrderDetail] = useState<any>({});

    const handleGetOrderDetail = async () => {
        try {
            const response = await apiGetOrderDetail(order_id)
            if (response.status === 200) {
                setOrderDetail(response.data)
                const newItems = [...items]
                newItems[0].description = formatTime2(response.data.created_at)
                newItems[1].description = response.data.date_confirmed ? formatTime2(response.data.date_confirmed) : ""
                newItems[2].description = response.data.date_shipped ? formatTime2(response.data.date_shipped) : ""
                newItems[3].description = response.data.date_delibered ? formatTime2(response.data.date_delibered) : ""
                setItems(newItems)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (order_id) {
            handleGetOrderDetail()
        }
    }, [])
    const navigate = useNavigate()
    const handleBuyBackOrder = () => {
        if (orderDetail.items?.length > 0) {
            setOrderLocal(orderDetail.items)
            navigate(Routes.Payment.path)
        }
    }

    const handleCancelOrder = async (id: number) => {
        try {
            const response = await apiCanceledOrder({ order_id: id })
            if (response.status === 200) {
                message.success("Hủy đơn hàng thành công.")
            } else {
                message.error("Hủy đơn hàng thất bại, liên hệ chúng tôi để được hỗ trợ.")
            }
        } catch (e) {
            console.log(e);
            message.error("Hủy đơn hàng thất bại, liên hệ chúng tôi để được hỗ trợ.")
        }
    }


    return (
        <div className="order-status-page">
            <div className='header'>
                <Link to={Routes.AllOrder.path}>
                    <div className='d-flex gap-2 align-items-center cursor-pointer'>
                        <GrPrevious />
                        Trở lại
                    </div>
                </Link>
                <div className='d-flex gap-2'>
                    <span>Mã đơn hàng: 1</span>
                    <span>I</span>
                    <span className='order-status'>
                        {OrderStatusShow[orderDetail.order_status]}
                    </span>
                </div>
            </div>
            <div className='order-step'>
                <Steps current={1} labelPlacement="vertical" items={items} />
            </div>
            <div className='order-detail'>
                <div className="order-item">
                    <div className="order-item_header">
                        <span className="d-flex gap-2">
                            <div className='shop-name'>
                                Đơn hàng #{orderDetail.id}
                            </div>
                            <div className='text-more ms-2 pt-1'>
                                Xem lại các sản phẩm mà bạn đã đặt bên dưới!
                            </div>
                        </span>
                        {orderDetail.order_status === OrderStatusType.CANCELLED &&
                            <span className='d-flex gap-2'>
                                <span className='shop-name'>Thời gian hủy:</span> <span className='text-more fs-6'>{formatTime(orderDetail.date_cancelled)}</span>
                            </span>
                        }
                    </div>
                    <div className="items">
                        {orderDetail.items?.map((item: any, index: number) => (
                            <div key={index} className="item">
                                <div className='image'>
                                    <img src={getImageUrl(item.product.image)} />
                                </div>
                                <div className="name ms-3">
                                    <div className='fw-bold'>{item.product.name}</div>
                                    <div className='qty'>Số lượng: {item.quantity}</div>
                                    <div className='qty'>Màu sắc: {item.product.color}</div>
                                    {item.promotion_name &&
                                        <>
                                            <div className='qty'>Ưu đãi: {item.product.promotion ? item.product.promotion_name : "Không"}</div>
                                            {item.promotion_discount_type && <div className='qty'>Giảm giá: <span className="price">
                                                {item.promotion_discount_type === promotionType.PERCENT ?
                                                    `${item.promotion_discount_value}%` :
                                                    `${formatPrice(item.promotion_discount_value)}`}</span>
                                            </div>}
                                        </>}

                                </div>
                                <div className="price">{formatPrice(item.unit_price)}</div>
                            </div>
                        ))}
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <div className='address'>Địa chỉ nhận hàng</div>
                            <div className='mt-3 d-flex flex-column gap-1'>
                                <div className='customer-name'>{orderDetail.recipient_name}</div>
                                <div className='orther-info'>{orderDetail.recipient_phone}</div>
                                <div className='orther-info'>{orderDetail.shipping_address}</div>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            <div className='payment-method'>
                                <div className='label'>Phương thức thanh toán: </div>
                                <div className='status'>{PaymentMethodShow[orderDetail.payment_method]}</div>
                            </div>
                            <div className='payment-method'>
                                <div className='label'>Trạng thái:</div>
                                <div className={`${orderDetail.payment_status === PaymentStatus.PAID ?
                                    "status success" : "status unpaid"}`}>
                                    {PaymentStatusShow[orderDetail.payment_status]}
                                </div>
                            </div>
                        </div>
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
                            {getTotalDiscountByOrder(orderDetail?.items) ?
                                <div className='total'>Khuyến mãi: <span className='price'>{formatPrice(getTotalDiscountByOrder(orderDetail.items))}</span></div>
                                :
                                ""
                            }
                            <div className="total">Tổng tiền: <span className='price'>{formatPrice(orderDetail.total_cost)}</span></div>
                            <div className='d-flex justify-content-end gap-4'>
                                {orderDetail.order_status === OrderStatusType.CANCELLED &&
                                    <button className='btn-cancel' onClick={() => { handleBuyBackOrder() }}>Mua lại</button>}
                                {orderDetail.order_status === OrderStatusType.PENDING &&
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn hủy đơn hàng này không?"
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={() => handleCancelOrder(order_id)}
                                        className="cursor-pointer text-center"
                                    >
                                        <button className='btn-cancel'>Hủy đơn</button>
                                    </Popconfirm>
                                }
                                {orderDetail.order_status === OrderStatusType.DELIVERY &&
                                    <button className="rate-btn">Đánh giá</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;
