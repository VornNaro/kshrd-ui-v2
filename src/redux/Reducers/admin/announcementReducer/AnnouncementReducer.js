import {
  GET_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  GET_ANNOUNCEMENTS_REQUEST,
  GET_ANNOUNCEMENTS_FAILURE,
  SEARCH_ANNOUNCEMENT,
  SEARCH_ANNOUNCEMENT_FAILURE,
  SEARCH_ANNOUNCEMENT_REQUEST,
} from "../../../Actions/admin/announcementActions/AnnouncementActionTypes";

const defaultState = {
  data: [],
  deletedData: [],
  updatedData: [],
  totalRecord: 1,
  loading: false,
  searchLoading: false,
  postedMessage: [],
  deletedMessage: [],
};
export const AnnouncementReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case GET_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    case GET_ANNOUNCEMENTS:
      return {
        ...state,
        totalRecord: action.totalRecord,
        data: action.data,
        loading: action.loading,
      };

    case ADD_ANNOUNCEMENT:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_ANNOUNCEMENT:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_ANNOUNCEMENT:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case SEARCH_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    case SEARCH_ANNOUNCEMENT:
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };

    default:
      return state;
  }
};
