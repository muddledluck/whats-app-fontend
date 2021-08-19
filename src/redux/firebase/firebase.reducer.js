import { FirebaseTypes } from "./firebase.types";

const INITIAL_STATE = {
  app: null,
  error: null,
};

const firebaseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FirebaseTypes.SET_APP_DATA:
      return {
        ...state,
        app: action.payload,
        error: null,
      };
    case FirebaseTypes.SET_APP_ERROR:
      return {
        ...state,
        app: null,
        error: null,
      };
    default:
      return state;
  }
};

export default firebaseReducer;
