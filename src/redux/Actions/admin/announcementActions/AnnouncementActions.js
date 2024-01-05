import {
  GET_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  GET_ANNOUNCEMENTS_REQUEST,
  GET_ANNOUNCEMENTS_FAILURE,
  SEARCH_ANNOUNCEMENT,
  SEARCH_ANNOUNCEMENT_REQUEST,
  SEARCH_ANNOUNCEMENT_FAILURE,
} from "./AnnouncementActionTypes";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get all announcements for dashboard
export const getAllAnnouncements = () => {
  return async (dispatch) => {
    const result = await axiosInstance
      .getToken()
      .get("/announcements?limit=100&page=1");
    dispatch({
      type: GET_ANNOUNCEMENTS,
      data: result.data.data,
    });
  };
};

//TODO: This function is created to get announcements
export const getAnnouncements = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ANNOUNCEMENTS_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/announcements?limit=5&page=${page}`);

      dispatch({
        type: GET_ANNOUNCEMENTS,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: GET_ANNOUNCEMENTS_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to post announcement
export const addAnnouncement = (announcement) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ANNOUNCEMENTS_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .post("/announcements", announcement);

      dispatch({
        type: ADD_ANNOUNCEMENT,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: GET_ANNOUNCEMENTS_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete announcement
export const deleteAnnouncement = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ANNOUNCEMENTS_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .delete(`/announcements/${id}`);

      dispatch({
        type: DELETE_ANNOUNCEMENT,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: GET_ANNOUNCEMENTS_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update announcement
export const updateAnnouncement = (id, content) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ANNOUNCEMENTS_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/announcements/${id}`, content);

      dispatch({
        type: UPDATE_ANNOUNCEMENT,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: GET_ANNOUNCEMENTS_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search announcement
export const searchAnnouncement = (title) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_ANNOUNCEMENT_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/announcements?title=${title}`);
      dispatch({
        type: SEARCH_ANNOUNCEMENT,
        data: result.data.data,
        loading: false
      });
    } catch (error) {
      dispatch({
        type: SEARCH_ANNOUNCEMENT_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
