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

// - guest_id: int
// - product_id: int
// - store_id: int (optional)
// - rating: int (1 <= rating <= 5)
// - comment: string (optional)
// - gallery: string (optional)

const apiGuestReview = (data: any) => {
    return client.post(`api/review/guest-review/`, data);
}

const apiGetListGallery = function (formData: any) {
    return client.post("/api/product/upload-gallery/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const apiDeleteReview = function (id: number) {
    return client.delete(`api/review/delete-review/id=${id}`);
};

const apiUpdateReview = function (data: any) {
    return client.put(`api/review/update-review/`, data);
};

export {
    apiGetListReviews,
    apiGuestReview,
    apiGetListGallery,
    apiDeleteReview,
    apiUpdateReview
}