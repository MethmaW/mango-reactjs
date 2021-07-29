export interface Dates {
	selectedStartDate: string;
	selectedEndDate: string
}

export enum DatesActions {
	SET_CHEKIN_DATE = "SET_CHEKIN_DATE",
}

interface DatesActionType<T> {
	type: T;
	payload: any
}

export type DatesAction = DatesActionType<typeof DatesActions.SET_CHEKIN_DATE>;
