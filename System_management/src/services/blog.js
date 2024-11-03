import axios from "../api/axiosClient";

const apiGetListBlogs = function ({ pageIndex, pageSize, name, tag }) {
  return axios.get(`/api/blog/search-blogs/?page_index=${pageIndex}&page_size=${pageSize}&name=${name}&tag=${tag}`);
};
const apiDetailBlog = function (id) {
  return axios.get(`/api/blog/admin/get-detail-blog/?blog_id=${id}`);
};

const apiCreateBlog = function (data) {
  return axios.post("/api/blog/admin/create-new-blog/", data);
};

const apiUpdateBlog = function (data) {
  return axios.put(`/api/blog/admin/update-blog/`, data);
};

const apiDeleteBlog = function (id) {
  return axios.delete(`/api/blog/admin/delete-blog/?blog_id=${id}`);
};

const apiRestoreBlog = function (data) {
  return axios.delete(`/api/blog/admin/restore-blog/`, { id: data.id });
};

export {
  apiGetListBlogs,
  apiDetailBlog,
  apiCreateBlog,
  apiUpdateBlog,
  apiDeleteBlog,
  apiRestoreBlog
};
