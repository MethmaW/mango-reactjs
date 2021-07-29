import createReducer from "./createReducer";
import { Auth, AuthAction, AuthActions } from "../model";

const initialState: Auth = {
	loggedIn: false,
	userData: {}
};

export const auth = createReducer<Auth>(initialState, {
	[AuthActions.SET_USER_DATA](state: Auth, action: AuthAction) {
		return {
			...state,
			loggedIn: action.payload.loggedIn,
			userData: action.payload.userData
		};
	},
});