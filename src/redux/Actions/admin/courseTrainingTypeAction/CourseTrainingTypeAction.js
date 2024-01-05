import {
  GET_COURSE_TRAINING_TYPE,
  DELETE_COURSE_TRAINING_TYPE,
  POST_COURSE_TRAINING_TYPE,
  UPDATE_COURSE_TRAINING_TYPE,
  FETCH_COURSE_TRAINING_TYPE_FAILURE,
  FETCH_COURSE_TRAINING_TYPE_REQUEST,
  SEARCH_COURSE_TRAINING_TYPE,
  SEARCH_COURSE_TRAINING_TYPE_REQUEST,
  SEARCH_COURSE_TRAINING_TYPE_FAILURE
} from "./CourseTrainingTypeActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get course training type
export const getCourseTrainingType = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .get(`/course-training-types?limit=5&page=${page}`);

      dispatch({
        type: GET_COURSE_TRAINING_TYPE,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to get all course training type
export const getAllCourseTrainingType = () => {
  return async (dispatch) => {
    const courseTrainingType = await axiosInstance
      .getToken()
      .get(`/course-training-types`);
    dispatch({
      type: GET_COURSE_TRAINING_TYPE,
      data: courseTrainingType.data.data,
    });
  };
};

//TODO: This function is created to post course training type
export const postCourseTrainingType = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .post(`/course-training-types`, name);

      dispatch({
        type: POST_COURSE_TRAINING_TYPE,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete course training type
export const deleteCourseTrainingType = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .delete(`/course-training-types/${id}`);

      dispatch({
        type: DELETE_COURSE_TRAINING_TYPE,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update course training type
export const updateCourseTrainingType = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/course-training-types/${id}`, data);

      dispatch({
        type: UPDATE_COURSE_TRAINING_TYPE,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};
//TODO: This function is created to search course training type
export const searchCourseTrainingType = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_COURSE_TRAINING_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/course-training-types?name=${name}`);
      dispatch({
        type: SEARCH_COURSE_TRAINING_TYPE,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_COURSE_TRAINING_TYPE_FAILURE,
        data: [],
        loading: false,
      });
    };
  };
};
