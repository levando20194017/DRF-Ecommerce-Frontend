import axios from "../api/axiosClient";

const apiGetListTags = function ({ pageIndex, pageSize, searchName }) {
  return axios.get(`/api/tag/admin/search-tags/?page_index=${pageIndex}&page_size=${pageSize}&name=${searchName}`);
};
const apiDetailTag = function (id) {
  return axios.get(`/api/tag/admin/get-detail-tag/?tag_id=${id}`);
};

const apiCreateTag = function (data) {
  return axios.post("/api/tag/admin/create-new-tag/", data);
};

const apiUpdateTag = function (data) {
  return axios.put(`/api/tag/admin/edit-tag/`, { tag_id: data.id, name: data.name });
};
const apiDeleteTag = function (id) {
  return axios.delete(`/api/tag/admin/delete-tag/?tag_id=${id}`);
};
const apiRestoreTag = function (data) {
  return axios.put(`/api/tag/admin/restore-tag/`, { tag_id: data.id });
};
export {
  apiGetListTags,
  apiDetailTag,
  apiCreateTag,
  apiUpdateTag,
  apiDeleteTag,
  apiRestoreTag
};
