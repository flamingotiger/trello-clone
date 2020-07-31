import produce from "immer";
import { action, ActionType, createReducer } from "typesafe-actions";
import uuid from "uuid";

export const ADD_COLUMN_TASK = "ADD_COLUMN_TASK";
export const CREATE_COLUMN = "CREATE_COLUMN";
export const UPDATE_COLUMN_TITLE = "UPDATE_COLUMN_TITLE";
export const UPDATE_COLUMN_TASK_INDEX = "UPDATE_COLUMN_TASK_INDEX";
export const UPDATE_OTHER_COLUMN_TASK_INDEX = "UPDATE_OTHER_COLUMN_TASK_INDEX";

export const addColumnTask = (id: string, taskId: string, title: string) => {
  return action(ADD_COLUMN_TASK, { id, taskId, title });
};

export const updateColumnTaskIndex = (newColumn: ColumnType) => {
  return action(UPDATE_COLUMN_TASK_INDEX, { newColumn });
};

export const updataOtherColumnTaskIndex = (
  newStart: ColumnType,
  newFinish: ColumnType
) => {
  return action(UPDATE_OTHER_COLUMN_TASK_INDEX, { newStart, newFinish });
};

export const createColumn = (title: string, boardId: string) => {
  const id: string = uuid.v4();
  return action(CREATE_COLUMN, { id, title, boardId });
};

export const updateColumnTitle = (id: string, title: string) =>
  action(UPDATE_COLUMN_TITLE, { id, title });

const actions = {
  addColumnTask,
  createColumn,
  updateColumnTitle,
  updateColumnTaskIndex,
  updataOtherColumnTaskIndex,
};

export { actions };

export interface ColumnType {
  id: string;
  boardId: string;
  title: string;
  taskIds: string[];
}

export interface ColumnState {
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
}

export type ColumnActions = ActionType<typeof actions>;

const initialState: ColumnState = {
  columns: {},
  columnOrder: [],
};

export default createReducer<ColumnState, ColumnActions>(initialState, {
  [ADD_COLUMN_TASK]: (state, action) =>
    produce(state, (draft) => {
      const { taskId, id, title } = action.payload;
      draft.columns = {
        ...state.columns,
        [id]: {
          ...state.columns[id],
          title,
          taskIds: [...state.columns[id].taskIds, taskId],
        },
      };
    }),
  [CREATE_COLUMN]: (state, action) =>
    produce(state, (draft) => {
      const { id, boardId, title } = action.payload;
      draft.columns = {
        ...state.columns,
        [id]: { id, boardId, title, taskIds: [] },
      };
      draft.columnOrder = [...draft.columnOrder, id];
    }),
  [UPDATE_COLUMN_TITLE]: (state, action) =>
    produce(state, (draft) => {
      const { id, title } = action.payload;
      draft.columns = {
        ...state.columns,
        [id]: { ...state.columns[id], title },
      };
    }),
  [UPDATE_COLUMN_TASK_INDEX]: (state, action) =>
    produce(state, (draft) => {
      const { newColumn } = action.payload;
      draft.columns = {
        ...state.columns,
        [newColumn.id]: newColumn,
      };
    }),
  [UPDATE_OTHER_COLUMN_TASK_INDEX]: (state, action) =>
    produce(state, (draft) => {
      const { newStart, newFinish } = action.payload;
      draft.columns = {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }),
});
