import userActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  usersList: [],
  usersCount: 0,
  loading: false,
  errorMessage: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        errorMessage: undefined,
      };

    case userActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };

    case userActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
      };

    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case userActionTypes.SET_CHAT_USER:
      return {
        ...state,
        chatUser: action.payload,
      };

    case userActionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        usersList: action.payload,
        loading: false,
      };

    case userActionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };

    case userActionTypes.ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.ADD_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
