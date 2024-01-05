import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_KH_SUCCESS
} from "../../../Actions/client/covidActions/covidActionType";

const defaultState = {
  data: {},
  dataKh: {}
};

export const clientCovidReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    case FETCH_DATA_KH_SUCCESS:
      return {
        ...state,
        dataKh: action.data
      };
    default:
      return state;
  }
};
