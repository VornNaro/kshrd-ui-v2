import {
  GET_COURSE_TRAINING,
  DELETE_COURSE_TRAINING,
  SEARCH_COURSE_TRAINING,
  FETCH_COURSE_TRAINING_REQUEST,
  FETCH_COURSE_TRAINING_FAILURE,
  GET_ALL_COURSE_TRAINING,
  POST_COURSE_TRAINING,
  UPDATE_COURSE_TRAINING,
  SEARCH_COURSE_TRAINING_REQUEST,
  SEARCH_COURSE_TRAINING_FAILURE,
} from "./CourseTrainingActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get all course training for dashboard
export const getAllCourseTraining = (page) => {
  return async (dispatch) => {
    const courseTraining = await axiosInstance
      .getToken()
      .get(`/course-trainings?limit=100&page=1`);
    dispatch({
      type: GET_ALL_COURSE_TRAINING,
      data: courseTraining.data.data,
    });
  };
};

//TODO: This function is created to get course training
export const getCourseTraining = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .get(`/course-trainings?limit=5&page=${page}`);

      dispatch({
        type: GET_COURSE_TRAINING,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to post course training
export const postCourseTraining = (courseTraining) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .post(`/course-trainings`, courseTraining);

      dispatch({
        type: POST_COURSE_TRAINING,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update course training
export const updateCourseTraining = (id, courseTraining) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .put(`/course-trainings/${id}`, courseTraining);

      dispatch({
        type: UPDATE_COURSE_TRAINING,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete course training
export const deleteCourseTraining = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .delete(`/course-trainings/${id}`);

      dispatch({
        type: DELETE_COURSE_TRAINING,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search course training
export const searchCourseTraining = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_COURSE_TRAINING_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/course-trainings?name=${name}`);
      dispatch({
        type: SEARCH_COURSE_TRAINING,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_COURSE_TRAINING_FAILURE,
        data: [],
        loading: false,
      });
    };
  };
};
