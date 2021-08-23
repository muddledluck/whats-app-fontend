import { UserTypes } from "./user.types";

const INITIAL_STATE = {
  newUsers: [],
  isLoadingUsers: false,
  errorLoadingUsers: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOADING_NEW_USER:
      return {
        ...state,
        isLoadingUsers: true,
        errorLoadingUsers: null,
      };
    case UserTypes.LOADING_NEW_USER_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        newUsers: action.payload,
      };
    case UserTypes.LOADING_NEW_USER_FALIUR:
      return {
        ...state,
        isLoadingUsers: false,
        errorLoadingUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
