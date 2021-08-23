export const SERVER_URL = "http://localhost:5000/api";

export const LOADER_DELAY = 1000;

export const isLoggedIn = localStorage.getItem("whats_app_clone_token")
  ? true
  : false;

export const END_POINT_URL = "http://localhost:5000";

export const HEADERS = {
  Accept: "application/json",
  Authorization: "Bearer " + localStorage.getItem("whats_app_clone_token"),
};
