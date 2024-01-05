import {
  GET_EVENTS,
  POST_EVENT_FAILURE,
  POST_EVENT_REQUEST,
  POST_EVENT,
  DELETE_EVENT,
  GET_EVENTS_REQUEST,
  GET_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_FAILURE,
  UPDATE_EVENTS_REQUEST,
  UPDATE_EVENTS_FAILURE,
  UPDATE_EVENT,
  SEARCH_EVENT_REQUEST,
  SEARCH_EVENT,
  SEARCH_EVENT_FAILURE
} from "./EventActionTypes";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get event
export const getEvent = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_EVENTS_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/events?limit=5&page=${page}`);

      dispatch({
        type: GET_EVENTS,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENTS_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};

//TODO: This function is created post get event
export const postEvent = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_EVENT_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance.getToken().post("/events", data);

      dispatch({
        type: POST_EVENT,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: POST_EVENT_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update event
export const updateEvent = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EVENTS_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance.getToken().put(`/events/${id}`, data);

      dispatch({
        type: UPDATE_EVENT,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EVENTS_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete event
export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_EVENTS_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance.getToken().delete(`/events/${id}`);

      dispatch({
        type: DELETE_EVENT,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: DELETE_EVENTS_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
//TODO: This function is created to search event
export const searchEvent = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_EVENT_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/events?name=${name}`);
        console.log(result.data.data)
      dispatch({
        type: SEARCH_EVENT,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_EVENT_FAILURE,
        data: [],
        loading: false,
      });
    };
  };
};
