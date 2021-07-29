import { RoomsAction, RoomsActions } from "../model";

export function setRooms(payload: any): RoomsAction {
	return {
		type: RoomsActions.SET_ROOMS,
		payload: payload
	};
}