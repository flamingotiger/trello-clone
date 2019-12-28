import { combineReducers } from "redux";
import board from './board';
import lists from './lists';
import card from './card';

const rootReducer = combineReducers({ board, lists, card });

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;