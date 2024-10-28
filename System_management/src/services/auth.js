import axios from "../api/axios";

const handleLogin = (data) => {
    return axios.post("/login", { email: data.email, password: data.password });
};

export { handleLogin };
