import { fetchAllGeneration, fetchSpecialLecture } from "./specialLectureActionType"
import Axios from "axios"
import { baseUrl } from "../../../../config/API"

//TODO: This function is created to get all generation
export const getAllGeneration = () => {
   return async (dispatch) => {
      try {
         dispatch({
            type: fetchAllGeneration.request,
            data: [],
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/all-generations`)

         dispatch({
            type: fetchAllGeneration.success,
            data: result.data.data,
            loading: false
         })

      } catch (err) {

         dispatch({
            type: fetchAllGeneration.failure,
            data: [],
            loading: true
         })

      }
   }
}

//TODO: This function is created to get special lecture by id
export const getSpecialLectureByGenId = id => {
   return async (dispatch) => {
      try {
         dispatch({
            type: fetchSpecialLecture.request,
            data: [],
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/generation/${id}/event-category/4`)

         dispatch({
            type: fetchSpecialLecture.success,
            data: result.data.data,
            loading: false
         })

      } catch (err) {

         dispatch({
            type: fetchSpecialLecture.failure,
            data: [],
            loading: true
         })

      }
   }
}