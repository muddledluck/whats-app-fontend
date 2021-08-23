import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import conversationReducer from "./conversation/conversation.reducer";

import firebaseReducer from "./firebase/firebase.reducer";
import messageReducer from "./messages/message.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  message: messageReducer,
  conversation: conversationReducer,
  user: userReducer,
});
