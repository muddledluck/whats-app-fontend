import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser
);

export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth.error
);

export const selectSocket = createSelector([selectAuth], (auth) => auth.socket);
