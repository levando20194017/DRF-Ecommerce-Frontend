import axios from "axios";

const defaultOptions = {
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        Authorization: "Bearer",
    },
};

const instance = axios.create(defaultOptions);

let currentToken = JSON.parse(localStorage.getItem("userData"))?.token_azure;

export const updateToken = (newToken) => {
    if (newToken !== currentToken) {
        currentToken = newToken;
        instance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${currentToken}`;
    }
};

export default instance;
