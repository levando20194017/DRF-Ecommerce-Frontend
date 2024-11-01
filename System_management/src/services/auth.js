import axios from "../api/axios";

const apiLogin = (data) => {
    return axios.post("/api/admin/login/", { email: data.email, password: data.password });
};

export { apiLogin };
