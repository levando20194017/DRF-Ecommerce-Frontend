import client from "../axios/axiosClient"

const apiGetCart = (id: number) => {
    return client.get(`api/cart/guests/my-cart/?id=${id}`);
}
interface Cart {
    id: number,
    product_id: number,
    quantity: number,
    store_id: number,
    color: string
}
const apiAddToCart = (data: Cart) => {
    return client.post("api/cart/guests/add-to-cart/", data);
}

interface CartItemRemove {
    id: number,
    cart_item_id: number
}
const apiRemoveCartItem = (data: CartItemRemove) => {
    return client.post("api/cart/guests/remove-cart-item/", data);
}

interface CartItemUpdate {
    id: number,
    cart_item_id: number,
    quantity: number,
}
const apiUpdateCartItem = (data: CartItemUpdate) => {
    return client.post("api/cart/guests/remove-cart-item/", data);
}

export {
    apiGetCart,
    apiAddToCart,
    apiRemoveCartItem,
    apiUpdateCartItem
}; 