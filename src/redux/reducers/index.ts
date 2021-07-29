import { History } from "history";
import { combineReducers } from "redux";
import { Theme, Dates, Rooms, Auth } from "../model";
import * as themeReducer from "./theme";
import * as datesReducer from "./dates"
import * as roomsReducer from "./rooms"
import * as authReducer from "./auth"

export interface RootState {
	theme: Theme;
	dates: Dates;
	rooms: Rooms;
	auth: Auth
}

export default (history: History) =>
	combineReducers({
		...themeReducer,
		...datesReducer,
		...roomsReducer,
		...authReducer
	});
