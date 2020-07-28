import { combineReducers } from "redux";
import board from './board';
import columns from './columns';
import tasks from './tasks';

const rootReducer = combineReducers({ board, columns, tasks });

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;