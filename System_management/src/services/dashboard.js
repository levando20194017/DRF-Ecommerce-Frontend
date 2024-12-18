import axios from "../api/axiosClient";

const apiGetChart = ({ storeId, startDate, endDate }) => {
    return axios.get(`api/dashboard/admin/get-sales-and-incomings/?store_id=${storeId}&start_date=${startDate}&end_date=${endDate}`)
}

const apiGetTotalReport = ({ storeId }) => {
    return axios.get(`api/product_sale/admin/get-total-report/?store_id=${storeId}`)
}

export {
    apiGetChart,
    apiGetTotalReport,
}
