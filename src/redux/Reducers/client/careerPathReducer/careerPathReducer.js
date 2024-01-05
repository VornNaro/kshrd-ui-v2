import { GET_CAREERPATH, GET_CAREERPATH_REQUEST, GET_CAREERPATH_FAILURE } from '../../../Actions/client/careerPathActions/careerPathActionTypes'

const defaultState = {
    data: [],
    loading: false
}
export const clientCareerPathReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_CAREERPATH:
            return {
                ...state,
                data: action.data,
                loading: action.loading
            }
        case GET_CAREERPATH_REQUEST:
            return {
                ...state,
                loading: action.loading
            }

        case GET_CAREERPATH_FAILURE:
            return {
                ...state,
                data: action.data,
                loading: action.loading
            }
        default:
            return state
    }
}
