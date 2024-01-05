import { fetchAdvancedCT, fetchAdvancedCE } from "../../../Actions/client/advanceCourseActions/advanceCourseActionType"

const defaultState = {
    courseTraining: [],
    events: [],
    loading: false,
    eventLoading: false,
}

export const clientAdvancedCourseReducer = (state = defaultState, action) => {
    switch (action.type) {

        // fetch advanced course training

        case fetchAdvancedCT.request:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }

        case fetchAdvancedCT.success:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }
        case fetchAdvancedCT.failure:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }
        // fetch advanced course training


        // fetch advanced course events

        case fetchAdvancedCE.request:
            return {
                ...state,
                events: action.data,
                eventLoading: action.loading
            }

        case fetchAdvancedCE.success:
            return {
                ...state,
                events: action.data,
                eventLoading: action.loading
            }
        case fetchAdvancedCE.failure:
            return {
                ...state,
                events: action.data,
                eventLoading: action.loading
            }
        // fetch advanced course events

        default:
            return state
    }

}
