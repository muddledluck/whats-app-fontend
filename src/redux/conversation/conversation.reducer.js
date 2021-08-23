import { ConversationTypes } from "./conversation.types";

const INITIAL_STATE = {
  conversations: [],
  loadingConversations: false,
  errorLoadingConversations: null,
  createConversationLoading: false,
  createConversationError: null,
  selectedConversation: null,

  otherUser: {},

};

const conversationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ConversationTypes.LOADING_CONVERSATIONS:
      return {
        ...state,
        loadingConversations: true,
        errorLoadingConversations: null,
      };
    case ConversationTypes.LOADING_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        loadingConversations: false,
        conversations: [...action.payload, ...state.conversations],
      };
    case ConversationTypes.LOADING_CONVERSATIONS_FAILURE:
      return {
        ...state,
        loadingConversations: false,
        errorLoadingConversations: action.payload,
      };

    case ConversationTypes.UPDATE_CONVERSATION:
      const newConversations = state.conversations.map((conversation) => {
        if (conversation._id === action.payload._id) {
          return action.payload;
        }
        return conversation;
      });
      newConversations.sort(
        (conv1, conv2) => new Date(conv1.updatedAt) - new Date(conv2.updatedAt)
      );
      return {
        ...state,
        conversations: newConversations,
      };

    case ConversationTypes.CREATE_CONVERSATION_LOADING:
      return {
        ...state,
        createConversationLoading: true,
        createConversationError: null,
      };
    case ConversationTypes.CREATE_CONVERSATION_SUCCESS:
      let isExists = false;
      let newConversation = [];
      for (let i in state.conversations) {
        if (state.conversations[i]._id === action.payload._id) {
          isExists = true;
        }
        newConversation.push(state.conversations[i]);
      }
      if (!isExists) {
        newConversation = [action.payload, ...state.conversations];
      }
      return {
        ...state,
        createConversationLoading: false,
        conversations: newConversation,
      };
    case ConversationTypes.CREATE_CONVERSATION_FAILURE:
      return {
        ...state,
        createConversationLoading: false,
        createConversationError: action.payload,
      };
    case ConversationTypes.SELECT_CONVERSATION:
      return {
        ...state,
        selectedConversation: action.payload,
        otherUser: action.user,
      };

    case ConversationTypes.UPDATE_SELECTED_USER:
      return {
        ...state,
        otherUser: action.payload,
      };

    default:
      return state;
  }
};

export default conversationReducer;
