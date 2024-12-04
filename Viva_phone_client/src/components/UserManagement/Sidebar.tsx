import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { RiCoupon3Fill } from "react-icons/ri";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom'; // Import hook
import { getUserData } from '../../helps/getItemLocal';
import { Routes } from '../../screens/Routes';

const Sidebar: React.FC = () => {
    const tabsSidebar = [
        { label: "Tài khoản của tôi", path: Routes.UserInfor.path, icon: <FaRegUser /> },
        { label: "Đơn mua", path: Routes.AllOrder.path, icon: <BiSolidShoppingBagAlt /> },
        { label: "Thông báo", path: Routes.Notification.path, icon: <IoIosNotifications style={{ fontSize: "20px" }} /> },
        { label: "Kho voucher", path: Routes.UserVoucher.path, icon: <RiCoupon3Fill /> },
    ];

    const location = useLocation(); // Lấy thông tin path hiện tại
    const userData = getUserData();
    const navigate = useNavigate();

    const handleClickItem = (path: string) => {
        navigate(path);
    };

    return (
        <div className="sidebar">
            <div className="user-info">
                <div className="avatar"></div>
                <div className="username">{userData?.last_name} {userData?.first_name}</div>
                <button className="edit-profile">Sửa Hồ Sơ</button>
            </div>
            <hr />
            <div className="menu">
                {tabsSidebar.map((tab, index) => (
                    <div
                        key={index}
                        className={`menu-item ${location.pathname === tab.path ? 'active' : ''}`}
                        onClick={() => { handleClickItem(tab.path) }}
                    >
                        <div>{tab.icon}</div>
                        <div>{tab.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
