import userActionTypes from "./user.types";
import {
  fetchUsers,
  saveUser,
  userLogin,
} from "../../serviceClients/user.client";

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    const response = await userLogin({ username, password });

    if (response.status === 200) {
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(loginFailure(response.message));
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

export const logout = () => {
  return {
    type: userActionTypes.LOGOUT,
  };
};

export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setChatUser = (user) => ({
  type: userActionTypes.SET_CHAT_USER,
  payload: user,
});

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(getUsersStart());

    try {
      const users = (await fetchUsers()).data;
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
