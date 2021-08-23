import "./App.css";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";

import ChatPage from "./pages/chat/chat.page";
import SignIn from "./component/auth/signIn/signIn.component";
import SignUp from "./component/auth/signUp/signUp.component";
import OTP from "./component/auth/otp/otp.component";

import { useEffect } from "react";
// import { FirebaseContext } from "./firebase/firebase";

import { setFirebaseData } from "./redux/firebase/firebase.action";
import AuthRoute from "./utils/authRoute/authRoute.utils";
import PrivateRoute from "./utils/privateRoute/privateRoute.utils";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectSocket,
} from "./redux/auth/auth.selector";
import { setCurrentUser, updateCurrentUser } from "./redux/auth/auth.action";

function App({ auth, setCurrentUser, socket, updateCurrentUser, currentUser }) {
  useEffect(() => {
    if (!auth && localStorage.getItem("whats_app_clone_token")) {
      setCurrentUser();
    }
  }, [auth, setCurrentUser]);
  useEffect(() => {
    if (Object.keys(socket).length > 0 && currentUser._id) {
      socket.on(`user_update_${currentUser._id}`, (user) => {
        updateCurrentUser(user);
      });
    }
  }, [socket, updateCurrentUser, currentUser]);

  return (
    <div className="app">
      <Switch>
        <PrivateRoute path="/chat" component={ChatPage} />
        <div className="auth__body">
          <AuthRoute path="/" exact component={SignIn} />
          <AuthRoute path="/sign-up" exact component={SignUp} />
          <AuthRoute path="/otp-verification/:token" exact component={OTP} />
        </div>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: selectIsAuthenticated(state),
  socket: selectSocket(state),
  currentUser: selectCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  setFirebaseData: (data) => dispatch(setFirebaseData(data)),
  setCurrentUser: () => dispatch(setCurrentUser()),
  updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
