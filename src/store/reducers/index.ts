import { combineReducers } from "redux";
import board from './board';
import lists from './lists';

const rootReducer = combineReducers({ board, lists });

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;