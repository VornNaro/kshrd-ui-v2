import {
  GET_GENERATION,
  DELETE_GENERATION,
  FETCH_GENERATION_REQUEST,
  FETCH_GENERATION_FAILURE,
  POST_GENERATION,
  UPDATE_GENERATION,
  SEARCH_GENERATION,
  GET_ALL_GENERATION,
  SEARCH_GENERATION_REQUEST,
  SEARCH_GENERATION_FAILURE,
} from "../../../Actions/admin/generationActions/GenerationActionType";

const defaultState = {
  generation: [],
  del: [],
  totalRecord: 1,
  loading: false,
  postedMessage: [],
  deletedMessage: [],
};
export const generationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_GENERATION_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_GENERATION_FAILURE:
      return {
        ...state,
        generation: action.data,
        loading: action.loading,
      };

    case GET_GENERATION:
      return {
        ...state,
        generation: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case POST_GENERATION:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_GENERATION:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_GENERATION:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_GENERATION_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_GENERATION_FAILURE:
      return {
        ...state,
        generation: action.data,
        loading: action.loading,
      };
    case SEARCH_GENERATION:
      return {
        ...state,
        generation: action.data,
        loading: action.loading,
      };
    case GET_ALL_GENERATION:
      return {
        ...state,
        generation: action.data,
      };

    default:
      return state;
  }
};
