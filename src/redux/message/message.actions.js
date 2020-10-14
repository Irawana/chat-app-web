import messageActionTypes from "./message.types";
import {
  fetchMessages,
  saveMessage,
} from "../../serviceClients/message.client";

/**
 * Create new messages
 *
 * @param {Object} message
 */
export const createMessage = (message) => {
  return async (dispatch) => {
    dispatch(createMessageStart());

    try {
      const createdMessage = await saveMessage(message);

      dispatch(createMessageSuccess(createdMessage));
    } catch (error) {
      dispatch(createMessageFailure(error));
    }
  };
};

const createMessageStart = () => ({
  type: messageActionTypes.CREATE_MESSAGE_REQUEST,
});

const createMessageSuccess = (message) => ({
  type: messageActionTypes.CREATE_MESSAGE_SUCCESS,
  payload: message,
});

const createMessageFailure = (error) => ({
  type: messageActionTypes.CREATE_MESSAGE_FAILURE,
  payload: error,
});

/**
 * Get messages for two users
 *
 * @param {String} from
 * @param {String} to
 */
export const getMessages = (from, to) => {
  return async (dispatch) => {
    dispatch(getMessagesStart());

    try {
      const messages = await fetchMessages(from, to);

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
