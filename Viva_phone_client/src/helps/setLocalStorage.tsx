import { TypeLocal } from "./typeItem"

export const setOrderLocal = (data: any) => {
    localStorage.setItem(TypeLocal.ORDER_ITEM, JSON.stringify(data))
}