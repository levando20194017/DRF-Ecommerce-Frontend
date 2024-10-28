import axios from "../api/axios";

const apiGetListTransaction = ({PageIndex, PageSize, merchantReference}) => {
    return axios.post(`/Transactions?PageIndex=${PageIndex}&PageSize=${PageSize}`, {merchantReference})
}

const apiDetailTransaction = (id) => {
    return axios.get(`/Transactions/${id}`)
}

export {apiGetListTransaction, apiDetailTransaction};