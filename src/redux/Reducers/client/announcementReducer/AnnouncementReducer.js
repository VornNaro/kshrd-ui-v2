import { getAnnouncementByIdAction, GET_ANNOUNCEMENTS, GET_ANNOUNCEMENTS_REQUEST, GET_ANNOUNCEMENTS_FAILURE } from "../../../Actions/client/announcementActions/AnnouncementActionType"

const defaultState = {
    announcements: [],
    announcement: [],
    loading: true,
    annLoading: true,
    pagination: {},
}

export const clientAnnouncementReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ANNOUNCEMENTS:
            return {
                ...state,
                announcements: action.data,
                pagination: action.pagination,
                annLoading: action.loading
            }
        case GET_ANNOUNCEMENTS_REQUEST:
            return {
                ...state,
                announcements: action.data,
                pagination: action.pagination,
                annLoading: action.loading
            }

        case GET_ANNOUNCEMENTS_FAILURE:
            return {
                ...state,
                announcements: action.data,
                pagination: action.pagination,
                annLoading: action.loading
            }

        case getAnnouncementByIdAction.request:
            return {
                ...state,
                announcement: action.data,
                loading: action.loading
            }
        case getAnnouncementByIdAction.success:
            return {
                ...state,
                announcement: action.data,
                loading: action.loading
            }

        case getAnnouncementByIdAction.failure:
            return {
                ...state,
                announcement: action.data,
                loading: action.loading
            }

        default:
            return state
    }
}