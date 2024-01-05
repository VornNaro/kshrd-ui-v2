import { GET_COURSE_TRAINING_TYPE_REQUEST, GET_COURSE_TRAINING_TYPE_SUCCESS, GET_COURSE_TRAINING_TYPE_FAILURE, GET_ALL_COURSE_TRAINING } from './courseTrainingActionType'
import Axios from "axios"
import { baseUrl } from "../../../../config/API"

//TODO: This function is created to get course training type
export const getAllCourseTrainingTypes = () => {
   return async (dispatch) => {
      try {
         dispatch({
            type: GET_COURSE_TRAINING_TYPE_REQUEST,
            data: [],
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/course-training-types`)

         dispatch({
            type: GET_COURSE_TRAINING_TYPE_SUCCESS,
            data: result.data.data,
            loading: false
         })
      } catch (err) {
         dispatch({
            type: GET_COURSE_TRAINING_TYPE_FAILURE,
            data: [],
            loading: true
         })
      }
   }
}

//TODO: This function is created to get all course training 
export const getAllCourseTraining = () => {
   return async dispatch => {
      const result = await Axios.get(`${baseUrl}/all-course-trainings`);
      dispatch({
         type: GET_ALL_COURSE_TRAINING,
         data: result.data.data
      })
   }
}