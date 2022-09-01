import { FETCH_USER_LOGIN_SUCCESS } from "./user.types";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};
