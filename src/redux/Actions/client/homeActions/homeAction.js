import { GET_COURSE_TRAINING, FETCH_COURSE_TRAINING_REQUEST, FETCH_COURSE_TRAINING_FAILURE } from "./homeActionType";
import { baseUrl } from '../../../../config/API'
import Axios from 'axios'

//TODO: This function is created to get course training
export const getCourseTraining = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COURSE_TRAINING_REQUEST,
        data: [],
        loading: true
      })
      const result = await Axios.get(`${baseUrl}/all-course-trainings`)

      dispatch({
        type: GET_COURSE_TRAINING,
        data: result.data.data,
        loading: false
      })

    } catch (error) {
      dispatch({
        type: FETCH_COURSE_TRAINING_FAILURE,
        data: [],
        loading: true
      })
    }
  }
}
