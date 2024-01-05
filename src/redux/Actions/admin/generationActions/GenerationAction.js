import {
  GET_GENERATION,
  DELETE_GENERATION,
  FETCH_GENERATION_REQUEST,
  FETCH_GENERATION_FAILURE,
  UPDATE_GENERATION,
  POST_GENERATION,
  SEARCH_GENERATION,
  GET_ALL_GENERATION,
  SEARCH_GENERATION_REQUEST,
  SEARCH_GENERATION_FAILURE,
} from "./GenerationActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get all generation
export const getAllGeneration = () => {
  return async (dispatch) => {
    const result = await axiosInstance.getToken().get(`/generations?limit=100`);
    dispatch({
      type: GET_ALL_GENERATION,
      data: result.data.data,
    });
  };
};

//TODO: This function is created to get generation
export const getGeneration = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_GENERATION_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .get(`/generations?limit=5&page=${page}`);

      dispatch({
        type: GET_GENERATION,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GENERATION_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to post generation
export const postGeneration = (generation) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_GENERATION_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .post(`/generations`, generation);

      dispatch({
        type: POST_GENERATION,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GENERATION_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update generation
export const updateGeneration = (id, generation) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_GENERATION_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/generations/${id}`, generation);

      dispatch({
        type: UPDATE_GENERATION,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GENERATION_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete generation
export const deleteGeneration = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_GENERATION_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .delete(`/generations/${id}`);

      dispatch({
        type: DELETE_GENERATION,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GENERATION_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search generation
export const searchGeneration = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_GENERATION_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/generations?name=${name}`);
      dispatch({
        type: SEARCH_GENERATION,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_GENERATION_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
