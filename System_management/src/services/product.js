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

const apiGetListCatalogs = function ({ PageIndex, PageSize }) {
  return axios.get(`/Catalogs?pageIndex=${PageIndex}&pageSize=${PageSize}`);
};

const apiProductSearch = function ({ PageIndex, PageSize, data }) {
  return axios.post(
    `/Products/search?PageIndex=${PageIndex}&pageSize=${PageSize}`,
    data
  );
};

export {
  apiGetProductList,
  apiCreateProduct,
  apiDetailProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiGetListCatalogs,
  apiProductSearch,
  apiRestoreProduct
};
