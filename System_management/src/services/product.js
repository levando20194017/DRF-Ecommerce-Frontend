import axios from "../api/axiosClient";

const apiGetProductList = function ({ PageIndex, PageSize }) {
  return axios.get(`/Products?PageIndex=${PageIndex}&PageSize=${PageSize}`);
};
const apiCreateProduct = function (params) {
  return axios.post("/Products", params);
};

const apiDetailProduct = function (id) {
  return axios.get(`/Products/${id}`);
};

const apiUpdateProduct = function (id, params) {
  return axios.put(`/Products/${id}`, params);
};

const apiDeleteProduct = function (id) {
  return axios.delete(`/Products/${id}`);
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
};
