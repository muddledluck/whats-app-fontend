import { AuthTypes } from "./auth.types";

import axios from "axios";
import { SERVER_URL, LOADER_DELAY } from "../../utils/services";

export const signUp = (details) => async (dispatch) => {
  dispatch({
    type: AuthTypes.AUTH_LOADING,
  });

  try {
    const { data } = await axios({
      method: "post",
      url: `${SERVER_URL}/user/sign-up`,
      data: details,
    });
    localStorage.setItem("whats_app_clone_token", data.token);
    setTimeout(
      () =>
        dispatch({
          type: AuthTypes.AUTH_SUCCESS,
          payload: data.user,
        }),
      LOADER_DELAY
    );
  } catch (error) {
    console.log(error);
    setTimeout(
      () =>
        dispatch({
          type: AuthTypes.AUTH_ERROR,
          payload: error.response,
        }),
      LOADER_DELAY
    );
  }
};

export const signIn = (details) => async (dispatch) => {
  dispatch({
    type: AuthTypes.AUTH_LOADING,
  });
  try {
    const { data } = await axios({
      method: "post",
      url: `${SERVER_URL}/user/sign-in`,
      data: details,
    });
    localStorage.setItem("whats_app_clone_token", data.token);
    setTimeout(
      () =>
        dispatch({
          type: AuthTypes.AUTH_SUCCESS,
          payload: data.user,
        }),
      LOADER_DELAY
    );
  } catch (error) {
    console.log(error);
    setTimeout(
      () =>
        dispatch({
          type: AuthTypes.AUTH_ERROR,
          payload: error.response,
        }),
      LOADER_DELAY
    );
  }
};

export const setCurrentUser = () => async (dispatch, getState) => {
  const token = localStorage.getItem("whats_app_clone_token");
  if (token) {
    dispatch({
      type: AuthTypes.AUTH_LOADING,
    });
    try {
      const { data } = await axios({
        method: "get",
        url: `${SERVER_URL}/user/get-user-details`,
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("whats_app_clone_token"),
        },
      });
      dispatch({
        type: AuthTypes.AUTH_SUCCESS,
        payload: data.user,
      });
      const { socket } = getState().auth;
      socket.emit("mark_user_online", data.user._id);
    } catch (error) {
      console.log(error);
      dispatch({
        type: AuthTypes.AUTH_ERROR,
        payload: error.response,
      });
      // localStorage.removeItem("whats_app_clone_token");
    }
  }
};

export const updateCurrentUser = (user) => async (dispatch) => {
  dispatch({
    type: AuthTypes.AUTH_UPDATING,
    payload: user,
  });
};
