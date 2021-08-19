import { AuthTypes } from "./auth.types";

import io from "socket.io-client";
import { END_POINT_URL } from "../../utils/services";

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
  socket: {},

  isLoading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AuthTypes.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
        isLoading: false,
        socket: io.connect(END_POINT_URL, {
          withCredentials: true,
        }),
      };
    case AuthTypes.AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case AuthTypes.AUTH_UPDATING:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
