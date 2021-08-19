import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";

import firebaseReducer from "./firebase/firebase.reducer";

export default combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
});
