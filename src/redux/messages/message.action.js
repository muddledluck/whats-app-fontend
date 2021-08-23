import { MessageTypes } from "./message.types";

import axios from "axios";

import { SERVER_URL, LOADER_DELAY, HEADERS } from "../../utils/services";
import randomString from "../../utils/randomString";

export const getPreviousConversationMessages =
  (conversationId) => async (dispatch, getState) => {
    dispatch({
      type: MessageTypes.LOADING_PREV_MESSAGE,
    });

    try {
      const { data } = await axios({
        method: "GET",
        url: `${SERVER_URL}/chat/get-all-messaage-by-conversaton-id/${conversationId}`,
        headers: HEADERS,
      });
      console.log("mesage: ", data.messages);
      setTimeout(() => {
        dispatch({
          type: MessageTypes.LOADING_PREV_MESSAGE_SUCCESS,
          payload: data.messages,
        });
      }, LOADER_DELAY);
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: MessageTypes.LOADING_PREV_MESSAGE_ERROR,
          payload: error.response,
        });
      }, LOADER_DELAY);
    }
  };

export const createMessage =
  (conversationId, content) => async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const details = {
        conversationId,
        content,
        tempId: randomString(10),
        author: auth.currentUser._id,
      };
      dispatch({
        type: MessageTypes.NEW_MESSAGE,
        payload: details,
      });
      const { data } = await axios({
        method: "POST",
        url: `${SERVER_URL}/chat/create-message`,
        headers: HEADERS,
        data: details,
      });
      auth.socket.emit("send_message", data.savedMessage);
      data.savedMessage.tempId = details.tempId;

      dispatch({
        type: MessageTypes.UPDATE_MESSAGE,
        payload: data.savedMessage,
      });
    } catch (error) {
      console.log("errorSendingMessage: ", error.response);
    }
  };

export const newMessageRecived = (message) => async (dispatch, getState) => {
  const { conversation } = getState();
  console.log(
    conversation.selectedConversation,
    message.conversationId,
    message
  );
  if (
    conversation.selectedConversation &&
    conversation.selectedConversation === message.conversationId
  ) {
    dispatch({
      type: MessageTypes.NEW_MESSAGE,
      payload: message,
    });
  }
};
