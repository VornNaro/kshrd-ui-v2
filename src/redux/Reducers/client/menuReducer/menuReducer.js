import { FETCH_MENU_SUCCESS, FETCH_MENU_REQUEST, FETCH_MENU_FAILURE } from "../../../Actions/client/menuActions/menuActionType"

const defaultState = {
   menus: [],
   loading: false
}

export const clientMenuReducer = (state = defaultState, action) => {
   switch (action.type) {
      case FETCH_MENU_SUCCESS:
         return {
            ...state,
            menus: action.data,
            loading: action.loading
         }
      case FETCH_MENU_REQUEST:
         return {
            ...state,
            menus: action.data,
            loading: action.loading
         }
      case FETCH_MENU_FAILURE:
         return {
            ...state,
            menus: action.data,
            loading: action.loading
         }

      default:
         return state;
   }
}