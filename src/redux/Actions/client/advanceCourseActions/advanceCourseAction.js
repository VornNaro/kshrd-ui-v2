import Axios from 'axios'
import { fetchAdvancedCE, fetchAdvancedCT } from './advanceCourseActionType';
import { baseUrl } from '../../../../config/API';

//TODO: This function is created to  get advanced course training
export const getAdvancedCourseTraining = (id) => {
    return async dispatch => {
        try {
            dispatch({
                type: fetchAdvancedCT.request,
                data: [],
                loading: true
            })

            const result = await Axios.get(`${baseUrl}/course-trainings?courseTypeId=${id}`);

            dispatch({
                type: fetchAdvancedCT.success,
                data: result.data.data,
                loading: false
            })
        } catch (err) {
            dispatch({
                type: fetchAdvancedCT.failure,
                data: [],
                loading: false
            })
        }

    }
}

//TODO: This function is created to get advanced course events
export const getAdvancedCourseEvents = (id) => {
    return async dispatch => {
        try {
            dispatch({
                type: fetchAdvancedCE.request,
                data: [],
                loading: true
            })

            const result = await Axios.get(`${baseUrl}/course-training-types/${id}/events`)

            dispatch({
                type: fetchAdvancedCE.success,
                data: result.data.data,
                loading: false
            })
        } catch (err) {
            dispatch({
                type: fetchAdvancedCE.failure,
                data: [],
                loading: false
            })
        }

    }
}