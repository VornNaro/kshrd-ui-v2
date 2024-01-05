import { GET_CURRICULUM_BY_ID, GET_CURRICULUM_BY_ID_REQ, GET_CURRICULUM_BY_ID_FAILURE } from "../../../Actions/client/curriculumn/curriculumActionType"

const defaultState = {
   data: {},
   loading: true
}

export const clientCurriculumReducer = (state = defaultState, action) => {
   switch (action.type) {
      case GET_CURRICULUM_BY_ID:
         return {
            ...state,
            data: action.data,
            loading: action.loading
         }

      case GET_CURRICULUM_BY_ID_REQ:
         return {
            ...state,
            data: action.data,
            loading: action.loading
         }

      case GET_CURRICULUM_BY_ID_FAILURE:
         return {
            ...state,
            data: action.data,
            loading: action.loading
         }

      default:
         return state
   }
}