import {
  GET_COURSE_TRAINING_TYPE,
  DELETE_COURSE_TRAINING_TYPE,
  POST_COURSE_TRAINING_TYPE,
  UPDATE_COURSE_TRAINING_TYPE,
  FETCH_COURSE_TRAINING_TYPE_REQUEST,
  FETCH_COURSE_TRAINING_TYPE_FAILURE,
  SEARCH_COURSE_TRAINING_TYPE,
  SEARCH_COURSE_TRAINING_TYPE_REQUEST,
  SEARCH_COURSE_TRAINING_TYPE_FAILURE,
} from "../../../Actions/admin/courseTrainingTypeAction/CourseTrainingTypeActionType";

const defaultState = {
  courseTrainingType: [],
  del: [],
  post: [],
  totalRecord: 1,
  updatedData: [],
  loading: false,
  postedMessage: [],
  deletedMessage: [],
};
export const courseTrainingTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_COURSE_TRAINING_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_COURSE_TRAINING_TYPE_FAILURE:
      return {
        ...state,
        courseTrainingType: action.data,
        loading: action.loading,
      };

    case GET_COURSE_TRAINING_TYPE:
      return {
        ...state,
        courseTrainingType: action.data,
        totalRecord: action.totalRecord,
        loading: action.loading,
      };

    case DELETE_COURSE_TRAINING_TYPE:
      return {
        ...state,
        deletedMessage: action.data,
        loading: action.loading,
      };

    case POST_COURSE_TRAINING_TYPE:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };

    case UPDATE_COURSE_TRAINING_TYPE:
      return {
        ...state,
        postedMessage: action.data,
        loading: action.loading,
      };
    case SEARCH_COURSE_TRAINING_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_COURSE_TRAINING_TYPE_FAILURE:
      return {
        ...state,
        courseTrainingType: action.data,
        loading: action.loading,
      };
    case SEARCH_COURSE_TRAINING_TYPE:
      return {
        ...state,
        courseTrainingType: action.data,
        loading: action.loading,
      };
    default:
      return state;
  }
};
