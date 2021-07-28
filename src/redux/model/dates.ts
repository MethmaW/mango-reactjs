export interface Date {
	selectedStartDate: string;
	selectedEndDate: string
}

export enum DateActions {
	SET_CHEKIN_DATE = "SET_CHEKIN_DATE",
}

interface DateActionType<T> {
	type: T;
	payload: any
}

export type DateAction = DateActionType<typeof DateActions.SET_CHEKIN_DATE>;
