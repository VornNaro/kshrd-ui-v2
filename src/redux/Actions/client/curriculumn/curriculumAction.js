import { baseUrl } from "../../../../config/API"
import { GET_CURRICULUM_BY_ID, GET_CURRICULUM_BY_ID_REQ, GET_CURRICULUM_BY_ID_FAILURE } from "./curriculumActionType"
import Axios from "axios"

//TODO: This function is created to get curriculum by id
export const getCurriculumById = (id) => {
   return async dispatch => {
      try {

         dispatch({
            type: GET_CURRICULUM_BY_ID_REQ,
            data: [],
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/course-trainings/${id}`)

         dispatch({
            type: GET_CURRICULUM_BY_ID,
            data: result.data.data,
            loading: false
         })

      } catch (err) {
         dispatch({
            type: GET_CURRICULUM_BY_ID_FAILURE,
            data: [],
            loading: false
         })
      }
   }
}