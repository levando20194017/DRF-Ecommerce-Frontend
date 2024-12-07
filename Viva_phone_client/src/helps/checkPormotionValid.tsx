export const checkPromotionValid = (product: any) => {
    const now = new Date();
    const fromDate = new Date(product.promotion_from_date); // Chuyển từ chuỗi sang Date object
    const toDate = new Date(product.promotion_to_date);

    return product?.promotion_name &&
        product.promotion_status !== "inactive" &&
        now >= fromDate &&
        now <= toDate;
};
