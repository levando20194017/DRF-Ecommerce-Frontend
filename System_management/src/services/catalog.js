import axios from "../api/axios";

const apiGetListCatalogs = function ({ PageIndex, PageSize, parentId, token }) {
  return axios.get(`/Catalogs?pageIndex=${PageIndex}&pageSize=${PageSize}&parentId=${parentId}`, { headers: {"Authorization" : `Bearer ${token}`} });
};
const apiCreateCatalog = function ({ params }, token) {
  return axios.post("/Catalogs", params, { headers: {"Authorization" : `Bearer ${token}`} });
};
const apiUploadImage = function (data) {
  return axios.post("/Uploads/upload-images", data);
};

const apiDetailCatalog = function (id, token) {
  return axios.get(`/Catalogs/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
};

const apiUpdateCatalog = function ({ params, id, token }) {
  return axios.put(`/Catalogs/${id}`, params, { headers: {"Authorization" : `Bearer ${token}`} });
};

const apiDeleteCatalog = function (id, token) {
  return axios.delete(`/Catalogs/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
};

export {
  apiGetListCatalogs,
  apiCreateCatalog,
  apiUploadImage,
  apiDetailCatalog,
  apiUpdateCatalog,
  apiDeleteCatalog,
};
