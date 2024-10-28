// authActions.js
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
