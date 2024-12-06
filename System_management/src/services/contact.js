import axios from "../api/axiosClient";

const apiGetlistContacts = ({ pageIndex, pageSize, searchName }) => {
    return axios.get(`api/contact/admin/search-contacts/?page_index=${pageIndex}&page_size=${pageSize}&name=${searchName}`)
}
const apiDeleteContact = (id) => {
    return axios.delete(`api/contact/admin/delete-contact/?contact_id=${id}`)
}
const apiUpdateStatusAdvised = (data) => {
    return axios.patch(`api/contact/admin/update-advised-status/`, data)
}
export {
    apiGetlistContacts,
    apiDeleteContact,
    apiUpdateStatusAdvised
}