import {
  GET_EVENT_CATEGORY,
  ADD_EVENT_CATEGORY,
  DELETE_EVENT_CATEGORY,
  UPDATE_EVENT_CATEGORY,
  FETCH_EVENT_CATEGORY_REQUEST,
  FETCH_EVENT_CATEGORY_FAILURE,
  GET_ALL_EVENT_CATEGORY,
  SEARCH_EVENT_CATEGORY,
  SEARCH_EVENT_CATEGORY_REQUEST,
  SEARCH_EVENT_CATEGORY_FAILURE,
} from "../../../Actions/admin/eventCategoryActions/EventCategoryActionTypes";

const defaultState = {
  data: [],
  totalRecord: 1,
  postedMessage: [],
  del: [],
  loading: false,
  post: [],
  deletedMessage: [],
};
export const EventCategoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_EVENT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    case GET_EVENT_CATEGORY:
      return {
        ...state,
        data: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case GET_ALL_EVENT_CATEGORY:
      return {
        ...state,
        data: action.data,
      };

    case ADD_EVENT_CATEGORY:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_EVENT_CATEGORY:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_EVENT_CATEGORY:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case SEARCH_EVENT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };
    case SEARCH_EVENT_CATEGORY:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    default:
      return state;
  }
};
