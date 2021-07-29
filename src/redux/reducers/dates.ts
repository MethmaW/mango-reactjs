import createReducer from "./createReducer";
import { DatesAction, DatesActions, Dates } from "../model";

const ins: Dates = {
	selectedStartDate: "",
	selectedEndDate: ""
};

export const dates = createReducer<Dates>(ins, {
	[DatesActions.SET_CHEKIN_DATE](state: Dates, action: DatesAction) {
		return {
			...state,
			selectedStartDate: action.payload.checkin,
			selectedEndDate: action.payload.checkout
		};
	},
});
