import {
  GET_MENU,
  SEARCH_MENU,
  UPDATE_MENU,
  POST_MENU,
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCUESS,
  FETCH_MENU_FAILURE,
  DELETE_MENU,
  UPDATE_MENU_SUCESS,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_FAILURE,
  SEARCH_MENU_REQUEST,
  SEARCH_MENU_FAILURE,
} from "../../../Actions/admin/menuActions/MenuActionType";

const defaultState = {
  menu: [],
  postedMessage: [],
  deletedMessage: [],
  parentMenu: [],
  loading: false,
  totalRecord: 1,
};
export const menuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        parentMenu: action.data,
      };

    case "get menu 2":
      return {
        ...state,
        parentMenu: action.data
      }

    case FETCH_MENU_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_MENU_FAILURE:
      return {
        ...state,
        menu: action.data,
        loading: action.loading,
      };

    case FETCH_MENU_SUCCUESS:
      return {
        ...state,
        menu: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case POST_MENU:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_MENU_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_MENU_FAILURE:
      return {
        ...state,
        menu: action.data,
        loading: action.loading,
      };
    case SEARCH_MENU:
      return {
        ...state,
        menu: action.data,
        loading: action.loading
      };

    case DELETE_MENU:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_MENU_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case UPDATE_MENU_SUCESS:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_MENU_FAILURE: {
      return {
        ...state,
        loading: action.loading,
      };
    }

    default:
      return state;
  }
};
