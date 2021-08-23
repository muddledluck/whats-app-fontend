import { MessageTypes } from "./message.types";

const INITIAL_STATE = {
  messages: [],
  isLoadingMessages: false,
  messageLoadingError: null,
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MessageTypes.LOADING_PREV_MESSAGE:
      return {
        ...state,
        isLoadingMessages: true,
        messageLoadingError: null,
        messages: [],
      };
    case MessageTypes.LOADING_PREV_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoadingMessages: false,
        messages: action.payload,
      };
    case MessageTypes.LOADING_PREV_MESSAGE_ERROR:
      return {
        ...state,
        isLoadingMessages: false,
        messageLoadingError: action.payload,
      };

    case MessageTypes.NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case MessageTypes.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((msg) => {
          if (
            msg._id === action.payload._id ||
            (msg.tempId === action.payload.tempId && action.payload.tempId)
          ) {
            return action.payload;
          }
          return msg;
        }),
      };

    default:
      return state;
  }
};

export default messageReducer;
