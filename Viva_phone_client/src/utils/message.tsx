export const messageType: any = {
    pending: "Vui lòng chờ xác nhận của chúng tôi",
    confirmed: "Đang chờ giao cho đơn vị vận chuyển",
    shipped: "Vui lòng để ý điện thoại để nhận cuộc gọi nhận hàng",
    delivery: "Hãy đánh giá sản phẩm của chúng tôi và giúp nhiều người có thể hiểu biết hơn về sản phẩm nhé!",
    canceled: "Bạn có thể mua lại đơn hàng ở mục đã hủy",
    pay_success: "Đơn hàng sẽ được gửi lại cho bạn sớm nhất.",
    pay_failed: "Vui lòng kiểm tra lại đơn hàng chỗ mục đã hủy."
}

export const orderStatusCustom = (item: any) => {
    if (item.message.includes("You can rate the product quality."))
        return "Giao hàng thành công"
    if (item.message.includes("has been pay successfully"))
        return "Thanh toán thành công"
    if (item.message.includes("has been pay failed"))
        return "Thanh toán thất bại"
    if (item.message.includes("has been placed successfully."))
        return "Đặt hàng thành công"
    if (item.message.includes("has been confirmed."))
        return "Đơn hàng đã được xác nhận"
    if (item.message.includes("has been canceled."))
        return "Đơn hàng đã hủy"
    if (item.message.includes("has been delivered to the carrier."))
        return "Đơn hàng đã giao cho đơn vị vận chuyển"
}