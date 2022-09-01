import { DECREMENT } from "../Counter/counter.types";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USER_LOGIN_SUCCESS":
      const {
        payload: { access_token, username, image, role },
      } = action;
      return {
        ...state,
        account: {
          access_token,
          username,
          image,
          role,
        },
        isAuthenticated: true,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};

export default userReducer;
