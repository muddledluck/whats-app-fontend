import { createSelector } from "reselect";

const selectConversation = (state) => state.conversation;

export const selectConversationList = createSelector(
  [selectConversation],
  (conversation) => conversation.conversations
);

export const selectSelectedConversationId = createSelector(
  [selectConversation],
  (conversation) => conversation.selectedConversation
);

export const selectOtherUser = createSelector(
  [selectConversation],
  (conversation) => conversation.otherUser
);

export const selectOtherUserSocketId = createSelector(
  [selectConversation],
  (conversation) => {
    console.log("conversiaot: ", conversation);
    return conversation.otherUser.socketId;
  }
);

export const selectCreateConversationLoading = createSelector(
  [selectConversation],
  (conversation) => conversation.createConversationLoading
);

export const selectCreateConversationError = createSelector(
  [selectConversation],
  (conversation) => conversation.createConversationError
);
