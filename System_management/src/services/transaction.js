import axios from "../api/axiosClient";

const apiGetListTransaction = ({ pageIndex, pageSize, textSearch, startDate, endDate }) => {
    return axios.get(`/api/transaction/admin/get-list-transactions/?page_index=${pageIndex}&page_size=${pageSize}&text_search=${textSearch}&start_date=${startDate}&end_date=${endDate}`)
}

const apiDetailTransaction = (id) => {
    return axios.get(`/api/transaction/admin/get-detail-transaction/?id=${id}`)
}

export { apiGetListTransaction, apiDetailTransaction };