import axios from "../api/axios";

const apiGetListBlogs = function ({ PageIndex, PageSize, token }) {
  return axios.get(`/Blogs?PageIndex=${PageIndex}&PageSize=${PageSize}`, { headers: {"Authorization" : `Bearer ${token}`} });
};
const apiDetailBlog = function (id, token) {
  return axios.get(`/Blogs/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
};

const apiCreateBlog = function (params) {
  return axios.post("/Blogs", params);
};

const apiUpdateBlog = function (id, params) {
  return axios.put(`/Blogs/${id}`, params);
};

const apiDeleteBlog = function (id) {
  return axios.delete(`/Blogs/${id}`);
};

export {
  apiGetListBlogs,
  apiDetailBlog,
  apiCreateBlog,
  apiUpdateBlog,
  apiDeleteBlog,
};
