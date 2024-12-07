import { TypeLocal } from "./typeItem"

export const setOrderLocal = (data: any) => {
    localStorage.setItem(TypeLocal.ORDER_ITEM, JSON.stringify(data))
}

export const setUserDataLocal = (data: any) => {
    localStorage.setItem(TypeLocal.USER_DATA, JSON.stringify(data))
}