import axios from "../api/axiosClient";

const apiGetListCatalogs = function ({ pageIndex, pageSize, textSearch }) {
  return axios.get(`/api/catalog/admin/get-list-catalogs/?page_index=${pageIndex}&page_size=${pageSize}&textSearch=${textSearch}`);
};

const apiGetListCatalogsWithNoDeleted = function ({ pageIndex, pageSize, textSearch }) {
  return axios.get(`api/catalog/get-list-catalogs/?page_index=${pageIndex}&page_size=${pageSize}&textSearch=${textSearch}`);
};

const apiCreateCatalog = function (data) {
  return axios.post("/api/catalog/admin/create-new-catalog/", data);
};
const apiUploadImage = function (data) {
  return axios.post("/api/admin/upload-image/", data);
};

const apiDetailCatalog = function (id) {
  return axios.get(`/api/catalog/admin/get-detail-catalog/?id=${id}`);
};

const apiUpdateCatalog = function (data) {
  return axios.put(`/api/catalog/admin/edit-catalog/`, data);
};

const apiDeleteCatalog = function (id) {
  return axios.delete(`/api/catalog/admin/delete-catalog/?id=${id}`);
};

const apiRestoreCatalog = function (data) {
  return axios.put("/api/catalog/admin/restore-catalog/", data);
};

export {
  apiGetListCatalogs,
  apiGetListCatalogsWithNoDeleted,
  apiCreateCatalog,
  apiUploadImage,
  apiDetailCatalog,
  apiUpdateCatalog,
  apiDeleteCatalog,
  apiRestoreCatalog
};
