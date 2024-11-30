import client from "../axios/axiosClient"
interface BestSelling {
    pageIndex: number;
    pageSize: number;
    store_id: number;
}

const apiGetBestSelling = (data: BestSelling) => {
    return client.get(`api/product_sale/admin/get-list-sold-products-filter/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&store_id=${data.store_id}`);
}

const apiGetListProductsByCatalog = (data: any) => {
    return client.get(`api/product/get-list-products-by-catalog/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&catalog_id=${data.catalog_id}`);
}

//api/product/get-one-product-per-catalog/
export {
    apiGetBestSelling, apiGetListProductsByCatalog
}; 