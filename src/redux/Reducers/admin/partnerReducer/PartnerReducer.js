import {
  GET_PARTNERS,
  GET_PARTNER_TYPE,
  POST_PARTNER_TYPE,
  DELETE_PARTNER,
  SEARCH_PARTNER,
  FETCH_PARTNER_REQUEST,
  FETCH_PARTNER_FAILURE,
  POST_PARTNER,
  UPDATE_PARTNER,
  GET_ALL_PARTNER,
  SEARCH_PARTNER_REQUEST,
  SEARCH_PARTNER_FAILURE,
} from "../../../Actions/admin/partnerActions/PartnerActionType";

const defaultState = {
  partner: [],
  partnerTypes: [],
  postedMessage: [],
  deletedMessage: [],
  totalRecord: 1,
  del: [],
  loading: false,
};
export const partnerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_PARTNER:
      return {
        ...state,
        partner: action.data,
      };
    case FETCH_PARTNER_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_PARTNER_FAILURE:
      return {
        ...state,
        partner: action.data,
        loading: action.loading,
      };

    case GET_PARTNERS:
      return {
        ...state,
        partner: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case GET_PARTNER_TYPE:
      return {
        ...state,
        partnerTypes: action.data,
      };

    case POST_PARTNER_TYPE:
      return {
        ...state,
        post: action.data,
      };

    case POST_PARTNER: {
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    }

    case DELETE_PARTNER:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_PARTNER: {
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    }

    case SEARCH_PARTNER_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_PARTNER_FAILURE:
      return {
        ...state,
        partner: action.data,
        loading: action.loading,
      };
    case SEARCH_PARTNER:
      return {
        ...state,
        partner: action.data,
        loading: action.loading
      };

    default:
      return state;
  }
};
