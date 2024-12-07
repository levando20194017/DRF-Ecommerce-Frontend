import React from 'react';
import './Order.scss';
import EmptyOrderImg from "../../../assets/images/empty_order.png"
import { getUserData } from '../../../helps/getItemLocal';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Routes } from '../../../screens/Routes';
const EmptyOrder: React.FC = () => {
    const userData = getUserData()

    return (
        <div className="empty-order">
            <img src={EmptyOrderImg} />
            {userData?.id ?
                <>
                    <div className='fw-bold fs-4'>Chưa có đơn hàng</div>
                    <div className='content'>Hãy tham khảo các sản phẩm của chúng tôi ở mục <Link to={Routes.Store.path}>Cửa hàng</Link> nhé!</div>
                </>
                :
                <>
                    <div>Vui lòng đăng nhập để sử dụng dịch vụ của chúng tôi</div>
                    <Link to={Routes.Login.path}>
                        <Button type='primary' style={{ borderRadius: "2px" }}>Đăng nhập</Button>
                    </Link>
                </>
            }
        </div>
    );
};

export default EmptyOrder;
