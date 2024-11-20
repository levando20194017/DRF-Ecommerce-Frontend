// import axios from "axios";

// const defaultOptions = {
//     baseURL: process.env.REACT_APP_BACKEND_URL,
//     withCredentials: false,
//     headers: {
//         Authorization: "Bearer",
//     },
// };

// const instance = axios.create(defaultOptions);

// let currentToken = JSON.parse(localStorage.getItem("userData"))?.token_azure;

// export const updateToken = (newToken) => {
//     if (newToken !== currentToken) {
//         currentToken = newToken;
//         instance.defaults.headers.common[
//             "Authorization"
//         ] = `Bearer ${currentToken}`;
//     }
// };

// export default instance;

import axios from "axios";

const token = JSON.parse(localStorage.getItem("mintadmin_userData"))?.access_token;

const defaultOptions = {
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    timeout: process.env.REACT_APP_API_TIMEOUT,
};

const instance = axios.create(defaultOptions);

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return data;
    },
    (error) => {
        console.error("An error occurred during the API call:", error);
        throw error;
    }
);

export default instance;
