import { DateAction, DateActions } from "../model";

export function setCheckinDate(payload: any): DateAction {
	return {
		type: DateActions.SET_CHEKIN_DATE,
		payload: payload
	};
}