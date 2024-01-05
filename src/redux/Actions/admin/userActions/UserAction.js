import {
  GET_USERS,
  DELETE_USER,
  POST_USER,
  UPDATE_USER,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  GET_ALL_USERS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  SEARCH_USER,
  SEARCH_USER_REQUEST,
  SEARCH_USER_FAILURE

} from "./UserActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get all users for dashboard
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_USERS_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/users?limit=100&page=1`);

      dispatch({
        type: GET_ALL_USERS,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_USERS_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to get users
export const getUsers = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .get(`/users?limit=5&page=${page}`);

      dispatch({
        type: GET_USERS,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_USER_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to post user
export const postUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().post(`/users`, user);

      dispatch({
        type: POST_USER,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete user
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().delete(`/users/${id}`);

      dispatch({
        type: DELETE_USER,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update user
export const updateUser = (id, user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().put(`/users/${id}`, user);

      dispatch({
        type: UPDATE_USER,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search user
export const searchUser = (username) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_USER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/users?username=${username}`);
      dispatch({
        type: SEARCH_USER,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_USER_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
