import { TypeLocal } from "./typeItem"

export const setOrderLocal = (data: any) => {
    localStorage.setItem(TypeLocal.ORDER_ITEM, JSON.stringify(data))
}

export const setUserDataLocal = (data: any) => {
    localStorage.setItem(TypeLocal.USER_DATA, JSON.stringify(data))
}

export const removeData = () => {
    localStorage.removeItem(TypeLocal.USER_DATA)
    localStorage.removeItem(TypeLocal.ORDER_ITEM)
    localStorage.removeItem(TypeLocal.IS_LOGGEDIN)
}