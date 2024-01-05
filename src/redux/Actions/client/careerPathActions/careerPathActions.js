import { GET_CAREERPATH, GET_CAREERPATH_REQUEST, GET_CAREERPATH_FAILURE } from './careerPathActionTypes'
import Axios from 'axios'
import { baseUrl } from '../../../../config/API'

//TODO: This function is created to get careerpath
export const getCareerPathPosts = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_CAREERPATH_REQUEST,
                data: [],
                loading: true
            })

            const result = await Axios.get(`${baseUrl}/all-career-paths`)

            dispatch({
                type: GET_CAREERPATH,
                data: result.data.data,
                loading: false
            })

        } catch (error) {
            dispatch({
                type: GET_CAREERPATH_FAILURE,
                data: [],
                loading: true
            })
        }
    }
}


