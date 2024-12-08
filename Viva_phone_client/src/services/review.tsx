import client from "../axios/axiosClient"

interface GetReviewData {
    storeId: number,
    productId: number,
    pageIndex: number,
    pageSize: number
}
const apiGetListReviews = (data: GetReviewData) => {
    return client.get(`api/review/get-list-reviews/?store_id=${data.storeId}&page_index=${data.pageIndex}&page_size=${data.pageSize}&product_id=${data.productId}`);
}

export {
    apiGetListReviews
}