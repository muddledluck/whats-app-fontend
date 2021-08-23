//https://rocky-atoll-89841.herokuapp.com/
export const SERVER_URL = "https://rocky-atoll-89841.herokuapp.com/api";

export const LOADER_DELAY = 1000;

export const isLoggedIn = localStorage.getItem("whats_app_clone_token")
  ? true
  : false;

export const END_POINT_URL = "https://rocky-atoll-89841.herokuapp.com";

export const HEADERS = {
  Accept: "application/json",
  Authorization: "Bearer " + localStorage.getItem("whats_app_clone_token"),
};
