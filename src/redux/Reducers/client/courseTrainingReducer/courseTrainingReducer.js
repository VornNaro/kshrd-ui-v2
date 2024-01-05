import { GET_COURSE_TRAINING_TYPE_REQUEST, GET_COURSE_TRAINING_TYPE_SUCCESS, GET_COURSE_TRAINING_TYPE_FAILURE, GET_ALL_COURSE_TRAINING } from "../../../Actions/client/courseTrainingActions/courseTrainingActionType"

const defaultState = {
   courseTrainingTypes: [],
   allCourseTraining: [],
   loading: false
}

export const clientCourseTrainingTypeReducer = (state = defaultState, action) => {
   switch (action.type) {

      case GET_COURSE_TRAINING_TYPE_REQUEST:
         return {
            ...state,
            courseTrainingTypes: action.data,
            loading: action.loading
         }

      case GET_COURSE_TRAINING_TYPE_SUCCESS:
         return {
            ...state,
            courseTrainingTypes: action.data,
            loading: action.loading
         }


      case GET_COURSE_TRAINING_TYPE_FAILURE:
         return {
            ...state,
            courseTrainingTypes: action.data,
            loading: action.loading
         }

      case GET_ALL_COURSE_TRAINING:
         return {
            ...state,
            allCourseTraining: action.data
         }

      default:
         return state
   }
}