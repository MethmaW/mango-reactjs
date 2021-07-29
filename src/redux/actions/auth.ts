import { AuthAction, AuthActions } from "../model";

export function setAuth(payload: any): AuthAction {
	return {
		type: AuthActions.SET_USER_DATA,
		payload: payload
	};
}