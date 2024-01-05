import {
  GET_CAREER_PATH,
  DELETE_CAREER_PATH,
  UPDATE_CAREER_PATH,
  SEARCH_CAREER_PATH,
  FETCH_CAREER_PATH_REQUEST,
  FETCH_CAREER_PATH_FAILURE,
  POST_CAREER_PATH,
  SEARCH_CAREER_PATH_REQUEST,
  SEARCH_CAREER_PATH_FAILURE,
} from "../../../Actions/admin/careerPathActions/CareerPathActionType";

const defaultState = {
  careerPath: [],
  totalRecord: 1,
  postedMessage: [],
  deletedMessage: [],
  del: [],
  updateData: [],
  loading: false,
};
export const careerPathReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CAREER_PATH_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_CAREER_PATH_FAILURE:
      return {
        ...state,
        careerPath: action.data,
        loading: action.loading,
      };

    case GET_CAREER_PATH:
      return {
        ...state,
        careerPath: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };
    case POST_CAREER_PATH:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_CAREER_PATH:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_CAREER_PATH:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_CAREER_PATH_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_CAREER_PATH_FAILURE:
      return {
        ...state,
        careerPath: action.data,
        loading: action.loading,
      };
    case SEARCH_CAREER_PATH:
      return {
        ...state,
        careerPath: action.data,
        loading: action.loading,
      };

    default:
      return state;
  }
};
