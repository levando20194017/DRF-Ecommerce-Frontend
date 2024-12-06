import { promotionType } from "../utils/promotionType";

export const getTotalDiscountByCart = (listOrders: any) => {

    return listOrders.reduce((sum: number, item: any) => {
        if (item.product?.promotion_name) {
            const now = new Date();

            // Kiểm tra điều kiện status và khoảng thời gian
            if (item.product.promotion_status === "active" && now > item.product.promotion_from_date && now < item.product.promotion_to_date) {
                if (item.product.promotion_discount_type === promotionType.FIXED) {
                    return sum + (item.product.promotion_discount_value * item.quantity);
                } else {
                    return sum + ((item.product.promotion_discount_value * item.product.price / 100) * item.quantity);
                }
            } else {
                return 0;
            }
        }
        return sum; // Nếu không có khuyến mãi, giữ nguyên tổng
    }, 0);
};

export const getTotalDiscountByOrder = (listOrders: any) => {
    return listOrders?.reduce((sum: number, item: any) => {
        if (item?.promotion_name) {
            if (item.promotion_discount_type === promotionType.FIXED) {
                return sum + (item.promotion_discount_value * item.quantity);
            } else {
                return sum + ((item.promotion_discount_value * item.unit_price / 100) * item.quantity);
            }
        }
        return sum; // lấy tổng giảm giá theo order detail
    }, 0);
};

