import client from "../axios/axiosClient"

const apiGetProductDetailInStore = (storeId: number) => {
    return client.get(`api/store/get-detail-store/?store_id=${storeId}`);
}

export {
    apiGetProductDetailInStore
}