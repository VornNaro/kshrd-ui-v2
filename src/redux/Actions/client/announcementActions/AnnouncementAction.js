import Axios from "axios"
import { getAnnouncementByIdAction, GET_ANNOUNCEMENTS_REQUEST, GET_ANNOUNCEMENTS, GET_ANNOUNCEMENTS_FAILURE } from "./AnnouncementActionType"
import { baseUrl } from "../../../../config/API"

//TODO: This function is created to get announcement by id
export const getAnnouncementById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: getAnnouncementByIdAction.request,
                data: [],
                loading: true
            })

            const result = await Axios.get(`${baseUrl}/announcements/${id}`)

            dispatch({
                type: getAnnouncementByIdAction.success,
                data: result.data.data,
                loading: false
            })

        } catch (err) {
            dispatch({
                type: getAnnouncementByIdAction.failure,
                data: [],
                loading: true
            })
        }

    }
}

//TODO: This function is created to get announcement
export const getAnnouncement = (limit, page) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_ANNOUNCEMENTS_REQUEST,
                data: [],
                pagination: {},
                loading: true
            })
            const announcements = await Axios.get(`${baseUrl}/announcements?limit=${limit}&page=${page}`)
            dispatch({
                type: GET_ANNOUNCEMENTS,
                data: announcements.data.data,
                pagination: announcements.data.pagination,
                loading: false
            })
        } catch (err) {
            dispatch({
                type: GET_ANNOUNCEMENTS_FAILURE,
                data: [],
                pagination: {},
                loading: true,
            })
        }

    }
}