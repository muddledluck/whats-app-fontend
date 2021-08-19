import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from "../services";

function PrivateRoute(props) {
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/" />;
}

export default PrivateRoute;
