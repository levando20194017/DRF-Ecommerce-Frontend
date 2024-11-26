import React, { useState } from 'react';
import './notification.scss';
import { Button, Image } from 'antd';

interface Notification {
    title: string;
    image: string;
    content: string;
    created_at: string;
}
const Notification: React.FC = () => {

    const [listNoti, setListNoti] = useState([{
        title: "Trạng thái đơn hàng",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        content: "Đơn hàng đã hoàn thành, bạn hãy kiểm tra sản phẩm và đánh giá để giúp người khác có thể hiểu hơn về sản phẩm nhé!",
        created_at: "21-11-2024 07:09",
    },
    {
        title: "Trạng thái đơn hàng",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        content: "Đơn hàng đã hoàn thành, bạn hãy kiểm tra sản phẩm và đánh giá để giúp người khác có thể hiểu hơn về sản phẩm nhé!",
        created_at: "21-11-2024 07:09",
    }])
    return (
        <div className="notification-page">
            {listNoti.map((item, index) => (
                <div className='d-flex gap-3 justify-content-between' key={index}>
                    <div>
                        <Image src={item.image} />
                    </div>
                    <div className='d-flex flex-column gap-1' style={{ flex: 1 }}>
                        <div className='title'>{item.title}</div>
                        <div className='content'>{item.content}</div>
                        <div className='content' style={{ fontSize: "14px" }}>{item.created_at}</div>
                    </div>
                    <div className=''>
                        <Button className='btn-rate'>Đánh giá sản phẩm</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notification;
