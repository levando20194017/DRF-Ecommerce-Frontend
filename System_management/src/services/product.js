import axios from "../api/axiosClient";

const apiGetProductList = function ({ pageIndex, pageSize, searchName }) {
  return axios.get(`/api/product/admin/search-products/?page_index=${pageIndex}&page_size=${pageSize}&name=${searchName}`);
};
const apiCreateProduct = function (data) {
  return axios.post("/api/product/admin/create-new-product/", data);
};

const apiDetailProduct = function (id) {
  return axios.get(`/api/product/get-detail-product/?id=${id}`);
};

const apiUpdateProduct = function (data) {
  return axios.put(`/api/product/admin/edit-product/`, data);
};

const apiDeleteProduct = function (id) {
  return axios.delete(`/api/product/admin/delete-product/?id=${id}`);
};

const apiRestoreProduct = function (data) {
  return axios.put(`/api/product/admin/restore-product/`, data);
};

/// product in coming
const apiAddProductToStore = function (data) {
  return axios.post(`/api/product_incoming/admin/create-product-incoming/`, data);
};

const apiGetListProductIncoming = function ({ pageIndex, pageSize, searchName, startDate, endDate }) {
  return axios.get(`/api/product_incoming/admin/search_product_incomings/?page_index=${pageIndex}&page_size=${pageSize}&product_name=${searchName}&start_date=${startDate}&end_date=${endDate}`);
};

const apiDetailProductIncoming = function (id) {
  return axios.get(`/api/product_incoming/admin/detail-product-incoming/?id=${id}`);
};

const apiUpdateProductIncoming = function (data) {
  return axios.put(`/api/product_incoming/admin/edit-product-incoming/`, data);
};

const apiDeleteProductIncoming = function (id) {
  return axios.delete(`/api/product_incoming/admin/delete-product-incoming/?id=${id}`);
};

// product in store
const apiGetListProductInStore = function ({ pageIndex, pageSize, searchName, storeId }) {
  return axios.get(`/api/product_store/admin/search-products-in-store/?page_index=${pageIndex}&page_size=${pageSize}&product_name=${searchName}&store_id=${storeId}`);
};
//product sold

const apiGetListProductSold = function ({ pageIndex, pageSize, startDate, endDate, storeId }) {
  return axios.get(`/api/product_sale/admin/get-all-products-sale/?page_index=${pageIndex}&page_size=${pageSize}&store_id=${storeId}&start_date=${startDate}&end_date=${endDate}`);
};


export {
  apiGetProductList,
  apiCreateProduct,
  apiDetailProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiRestoreProduct,
  apiAddProductToStore,
  apiGetListProductIncoming,
  apiDetailProductIncoming,
  apiDeleteProductIncoming,
  apiUpdateProductIncoming,
  apiGetListProductInStore,
  apiGetListProductSold
};
