import {
  GET_USERS,
  DELETE_USER,
  POST_USER,
  UPDATE_USER,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  GET_ALL_USERS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_FAILURE,
  SEARCH_USER,
  SEARCH_USER_REQUEST,
  SEARCH_USER_FAILURE,
} from "../../../Actions/admin/userActions/UserActionType";

const defaultState = {
  data: [],
  postedMessage: [],
  deletedMessage: [],
  updatedData: [],
  loading: false,
};
export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    case GET_USERS:
      return {
        ...state,
        data: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case POST_USER:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_USER:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_USER:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case SEARCH_USER_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_USER_FAILURE:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };
    case SEARCH_USER:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    default:
      return state;
  }
};
