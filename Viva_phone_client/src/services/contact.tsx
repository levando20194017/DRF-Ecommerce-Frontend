import client from "../axios/axiosClient"

interface DataContact {
    full_name: string,
    phone_number: string,
    email: string,
    question: string,
}
const apiCreateContact = (data: DataContact) => {
    return client.post("/api/contact/create-new-contact/", data);
}
export {
    apiCreateContact
}