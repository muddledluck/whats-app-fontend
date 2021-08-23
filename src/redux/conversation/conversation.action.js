import { ConversationTypes } from "./conversation.types";

import axios from "axios";
import { SERVER_URL, HEADERS, LOADER_DELAY } from "../../utils/services";

export const getUserConversation = () => async (dispatch) => {
  dispatch({
    type: ConversationTypes.LOADING_CONVERSATIONS,
  });
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SERVER_URL}/chat/get-all-conversation-by-user`,
      headers: HEADERS,
    });
    setTimeout(() => {
      dispatch({
        type: ConversationTypes.LOADING_CONVERSATIONS_SUCCESS,
        payload: data.conversations,
      });
    });
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: ConversationTypes.CREATE_CONVERSATION_FAILURE,
        payload: error.response,
      });
    }, LOADER_DELAY);
  }
};

export const selectConversation = (convId, user) => async (dispatch) => {
  dispatch({
    type: ConversationTypes.SELECT_CONVERSATION,
    payload: convId,
    user,
  });
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SERVER_URL}/user/get-user-details/?userId=${user._id}`,
      headers: HEADERS,
    });
    dispatch({
      type: ConversationTypes.UPDATE_SELECTED_USER,
      payload: data.user,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const updateSelectedUser = (user) => async (dispatch) => {
  dispatch({
    type: ConversationTypes.UPDATE_SELECTED_USER,
    payload: user,
  });
};

export const createNewConversation = (participants) => async (dispatch) => {
  dispatch({
    type: ConversationTypes.CREATE_CONVERSATION_LOADING,
  });

  try {
    const details = {
      participants,
    };
    const { data } = await axios({
      method: "POST",
      url: `${SERVER_URL}/chat/create-conversation`,
      headers: HEADERS,
      data: details,
    });
    setTimeout(() => {
      dispatch({
        type: ConversationTypes.CREATE_CONVERSATION_SUCCESS,
        payload: data.savedConversation,
      });
    }, LOADER_DELAY);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: ConversationTypes.CREATE_CONVERSATION_FAILURE,
        payload: error.response,
      });
    }, LOADER_DELAY);
  }
};
