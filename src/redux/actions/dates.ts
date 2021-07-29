import { DatesAction, DatesActions } from "../model";

export function setCheckinDate(payload: any): DatesAction {
	return {
		type: DatesActions.SET_CHEKIN_DATE,
		payload: payload
	};
}