import { GET_ALUMNI, GET_MORE_ALUMNI } from "../../../Actions/client/alumniActions/alumniActionType"

const defaultState = {
    data: []
}
export const clientAlumniReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ALUMNI:
            return {
                ...state,
                data: action.data
            }
        case GET_MORE_ALUMNI:
            return {
                ...state, data: [...state.data, ...action.data]
            }
        default:
            return state
    }

}