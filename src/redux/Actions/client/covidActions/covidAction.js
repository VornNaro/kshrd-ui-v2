import Axios from "axios";
import { FETCH_DATA_SUCCESS, FETCH_DATA_KH_SUCCESS } from "./covidActionType";
import { covidBaseUrl } from "../../../../config/API";

//TODO: This function is created to get world wide data of covid-19
export const getCovidInfo = () => {
  return async dispatch => {
    const data = await Axios.get(`${covidBaseUrl}/world`);
    dispatch({
      type: FETCH_DATA_SUCCESS,
      data: data
    });
  };
};

//TODO: This function is created to get data in cambodia of covid-19
export const getCovidInfoKh = () => {
  return async dispatch => {
    const data = await Axios.get(`${covidBaseUrl}/cambodia`);
    dispatch({
      type: FETCH_DATA_KH_SUCCESS,
      data: data
    });
  };
};
