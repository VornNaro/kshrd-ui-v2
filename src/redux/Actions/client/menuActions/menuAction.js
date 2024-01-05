import { FETCH_MENU_SUCCESS, FETCH_MENU_REQUEST, FETCH_MENU_FAILURE } from "./menuActionType"
import Axios from "axios";
import { baseUrl } from '../../../../config/API'

//TODO: This function is created to get menus
export const getMenus = () => {

   return async (dispatch) => {
      try {
         dispatch({
            type: FETCH_MENU_REQUEST,
            data: [],
            loading: true
         });
         const result = await Axios.get(`${baseUrl}/menus`);
         dispatch({
            type: FETCH_MENU_SUCCESS,
            data: result.data.data,
            loading: false
         });
      } catch (err) {
         dispatch({
            type: FETCH_MENU_FAILURE,
            data: [],
            loading: true
         });
      }

   }
}