import messageActionTypes from "./message.types";

const INITIAL_STATE = {
  messagesList: [],
  loading: false,
  errorMessage: undefined,
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messageActionTypes.GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case messageActionTypes.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messagesList: action.payload,
        loading: false,
      };

    case messageActionTypes.GET_MESSAGES_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };

    case messageActionTypes.CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case messageActionTypes.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        messagesList: [...state.messagesList, action.payload],
        loading: false,
      };

    case messageActionTypes.CREATE_MESSAGE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default messageReducer;
