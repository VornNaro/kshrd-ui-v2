import {
  DELETE_ALUMNI,
  GET_ALUMNI,
  UPDATE_ALUMNI,
  SEARCH_ALUMNI,
  FETCH_ALUMNI_FAILURE,
  FETCH_ALUMNI_REQUEST,
  POST_ALUMNI,
  SEARCH_ALUMNI_REQUEST,
  SEARCH_ALUMNI_FAILURE,
} from "../../../Actions/admin/alumniActions/AlumniActionType";

const defaultState = {
  alumni: [],
  del: [],
  totalRecord: 1,
  updatedData: [],
  loading: false,
  autoId: 1,
  postedMessage: [],
  deletedMessage: [],
};

export const alumniReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ALUMNI_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_ALUMNI_FAILURE:
      return {
        ...state,
        alumni: action.data,
        loading: action.loading,
      };

    case GET_ALUMNI:
      return {
        ...state,
        alumni: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
        autoId: action.autoId,
      };

    case POST_ALUMNI:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    case DELETE_ALUMNI:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_ALUMNI:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_ALUMNI_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_ALUMNI_FAILURE:
      return {
        ...state,
        alumni: action.data,
        loading: action.loading,
      };

    case SEARCH_ALUMNI:
      return {
        ...state,
        alumni: action.data,
        loading: action.loading,
      };

    default:
      return state;
  }
};
