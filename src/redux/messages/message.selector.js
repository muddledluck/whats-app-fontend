import { createSelector } from "reselect";

const selectMessages = (state) => state.message;

export const selectPreviousMessages = createSelector(
  [selectMessages],
  (messages) => messages.messages
);

export const selectMessagesLoading = createSelector(
  [selectMessages],
  (messages) => messages.isLoadingMessages
);

export const selectMessageError = createSelector(
  [selectMessages],
  (messages) => messages.messagesLoadingError
);
