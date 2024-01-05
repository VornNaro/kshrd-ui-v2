import {
  DELETE_ALUMNI,
  GET_ALUMNI,
  SEARCH_ALUMNI,
  FETCH_ALUMNI_FAILURE,
  FETCH_ALUMNI_REQUEST,
  POST_ALUMNI,
  UPDATE_ALUMNI,
  SEARCH_ALUMNI_REQUEST,
  SEARCH_ALUMNI_FAILURE

} from "./AlumniActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get alumni
export const getAlumni = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_ALUMNI_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .get(`/alumni?limit=5&page=${page}`);

      dispatch({
        type: GET_ALUMNI,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALUMNI_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to post alumni
export const postAlumni = (alumni) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_ALUMNI_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().post(`/alumni`, alumni);

      dispatch({
        type: POST_ALUMNI,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALUMNI_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update alumni
export const updateAlumni = (id, alumni) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_ALUMNI_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/alumni/${id}`, alumni);

      dispatch({
        type: UPDATE_ALUMNI,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALUMNI_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete alumni
export const deleteAlumni = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_ALUMNI_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().delete(`/alumni/${id}`);

      dispatch({
        type: DELETE_ALUMNI,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALUMNI_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search alumni
export const searchAlumni = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_ALUMNI_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().get(`/alumni?name=${name}`);
      dispatch({
        type: SEARCH_ALUMNI,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_ALUMNI_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
