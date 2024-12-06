export const checkPromotionValid = (product: any) => {
    const now = new Date();
    return product?.promotion_name &&
        product.promotion_status !== "inactive" &&
        now >= product.promotion_from_date &&
        now <= product.promotion_to_date;
};
