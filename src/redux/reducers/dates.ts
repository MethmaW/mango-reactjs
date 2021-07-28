import createReducer from "./createReducer";
import { DateAction, DateActions, Date } from "../model";

const ins: Date = {
	selectedStartDate: "",
	selectedEndDate: ""
};

export const dates = createReducer<Date>(ins, {
	[DateActions.SET_CHEKIN_DATE](state: Date, action: DateAction) {
		return {
			...state,
			selectedStartDate: action.payload.checkin,
			selectedEndDate: action.payload.checkout
		};
	},
});
