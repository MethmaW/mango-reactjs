import createReducer from "./createReducer";
import { RoomsAction, RoomsActions, Rooms } from "../model";

const initialState: Rooms = {
	data: [],
};

export const rooms = createReducer<Rooms>(initialState, {
	[RoomsActions.SET_ROOMS](state: Rooms, action: RoomsAction) {
		return {
			...state,
			data: action.payload,
		};
	},
});