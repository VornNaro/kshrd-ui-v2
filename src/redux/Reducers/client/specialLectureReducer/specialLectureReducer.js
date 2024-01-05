import { fetchAllGeneration, fetchSpecialLecture } from "../../../Actions/client/specialLectureActions/specialLectureActionType";

const defaultState = {
   generations: [],
   loading: false,
   specialLecture: [],
   specialLecLoading: false
}

export const clientSpecialLectureReducer = (state = defaultState, action) => {
   switch (action.type) {

      case fetchAllGeneration.request:
         return {
            ...state,
            generations: action.data,
            loading: action.loading
         }

      case fetchAllGeneration.success:
         return {
            ...state,
            generations: action.data,
            loading: action.loading
         }

      case fetchAllGeneration.failure:
         return {
            ...state,
            generations: action.data,
            loading: action.loading
         }


      case fetchSpecialLecture.request:
         return {
            ...state,
            specialLecture: action.data,
            specialLecLoading: action.loading
         }

      case fetchSpecialLecture.success:
         return {
            ...state,
            specialLecture: action.data,
            specialLecLoading: action.loading
         }

      case fetchSpecialLecture.failure:
         return {
            ...state,
            specialLecture: action.data,
            specialLecLoading: action.loading
         }

      default:
         return state;
   }
}