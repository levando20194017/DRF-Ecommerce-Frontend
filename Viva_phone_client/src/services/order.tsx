import client from "../axios/axiosClient"
import { Order } from "../types";

const apiCreateNewOrder = (data: Order) => {
    return client.post("api/order/create-new-order/", data);
}

interface GetOrderByStatus {
    page_index: number,
    page_size: number,
    guest_id: number,
    order_status: string,
}
const apiGetListOrdersByStatus = (data: GetOrderByStatus) => {
    return client.get(`api/order/get-list-orders/?page_index=${data.page_index}&page_size=${data.page_size}&guest_id=${data.guest_id}&order_status=${data.order_status}`);
}

const apiGetOrderDetail = (order_id: number) => {
    return client.get(`api/order/get-order-detail/?order_id=${order_id}`);
}

const apiCanceledOrder = (data: { order_id: number }) => {
    return client.put("api/order/cancel-order/", data);
}

export {
    apiCreateNewOrder,
    apiGetListOrdersByStatus,
    apiGetOrderDetail,
    apiCanceledOrder
}; 