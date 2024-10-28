import axios from "../api/axios";

const apiLogin = (data) => {
    return axios.post("/login", { email: data.email, password: data.password });
};

export { apiLogin };
