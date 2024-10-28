import axios from "../api/axios";

const apiGetListCategories = ({PageIndex, PageSize}) => {
    return axios.get(`/Category?pageIndex=${PageIndex}&pageSize=${PageSize}`)
}
const apiCreateCategory = ({params}) => {
    return axios.post("/Category", params)
}

const apiDetailCategory = (id) => {
    return axios.get(`/Category/${id}`)
}

const apiUpdateCategory = ({params, id}) => {
    return axios.put(`/Category/${id}`, params)
}

const apiDeleteCategory = (id) => {
    return axios.delete(`/Category/${id}`)
}

export {apiGetListCategories, apiCreateCategory, apiDetailCategory, apiUpdateCategory, apiDeleteCategory};