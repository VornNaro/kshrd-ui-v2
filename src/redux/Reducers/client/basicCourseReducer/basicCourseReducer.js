import { fetchBasicCE, fetchBasicCT } from "../../../Actions/client/basicCourseActions/basicCourseActionType"

const defaultState = {
    courseTraining: [],
    events: [],
    loading: false,
    eventLoading: false,
}

export const clientBasicCourseReducer = (state = defaultState, action) => {
    switch (action.type) {

        // fetch basic course training

        case fetchBasicCT.request:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }

        case fetchBasicCT.success:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }
        case fetchBasicCT.failure:
            return {
                ...state,
                courseTraining: action.data,
                loading: action.loading
            }
        // fetch basic course training


        //fetch basic course events

        case fetchBasicCE.request:
            return {
                ...state,
                events: action.data,
                eventLoading: action.loading
            }

        case fetchBasicCE.success:
            return {
                ...state,
                events: action.data,
                eventLoading: action.loading
            }
        case fetchBasicCE.failure:
            return {
                ...state,
                events: action.data,
                eventLoading: action.loading
            }

        //fetch basic course events

        default:
            return state
    }

}
