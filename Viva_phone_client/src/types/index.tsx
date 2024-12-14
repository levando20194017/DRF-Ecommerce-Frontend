export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    variant: string;
    shop: string;
}

export interface ProductType {
    id: number;
    name: string;
    price: number;
    promotion: string;
    description: string;
    image: string;
}

interface OrderDetail {
    quantity: number,
    store_id: number,
    color: string,
    product_id: number
}
export interface Order {
    guest_id: number,
    recipient_phone: string,
    shipping_address: string,
    recipient_name: string,
    payment_method: string,
    shipping_cost: number,
    gst_amount: number,
    order_details: OrderDetail[]
}