import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from "../services";

function AuthRoute(props) {
  return isLoggedIn ? <Redirect to="/chat" /> : <Route {...props} />;
}

export default AuthRoute;
