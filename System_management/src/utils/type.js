export const OrderStatusType = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    SHIPPED: "shipped",
    DELIVERY: "delivered",
    CANCELLED: "cancelled",
    RETURNED: "returned",
}

export const OrderStatusShow = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipped: "Đang vận chuyển",
    delivery: "Đã nhận hàng",
    cancelled: "Đã hủy",
    returned: "Đã trả hàng",
}


export const PaymentMethod = {
    cashOnDelivery: "cash_on_delivery",
    creditCard: "credit_card"
}
export const PaymentMethodShow = {
    cash_on_delivery: "Thanh toán khi nhận hàng",
    credit_card: "Thanh toán online"
}

export const PaymentStatus = {
    UNPAID: "unpaid",
    PAID: "paid"
}

export const PaymentStatusShow = {
    unpaid: "Chưa thanh toán",
    paid: "Đã thanh toán"
}