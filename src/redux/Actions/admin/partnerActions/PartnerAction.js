import {
  GET_PARTNERS,
  GET_PARTNER_TYPE,
  UPDATE_PARTNER,
  SEARCH_PARTNER,
  FETCH_PARTNER_REQUEST,
  FETCH_PARTNER_FAILURE,
  GET_ALL_PARTNER,
  POST_PARTNER,
  SEARCH_PARTNER_FAILURE,
  SEARCH_PARTNER_REQUEST,
} from "./PartnerActionType";
import {
  FETCH_MENU_FAILURE,
  GET_MENU,
  FETCH_MENU_REQUEST,
} from "../menuActions/MenuActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to get all partners
export const getAllPartner = () => {
  return async (dispatch) => {
    const partner = await axiosInstance
      .getToken()
      .get("/all-partners?limit=100&page=1");
    dispatch({
      type: GET_ALL_PARTNER,
      data: partner.data.data,
    });
  };
};

//TODO: This function is created to get partner
export const getPartners = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PARTNER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`all-partners?limit=5&page=${page}`);

      dispatch({
        type: GET_PARTNERS,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PARTNER_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to get partner type
export const getPartnerType = () => {
  return async (dispatch) => {
    const partnerTypes = await axiosInstance.getToken().get(`/partner-types`);
    dispatch({
      type: GET_PARTNER_TYPE,
      data: partnerTypes.data.data,
    });
  };
};

//TODO: This function is created to post partner
export const postPartner = (partner) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PARTNER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().post(`/partners`, partner);

      dispatch({
        type: POST_PARTNER,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PARTNER_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to update partner
export const updatePartner = (id, partner) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PARTNER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .put(`/partners/${id}`, partner);

      dispatch({
        type: UPDATE_PARTNER,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PARTNER_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to delete partner
export const deletePartner = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_MENU_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().delete(`/partners/${id}`);

      dispatch({
        type: GET_MENU,
        data: result.data.message,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MENU_FAILURE,
        data: [],
        loading: true,
      });
    }
  };
};

//TODO: This function is created to search partner
export const searchPartner = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_PARTNER_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/all-partners?name=${name}`);
      dispatch({
        type: SEARCH_PARTNER,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_PARTNER_FAILURE,
        data: [],
        loading: false,
      });
    };
  };
};
