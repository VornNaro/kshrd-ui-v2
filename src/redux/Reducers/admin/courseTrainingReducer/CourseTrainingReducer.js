import {
  GET_COURSE_TRAINING,
  DELETE_COURSE_TRAINING,
  SEARCH_COURSE_TRAINING,
  FETCH_COURSE_TRAINING_REQUEST,
  FETCH_COURSE_TRAINING_FAILURE,
  GET_ALL_COURSE_TRAINING,
  POST_COURSE_TRAINING,
  UPDATE_COURSE_TRAINING,
  SEARCH_COURSE_TRAINING_REQUEST,
  SEARCH_COURSE_TRAINING_FAILURE,
} from "../../../Actions/admin/courseTraining/CourseTrainingActionType";

const defaultState = {
  courseTraining: [],
  totalRecord: 1,
  del: [],
  loading: false,
  postedMessage: [],
  deletedMessage: [],
};
export const courseTrainingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_COURSE_TRAINING:
      return {
        ...state,
        courseTraining: action.data,
      };

    case FETCH_COURSE_TRAINING_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_COURSE_TRAINING_FAILURE:
      return {
        ...state,
        courseTraining: action.data,
        loading: action.loading,
      };

    case GET_COURSE_TRAINING:
      return {
        ...state,
        courseTraining: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case POST_COURSE_TRAINING:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_COURSE_TRAINING:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case DELETE_COURSE_TRAINING:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_COURSE_TRAINING_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_COURSE_TRAINING_FAILURE:
      return {
        ...state,
        courseTraining: action.data,
        loading: action.loading,
      };
    case SEARCH_COURSE_TRAINING:
      return {
        ...state,
        courseTraining: action.data,
        loading: action.loading,
      };
    default:
      return state;
  }
};
