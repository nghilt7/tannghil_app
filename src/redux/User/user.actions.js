import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "./user.types";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};
