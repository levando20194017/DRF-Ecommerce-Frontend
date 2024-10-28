import axios from "../api/axios";

const apiGetListTags = function ({ PageIndex, PageSize }) {
  return axios.get(`/Tag?PageIndex=${PageIndex}&PageSize=${PageSize}`);
};
const apiDetailTag = function (id) {
  return axios.get(`/Tag/${id}`);
};

const apiCreateTag = function (params) {
  return axios.post("/Tag", params);
};

const apiUpdateTag = function (id, params) {
  return axios.put(`/Tag/${id}`, params);
};
const apiDeleteTag = function (id) {
  return axios.delete(`/Tag/${id}`);
};
export {
  apiGetListTags,
  apiDetailTag,
  apiCreateTag,
  apiUpdateTag,
  apiDeleteTag,
};
