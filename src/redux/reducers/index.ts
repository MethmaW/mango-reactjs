import { History } from "history";
import { combineReducers } from "redux";
import { Theme } from "../model";
import * as themeReducer from "./theme";

export interface RootState {
	theme: Theme;
}

export default (history: History) =>
	combineReducers({
		...themeReducer,
	});
