import Axios from 'axios'

import { GET_ALUMNI, GET_MORE_ALUMNI } from './alumniActionType'
import { baseUrl } from '../../../../config/API'

//TODO: This function is created to get alumni
export const getAlumni = () => {
    return async (dispatch) => {
        const result = await Axios.get(`${baseUrl}/alumni?limit=10&page=1`)
        dispatch({
            type: GET_ALUMNI,
            data: result.data.data
        })
    }

}
//TODO: This function is created to get more alumni
export const getMoreAlumni = (page, callback) => {
    return async (dispatch) => {
        const result = await Axios.get(`${baseUrl}/alumni?limit=10&page=${page}`)
        dispatch({
            type: GET_MORE_ALUMNI,
            data: result.data.data
        })
        callback(result.data.data)
    }
}
