import axios from "../api/axios";
import client from "../api/axiosClient";

const apiLogin = (data) => {
    return client.post("/api/admin/login/", { email: data.email, password: data.password });
};

export { apiLogin };
