import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '../../../screens/Routes';
import { OrderStatus } from '../../../utils/orderStatus';

const HeaderTabs: React.FC<any> = ({ handleGetListOrder }) => {
    const tabs = [
        { label: "Tất cả", path: Routes.AllOrder.path, status: "" },
        { label: "Chờ xác nhận", path: Routes.OrderWaitConfirm.path, status: OrderStatus.PENDING },
        { label: "Đã xác nhận", path: Routes.OrderConfirm.path, status: OrderStatus.CONFIRMED },
        { label: "Vận chuyển", path: Routes.OrderTransit.path, status: OrderStatus.SHIPPED },
        { label: "Hoàn thành", path: Routes.OrderReceived.path, status: OrderStatus.DELIVERY },
        { label: "Đã hủy", path: Routes.OrderCanceled.path, status: OrderStatus.CANCELLED },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const handleClickItemHeader = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        if (location.pathname) {
            handleGetListOrder(tabs.find(item => item.path === location.pathname)?.status)
        }
    }, [location])

    return (
        <div className="header-tabs">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`tab ${location.pathname === tab.path ? 'active' : ''}`}
                    onClick={() => handleClickItemHeader(tab.path)}
                >
                    {tab.label}
                </button>
            ))}
            <div className="div-header-tab-empty"></div>
        </div>
    );
};

export default HeaderTabs;
