import {
  GET_EVENTS,
  POST_EVENT,
  DELETE_EVENT,
  GET_EVENTS_REQUEST,
  GET_EVENTS_FAILURE,
  POST_EVENT_FAILURE,
  POST_EVENT_REQUEST,
  UPDATE_EVENTS_FAILURE,
  UPDATE_EVENTS_REQUEST,
  UPDATE_EVENT,
  SEARCH_EVENT,
  SEARCH_EVENT_FAILURE,
  SEARCH_EVENT_REQUEST
} from "../../../Actions/admin/eventActions/EventActionTypes";

const defaultState = {
  data: [],
  postedMessage: [],
  deletedMessage: [],
  loading: false,
  totalRecord: 1,
};
export const eventReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case GET_EVENTS:
      return {
        ...state,
        data: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case GET_EVENTS_FAILURE:
      return {
        ...state,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case POST_EVENT_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case POST_EVENT_FAILURE:
      return {
        ...state,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case POST_EVENT:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_EVENTS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case UPDATE_EVENTS_FAILURE:
      return {
        ...state,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case UPDATE_EVENT:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_EVENT:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_EVENT_REQUEST:
      return{
        ...state,
        loading: action.loading,
      }
    case SEARCH_EVENT:
      return{
        ...state,
        data:action.data,
        loading:action.loading
      }
    case SEARCH_EVENT_FAILURE:
      return{
        ...state,
        data:action.data,
        loading:action.loading
      }
    default:
      return state;
  }
};
