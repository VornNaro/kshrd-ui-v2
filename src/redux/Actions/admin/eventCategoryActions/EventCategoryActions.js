import {
  GET_EVENT_CATEGORY,
  GET_ALL_EVENT_CATEGORY,
  ADD_EVENT_CATEGORY,
  DELETE_EVENT_CATEGORY,
  UPDATE_EVENT_CATEGORY,
  FETCH_EVENT_CATEGORY_REQUEST,
  FETCH_EVENT_CATEGORY_FAILURE,
  SEARCH_EVENT_CATEGORY,
  SEARCH_EVENT_CATEGORY_FAILURE,
  SEARCH_EVENT_CATEGORY_REQUEST,
} from "./EventCategoryActionTypes";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get event category for dashboard
export const getAllEventCategory = () => {
  return async (dispatch) => {
    const result = await axiosInstance
      .getToken()
      .get(`/event-categories?limit=100`);
    dispatch({
      type: GET_ALL_EVENT_CATEGORY,
      data: result.data.data,
    });
  };
};
export const getEventCategory = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EVENT_CATEGORY_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .get(`/event-categories?limit=5&page=${page}`);

      dispatch({
        type: GET_EVENT_CATEGORY,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_EVENT_CATEGORY_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

export const addEventCategory = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EVENT_CATEGORY_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .post(`/event-categories`, data);

      dispatch({
        type: ADD_EVENT_CATEGORY,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_EVENT_CATEGORY_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

export const deleteEventCategory = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EVENT_CATEGORY_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .delete(`/event-categories/${id}`);

      dispatch({
        type: DELETE_EVENT_CATEGORY,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_EVENT_CATEGORY_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

export const updateEventCategory = (id, eventCategories) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EVENT_CATEGORY_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/event-categories/${id}`, eventCategories);

      dispatch({
        type: UPDATE_EVENT_CATEGORY,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_EVENT_CATEGORY_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

export const searchEventCategory = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_EVENT_CATEGORY_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/event-categories?name=${name}`);
      dispatch({
        type: SEARCH_EVENT_CATEGORY,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_EVENT_CATEGORY_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
