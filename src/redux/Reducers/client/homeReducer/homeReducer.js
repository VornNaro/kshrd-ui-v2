import { GET_COURSE_TRAINING, FETCH_COURSE_TRAINING_FAILURE, FETCH_COURSE_TRAINING_REQUEST } from "../../../Actions/client/homeActions/homeActionType"

const defaultState = {
    data: [],
    loading: true,
}

export const clientHomeReducer = (state = defaultState, action) => {
    switch (action.type) {

        case FETCH_COURSE_TRAINING_REQUEST:
            return {
                ...state,
                loading: action.loading
            }
        case FETCH_COURSE_TRAINING_FAILURE:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }
        case GET_COURSE_TRAINING:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }


        default:
            return state
    }

}
