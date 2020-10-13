import messageActionTypes from "./message.types";
import { fetchMessages } from "../../serviceClients/message.client";

export const getMessages = (from, to) => {
  return async (dispatch) => {
    dispatch(getMessagesStart());

    try {
      const messages = (await fetchMessages(from, to)).data;
      dispatch(getMessagesSuccess(messages));
    } catch (error) {
      dispatch(getMessagesFailure(error));
    }
  };
};

const getMessagesStart = () => ({
  type: messageActionTypes.GET_MESSAGES_REQUEST,
});

const getMessagesSuccess = (messages) => ({
  type: messageActionTypes.GET_MESSAGES_SUCCESS,
  payload: messages,
});

const getMessagesFailure = (error) => ({
  type: messageActionTypes.GET_MESSAGES_FAILURE,
  payload: error,
});
