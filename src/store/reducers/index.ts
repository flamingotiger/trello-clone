import { combineReducers } from "redux";
import board from './board';
import column from './column';
import task from './task';

const rootReducer = combineReducers({ board, column, task });

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;