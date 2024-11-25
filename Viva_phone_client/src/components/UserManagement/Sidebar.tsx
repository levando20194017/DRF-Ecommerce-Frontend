import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { RiCoupon3Fill } from "react-icons/ri";
import { BiSolidShoppingBagAlt } from "react-icons/bi";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="user-info">
                <div className="avatar"></div>
                <div className="username">levando0708</div>
                <button className="edit-profile">Sửa Hồ Sơ</button>
            </div>
            <hr />
            <div className="menu">
                <div className="menu-item active">
                    <div><FaRegUser /></div>
                    <div>Tài Khoản Của Tôi</div>
                </div>
                <div className="menu-item">
                    <div><BiSolidShoppingBagAlt /> </div>
                    <div> Đơn Mua</div>
                </div>
                <div className="menu-item">
                    <div> <IoIosNotifications style={{ fontSize: "20px" }} /> </div>
                    <div> Thông Báo</div>
                </div>
                <div className="menu-item">
                    <div><RiCoupon3Fill /> </div>
                    <div>Kho Voucher</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
