import client from "../axios/axiosClient"
import { Order } from "../types";

const apiCreateNewOrder = (data: Order) => {
    return client.post("api/order/create-new-order/", data);
}

export {
    apiCreateNewOrder,
}; 