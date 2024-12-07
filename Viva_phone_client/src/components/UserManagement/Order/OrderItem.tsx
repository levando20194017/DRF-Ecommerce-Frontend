import React from 'react';
import './Order.scss';
import { Link } from 'react-router-dom';
import { Routes } from '../../../screens/Routes';

// interface OrderItemProps {
//     order: {
//         id: number;
//         shop: string;
//         status: string;
//         items: { name: string; price: number; image: string; quantity: number }[];
//         total: number;
//     };
// }

const OrderItem: React.FC<any> = ({ order }) => {
    return (
        <div className="order-item">
            <div className="order-item_header">
                <span className="d-flex gap-2">
                    <div className='shop-name'>
                        Đơn hàng #{order.id}
                    </div>
                    <div className='text-more ms-2 pt-1'>
                        Xem lại các sản phẩm mà bạn đã đặt bên dưới!
                    </div>
                </span>
                <span className="status">{order.status}</span>
            </div>
            <div className="items">
                {order.items.map((item: any, index: number) => (
                    <div key={index} className="item">
                        <div className='image'>
                            <img src={item.image} />
                        </div>
                        <div className="name ms-3">
                            <div>{item.name}</div>
                            <div className='qty'>Số lượng: {item.quantity}</div>
                            <div className='qty'>Khuyến mãi: Khuyến mãi dịp Tết 2024</div>
                        </div>
                        <div className="price">{item.price.toLocaleString()}₫</div>
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
                    <div className="total">Tổng tiền: <span className='price'>{order.total.toLocaleString()}₫</span></div>
                    <div className='d-flex gap-4'>
                        <button className='btn-cancel'>Hủy đơn</button>
                        <button className="rate-btn">Đánh giá</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
