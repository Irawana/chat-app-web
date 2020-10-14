import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectSelectedUser = createSelector(
  [selectUser],
  (user) => user.selectedUser
);

export const selectUsersList = createSelector(
  [selectUser],
  (user) => user.usersList
);

export const selectError = createSelector(
  [selectUser],
  (user) => user.errorMessage
);
