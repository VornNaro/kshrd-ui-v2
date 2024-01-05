import { fetchBasicCT, fetchBasicCE } from "./basicCourseActionType"
import Axios from 'axios'
import { baseUrl } from '../../../../config/API';

//TODO: This function is created to get basic course training
export const getBasicCourseTraining = (id) => {
    return async dispatch => {
        try {
            dispatch({
                type: fetchBasicCT.request,
                data: [],
                loading: true
            })

            const result = await Axios.get(`${baseUrl}/course-trainings?courseTypeId=${id}`);
            dispatch({
                type: fetchBasicCT.success,
                data: result.data.data,
                loading: false
            })
        } catch (err) {
            dispatch({
                type: fetchBasicCT.failure,
                data: [],
                loading: false
            })
        }

    }
}

//TODO: This function is created to get basic course events
export const getBasicCourseEvents = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: fetchBasicCE.request,
                data: [],
                loading: true
            })

            const result = await Axios.get(`${baseUrl}/course-training-types/${id}/events`)
            dispatch({
                type: fetchBasicCE.success,
                data: result.data.data,
                loading: false
            })
        } catch (err) {
            dispatch({
                type: fetchBasicCE.failure,
                data: [],
                loading: false
            })
        }

    }

}
