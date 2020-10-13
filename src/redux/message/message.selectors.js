import { createSelector } from "reselect";

const selectMessage = (state) => state.message;

export const selectMessagesList = createSelector(
  [selectMessage],
  (message) => message.messagesList
);
