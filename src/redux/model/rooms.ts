export interface Rooms {
	data: {}[];
}

export enum RoomsActions {
	SET_ROOMS = "SET_ROOMS",
}

interface RoomsActionType<T> {
	type: T;
	payload: any
}

export type RoomsAction = RoomsActionType<typeof RoomsActions.SET_ROOMS>;
