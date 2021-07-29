export interface Auth {
	loggedIn: boolean
	userData: {};
}

export enum AuthActions {
	SET_USER_DATA = "SET_USER_DATA",
}

interface AuthActionType<T> {
	type: T;
	payload: any
}

export type AuthAction = AuthActionType<typeof AuthActions.SET_USER_DATA>;