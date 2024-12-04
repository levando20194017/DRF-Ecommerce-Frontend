import React from 'react';
import Sidebar from '../../components/UserManagement/Sidebar';
import HeaderTabs from '../../components/UserManagement/Order/HeaderTabs';
import OrderList from '../../components/UserManagement/Order/OrderList';
import './style.scss';
import SearchOrder from '../../components/UserManagement/Order/Search';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyOrder from '../../components/UserManagement/Order/EmptyOrder';
import AccountInfor from '../../components/UserManagement/MyAccount/AccountInfor';
import Notification from '../../components/UserManagement/Notification';
import EmptyNoti from '../../components/UserManagement/Notification/EmptyNotification';
import OrderStatus from '../../components/UserManagement/OrderStatus';
import Orders from './Orders';
import { useLocation } from 'react-router-dom';
import { Routes } from '../Routes';
import Voucher from '../../components/UserManagement/Voucher';

const UserManagementPage: React.FC = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: "/" },
        { label: "Trang cá nhân" },
    ];
    const location = useLocation();

    return (
        <>
            <div className='div-empty'></div>
            <div className='container user-page-container mt-3'>
                <Breadcrumb breadcrumbs={breadcrumbs} />
                <div className="d-flex mt-5 gap-4">
                    <Sidebar />
                    <div className="user-management-content">
                        {location.pathname === Routes.UserInfor.path &&
                            <AccountInfor />
                        }
                        {location.pathname === Routes.Notification.path &&
                            <Notification />
                        }
                        {location.pathname === Routes.OrderStatus.path &&
                            <OrderStatus />
                        }
                        {location.pathname.includes("order") &&
                            <Orders />
                        }
                        {location.pathname === Routes.UserVoucher.path &&
                            <Voucher />
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserManagementPage;
