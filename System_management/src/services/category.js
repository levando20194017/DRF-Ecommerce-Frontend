import axios from "../api/axiosClient";

const apiGetListCategories = ({ pageIndex, pageSize, searchName }) => {
    return axios.get(`/api/category/admin/search-categories/?page_index=${pageIndex}&page_size=${pageSize}&name=${searchName}`)
}
const apiCreateCategory = (data) => {
    return axios.post("/api/category/admin/create-new-category/", data)
}

const apiDetailCategory = (id) => {
    return axios.get(`/api/category/admin/get-detail-category/?category_id=${id}`)
}

const apiUpdateCategory = (data) => {
    return axios.put(`/api/category/admin/edit-category/`, data)
}

const apiDeleteCategory = (id) => {
    return axios.delete(`/api/category/admin/delete-category/?category_id=${id}`)
}

const apiRestoreCategory = (params) => {
    return axios.put("/api/category/admin/restore-category/", params)
}

export { apiGetListCategories, apiCreateCategory, apiDetailCategory, apiUpdateCategory, apiDeleteCategory, apiRestoreCategory };