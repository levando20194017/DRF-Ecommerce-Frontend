import React from 'react';
import OrderItem from './OrderItem';
import './Order.scss';

const OrderList: React.FC = () => {
    const orders = [
        {
            id: 1,
            shop: "Viva Phone",
            status: "Hoàn thành",
            items: [
                { name: "[LIVE] Combo 2 Sữa rửa mặt Simple", price: 206000, image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", quantity: 2 },
                { name: "Sữa dưỡng thể Vaseline", price: 82500, image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", quantity: 1 }
            ],
            total: 288400
        },
        {
            id: 2,
            shop: "Viva Phone",
            status: "Đang vận chuyển",
            items: [
                { name: "[LIVE] Combo 2 Sữa rửa mặt Simple", price: 206000, image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", quantity: 2 },
                { name: "Sữa dưỡng thể Vaseline", price: 82500, image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", quantity: 1 }
            ],
            total: 288400
        },
        // {
        //     id: 2,
        //     shop: "Unilever Việt Nam",
        //     status: "Hoàn thành",
        //     items: [
        //         { name: "Sữa Tắm Lifebuoy Detox 800gr", price: 354000 }
        //     ],
        //     total: 354000
        // }
    ];

    return (
        <div className="order-list">
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
};

export default OrderList;
