import React, { useState } from 'react';
import HeaderTabs from '../../components/UserManagement/Order/HeaderTabs';
import OrderList from '../../components/UserManagement/Order/OrderList';
import './style.scss';
import SearchOrder from '../../components/UserManagement/Order/Search';
import { apiGetListOrdersByStatus } from '../../services/order';
import { getUserData } from '../../helps/getItemLocal';
import EmptyOrder from '../../components/UserManagement/Order/EmptyOrder';
const Orders: React.FC = () => {
    const userData = getUserData()
    const [listOrders, setListOrders] = useState<any[]>([])

    const handleGetListOrder = async (status: string) => {
        try {
            const response = await apiGetListOrdersByStatus(
                {
                    page_index: 1,
                    page_size: 1000,
                    order_status: status,
                    guest_id: userData.id
                })
            if (response.status === 200) {
                setListOrders(response.data.orders)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <HeaderTabs handleGetListOrder={handleGetListOrder} />
            {listOrders.length > 0 ?
                <>
                    <SearchOrder />
                    <OrderList listOrders={listOrders} handleGetListOrder={handleGetListOrder} />
                </>
                :
                <EmptyOrder />
            }
        </>
    );
};

export default Orders;
