import client from "../axios/axiosClient"
interface BestSelling {
    pageIndex: number;
    pageSize: number;
    store_id: number;
}

const apiGetBestSelling = (data: BestSelling) => {
    return client.get(`api/product_sale/get-list-sold-products-filter/?page_index=${data.pageIndex}&page_size=${data.pageSize}&store_id=${data.store_id}`);
}

const apiGetListProductsByCatalog = (data: any) => {
    return client.get(`api/product/get-list-products-by-catalog/?page_index=${data.pageIndex}&page_size=${data.pageSize}&catalog_id=${data.catalog_id}`);
}

//api/product/get-one-product-per-catalog/
interface DetailProductStore {
    productId: number,
    storeId: number
}
const apiGetProductDetailInStore = (data: DetailProductStore) => {
    return client.get(`api/product_store/detail-of-product-and-store/?product_id=${data.productId}&store_id=${data.storeId}`);
}

const apiGetAllProducts = (data: any) => {
    return client.get(`api/product/get-list-products/?page_index=${data.pageIndex}&page_size=${data.pageSize}`);
}

interface SearchProductStore {
    storeId: number,
    pageIndex: number,
    pageSize: number,
    textSearch: string
}
const apiSearchProductsInStore = (data: SearchProductStore) => {
    return client.get(`api/product_store/search-products-in-store/?store_id=${data.storeId}&textSearch=${data.textSearch}&page_index=${data.pageIndex}&page_size=${data.pageSize}`);
}

interface SearchProductStoreByCatalog {
    storeId: number,
    pageIndex: number,
    pageSize: number,
    catalogId: number,
    textSearch: string
}
const apiSearchProductsInStoreByCatalog = (data: SearchProductStoreByCatalog) => {
    return client.get(`api/product_store/search-products-in-store-by-catalog/?store_id=${data.storeId}&textSearch=${data.textSearch}&page_index=${data.pageIndex}&page_size=${data.pageSize}&catalog_id=${data.catalogId}`);
}

//Dùng để hiển thị danh sách các sản phẩm mà cửa hàng nhập về.
const apiGetListProductsIncomingByCatalog = (data: any) => {
    return client.get(`api/product_incoming/get-list-product-incoming-by-catalog/?page_index=${data.pageIndex}&page_size=${data.pageSize}&catalog_id=${data.catalog_id}`);
}

//api gợi ý sản phẩm

const apiRecommendProducts = (data: any) => {
    return client.get(`api/product_store/recommend-products/?page_index=${data.pageIndex}&page_size=${data.pageSize}&store_id=${data.store_id}&guest_id=${data.guest_id}`);
}
export {
    apiGetBestSelling,
    apiGetListProductsByCatalog,
    apiGetProductDetailInStore,
    apiSearchProductsInStore,
    apiGetAllProducts,
    apiGetListProductsIncomingByCatalog,
    apiSearchProductsInStoreByCatalog,
    apiRecommendProducts
}; 