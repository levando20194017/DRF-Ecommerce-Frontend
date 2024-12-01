import { TypeLocal } from "./typeItem";

export const getUserData = () => {
    return JSON.parse(localStorage.getItem(TypeLocal.USER_DATA) || "{}").user_infor;
}

export const getOrderLocal = () => {
    return JSON.parse(localStorage.getItem(TypeLocal.ORDER_ITEM) || "[]")
}

