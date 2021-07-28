import { History } from "history";
import { combineReducers } from "redux";
import { Theme, Date } from "../model";
import * as themeReducer from "./theme";
import * as datesReducer from "./dates"

export interface RootState {
	theme: Theme;
	dates: Date;
}

export default (history: History) =>
	combineReducers({
		...themeReducer,
		...datesReducer
	});
