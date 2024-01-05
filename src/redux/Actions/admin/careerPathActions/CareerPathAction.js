import {
  GET_CAREER_PATH,
  DELETE_CAREER_PATH,
  SEARCH_CAREER_PATH,
  FETCH_CAREER_PATH_REQUEST,
  FETCH_CAREER_PATH_FAILURE,
  POST_CAREER_PATH,
  UPDATE_CAREER_PATH,
  SEARCH_CAREER_PATH_FAILURE,
  SEARCH_CAREER_PATH_REQUEST,
} from "./CareerPathActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get all career path for dashboard
export const getAllCareerPath = () => {
  return async (dispatch) => {
    const c = await axiosInstance
      .getToken()
      .get(`/career-paths?limit=100&page=1`);
    dispatch({
      type: GET_CAREER_PATH,
      data: c.data.data,
    });
  };
};

//TODO: This function is created to get career path
export const getCareerPath = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CAREER_PATH_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/career-paths?limit=5&page=${page}`);
      dispatch({
        type: GET_CAREER_PATH,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CAREER_PATH_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to post career path
export const postCareerPath = (careerPath) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CAREER_PATH_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .post(`/career-paths`, careerPath);

      dispatch({
        type: POST_CAREER_PATH,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CAREER_PATH_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update career path
export const updateCareerPath = (id, careerPath) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CAREER_PATH_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/career-paths/${id}`, careerPath);

      dispatch({
        type: UPDATE_CAREER_PATH,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CAREER_PATH_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete career path
export const deleteCareerPath = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_CAREER_PATH_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .delete(`/career-paths/${id}`);

      dispatch({
        type: DELETE_CAREER_PATH,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CAREER_PATH_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search career path
export const searchCareerPath = (title) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_CAREER_PATH_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/career-paths?title=${title}`);
      dispatch({
        type: SEARCH_CAREER_PATH,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_CAREER_PATH_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
