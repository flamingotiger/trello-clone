import { combineReducers } from "redux";
import board from './board';

const rootReducer = combineReducers({ board });

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;