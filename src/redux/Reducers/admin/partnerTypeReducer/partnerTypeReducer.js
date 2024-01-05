import {
  GET_PARTNER_TYPE,
  DELETE_PARTNER_TYPE,
  POST_PARTNER_TYPE,
  UPDATE_PARTNER_TYPE,
  SEARCH_PARTNER_TYPE,
  FETCH_PARTNER_TYPE_REQUEST,
  FETCH_PARTNER_TYPE_FAILURE,
  SEARCH_PARTNER_TYPE_FAILURE,
  SEARCH_PARTNER_TYPE_REQUEST,
} from "../../../Actions/admin/partnerTypeActions/PartnerTypeActionType";

const defaultState = {
  partnerType: [],
  post: [],
  del: [],
  updatedData: [],
  totalRecord: 1,
  loading: false,
  postedMessage: [],
  deletedMessage: [],
};
export const partnerTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PARTNER_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_PARTNER_TYPE_FAILURE:
      return {
        ...state,
        partnerType: action.data,
        loading: action.loading,
      };

    case GET_PARTNER_TYPE:
      return {
        ...state,
        partnerType: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case POST_PARTNER_TYPE:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_PARTNER_TYPE:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_PARTNER_TYPE:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_PARTNER_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_PARTNER_TYPE_FAILURE:
      return {
        ...state,
        partnerType: action.data,
        loading: action.loading,
      };
    case SEARCH_PARTNER_TYPE:
      return {
        ...state,
        partnerType: action.data,
        loading: action.loading,
      };

    default:
      return state;
  }
};
