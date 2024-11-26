import React from 'react';
import './orderStatus.scss';
import { GrPrevious } from 'react-icons/gr';
import { Steps } from 'antd';
import OrderItem from '../Order/OrderItem';
import { Link } from 'react-router-dom';
import { Routes } from '../../../screens/Routes';

const OrderStatus: React.FC = () => {
    const items = [
        {
            title: 'Đơn hàng đã được tạo',
            description: "16-11-2024 07:30",
        },
        {
            title: 'Xác nhận',
            description: "16-11-2024 07:30",
        },
        {
            title: 'Giao cho đơn vị vận chuyển',
            description: "16-11-2024 07:30",
        },
        {
            title: 'Giao hàng thành công',
            description: "16-11-2024 07:30",
        },
    ];

    const orderItem = {
        id: 1,
        shop: "Viva Phone",
        status: "Hoàn thành",
        items: [
            { name: "[LIVE] Combo 2 Sữa rửa mặt Simple", price: 206000, image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", quantity: 2 },
            { name: "Sữa dưỡng thể Vaseline", price: 82500, image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", quantity: 1 }
        ],
        total: 288400
    }

    return (
        <div className="order-status-page">
            <div className='header'>
                <div className='d-flex gap-2 align-items-center cursor-pointer'>
                    <GrPrevious />
                    Trở lại
                </div>
                <div className='d-flex gap-2'>
                    <span>Mã đơn hàng: 1</span>
                    <span>I</span>
                    <span className='order-status'>Đơn hàng đã {orderItem.status}</span>
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
                                Đơn hàng #{orderItem.id}
                            </div>
                            <div className='text-more ms-2 pt-1'>
                                Xem lại các sản phẩm mà bạn đã đặt bên dưới!
                            </div>
                        </span>
                    </div>
                    <div className="items">
                        {orderItem.items.map((item, index) => (
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
                    <div>
                        <div className='address'>Địa chỉ nhận hàng</div>
                        <div className='mt-3 d-flex flex-column gap-1'>
                            <div className='customer-name'>Lê Văn Do</div>
                            <div className='orther-info'>0987565773</div>
                            <div className='orther-info'>46 ngõ 61 Định Công, Hoàng Mai, Hà Nội</div>
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
                            <div className="total">Tổng tiền: <span className='price'>{orderItem.total.toLocaleString()}₫</span></div>
                            <div className='d-flex gap-4'>
                                <button className='btn-cancel'>Hủy đơn</button>
                                <button className="rate-btn">Đánh giá</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;
