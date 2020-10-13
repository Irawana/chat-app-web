import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectChatUser = createSelector(
  [selectUser],
  (user) => user.chatUser
);

export const selectUsersList = createSelector(
  [selectUser],
  (user) => user.usersList
);
