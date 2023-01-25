import { SET_USER } from "../types";

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        userLogged: payload,
      };
    case GET_USER:
      return {
        ...state,
        userLogged: payload,
      };
  }
};
