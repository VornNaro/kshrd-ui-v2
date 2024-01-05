import {
  GET_PARTNER_TYPE,
  DELETE_PARTNER_TYPE,
  POST_PARTNER_TYPE,
  UPDATE_PARTNER_TYPE,
  SEARCH_PARTNER_TYPE,
  FETCH_PARTNER_TYPE_FAILURE,
  FETCH_PARTNER_TYPE_REQUEST,
  SEARCH_PARTNER_TYPE_REQUEST,
  SEARCH_PARTNER_TYPE_FAILURE,
} from "./PartnerTypeActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to post partner type
export const getPartnerTypes = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PARTNER_TYPE_REQUEST,
        data: [],
        loading: true,
      });

      const result = await axiosInstance
        .getToken()
        .get(`partner-types?limit=5&page=${page}`);

      dispatch({
        type: GET_PARTNER_TYPE,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PARTNER_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to post partner type
export const postPartnerType = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PARTNER_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .post(`/partner-types`, name);

      dispatch({
        type: POST_PARTNER_TYPE,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PARTNER_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete partner type
export const deletePartnerType = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PARTNER_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .delete(`/partner-types/${id}`);

      dispatch({
        type: DELETE_PARTNER_TYPE,
        data: result.data.messsage,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PARTNER_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update partner type
export const updatePartnerType = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PARTNER_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/partner-types/${id}`, data);

      dispatch({
        type: UPDATE_PARTNER_TYPE,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PARTNER_TYPE_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search partner type
export const searchPartnerType = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_PARTNER_TYPE_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/partner-types?name=${name}`);
      dispatch({
        type: SEARCH_PARTNER_TYPE,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_PARTNER_TYPE_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
