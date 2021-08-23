import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectNewUsers = createSelector(
  [selectUser],
  (user) => user.newUsers
);
