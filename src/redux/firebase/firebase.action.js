import { FirebaseTypes } from "./firebase.types";

export const setFirebaseData = (context) => async (dispatch) => {
  try {
    dispatch({
      type: FirebaseTypes.SET_APP_DATA,
      payload: context.app,
    });
  } catch (error) {
    dispatch({
      type: FirebaseTypes.SET_APP_ERROR,
      payload: error,
    });
  }
};
