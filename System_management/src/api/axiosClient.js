import { createAxiosClient } from "./createAxiosClient";

const REFRESH_TOKEN_URL = `${process.env.REACT_APP_BACKEND_URL}/admin/token/refresh/`
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`

function getCurrentAccessToken() {
    return JSON.parse(localStorage.getItem("userData"))?.access_token;
}

function getCurrentRefreshToken() {
    // this is how you access the zustand store outside of React.
    return JSON.parse(localStorage.getItem("userData"))?.refresh
}

function setRefreshedTokens(tokens) {
    let userData = JSON.parse(localStorage.getItem("userData"));
    userData.access_token = tokens.access_token;
    userData.refresh = tokens.refresh;

    localStorage.setItem("userData", JSON.stringify(userData));
}

function logout() {
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
}

const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
})

export default client;