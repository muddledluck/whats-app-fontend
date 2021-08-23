import { UserTypes } from "./user.types";

import axios from "axios";
import { HEADERS, SERVER_URL } from "../../utils/services";

export const getUserList = (search) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${SERVER_URL}/user/search-user-profile/${search}`,
      headers: HEADERS,
    });
    dispatch({
      type: UserTypes.LOADING_NEW_USER_SUCCESS,
      payload: data.userList,
    });
  } catch (error) {
    dispatch({
      type: UserTypes.LOADING_NEW_USER_FALIUR,
      payload: error.response,
    });
  }
};
