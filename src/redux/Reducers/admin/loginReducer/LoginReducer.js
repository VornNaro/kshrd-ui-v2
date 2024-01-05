import { User, USER_LOGIN } from "../../../Actions/admin/loginActions/LoginActionType";
//import { updateObject } from "../../Actions/utilities/Utilities";

const initState = {
	token:null,
	loading: false,
	user: [],
	data:null,
	errorMessage:''
};

export const loginReducer = (state = initState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				data:action.data,
				loading:action.loading
			}


		case User.LOGIN_START:
			return {
				...state,
				data:action.data,
				loading:action.loading
			}


		case User.LOGIN_SUCCESS:
			return {
				...state,
				data:action.data,
				loading:action.loading,
				user:action.user
			}


		case User.LOGIN_FAIL:
			return {
				...state,
				errorMessage:action.errorMessage,
				loading:action.loading
			}


		case User.LOGOUT:
			return {
				...state,
				data:action.data
			};

		default:
			return state;
	}
};
