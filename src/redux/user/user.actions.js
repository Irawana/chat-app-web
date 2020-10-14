import userActionTypes from "./user.types";
import {
  fetchUsers,
  saveUser,
  userLogin,
} from "../../serviceClients/user.client";

/**
 * Login action
 *
 * @param {String} username
 * @param {String} password
 */
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      const { user, accessToken } = await userLogin({ username, password });

      localStorage.setItem("accessToken", accessToken);

      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
};

const loginStart = () => ({
  type: userActionTypes.LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: userActionTypes.LOGIN_FAILURE,
  payload: error,
});

/** Logout */
export const logout = () => {
  return {
    type: userActionTypes.LOGOUT,
  };
};

/**
 * Set current auth user
 *
 * @param {Object} user
 */
export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

/**
 * Set currently chatting user
 *
 * @param {Object} user
 */
export const setChatUser = (user) => ({
  type: userActionTypes.SET_CHAT_USER,
  payload: user,
});

/** Get users */
export const getUsers = () => {
  return async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const users = await fetchUsers();

      dispatch(getUsersSuccess(users));
    } catch (error) {
      dispatch(getUsersFailure(error));
    }
  };
};

const getUsersStart = () => ({
  type: userActionTypes.GET_USERS_REQUEST,
});

const getUsersSuccess = (users) => ({
  type: userActionTypes.GET_USERS_SUCCESS,
  payload: users,
});

const getUsersFailure = (error) => ({
  type: userActionTypes.GET_USERS_FAILURE,
  payload: error,
});

/**
 * Create new user
 *
 * @param {Object} user
 */
export const createUser = (user) => {
  return async (dispatch) => {
    dispatch(createUserStart());

    const response = await saveUser(user);

    if (response.status === 201) {
      dispatch(createUserSuccess(response));
    } else {
      dispatch(createUserFailure(response));
    }
  };
};

const createUserStart = () => ({
  type: userActionTypes.ADD_USER_REQUEST,
});

const createUserSuccess = (user) => ({
  type: userActionTypes.ADD_USER_SUCCESS,
  payload: user,
});

const createUserFailure = (error) => ({
  type: userActionTypes.ADD_USER_FAILURE,
  payload: error,
});
