import { promotionType } from "../utils/promotionType";

export const getDiscountByOrder = (item) => {
    if (item?.promotion_name) {
        if (item.promotion_discount_type === promotionType.FIXED) {
            return (item.promotion_discount_value * item.quantity);
        } else {
            return ((item.promotion_discount_value * item.unit_price / 100) * item.quantity);
        }
    } else {
        return 0
    }
};

export const getTotalDiscountByOrder = (items) => {
    return items?.reduce((sum, item) => {
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

