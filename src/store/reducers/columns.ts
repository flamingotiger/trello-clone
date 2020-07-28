import produce from "immer";
import { action, ActionType, createReducer } from "typesafe-actions";
import uuid from "uuid";

export const ADD_LIST_CARD = "ADD_LIST_CARD";
export const CREATE_LISTS = "CREATE_LISTS";
export const UPDATE_LISTS_TITLE = "UPDATE_LISTS_TITLE";

export const addListCard = (id: string, taskId: string, title:string) => {
  return action(ADD_LIST_CARD, { id, taskId, title });
};

export const createLists = (title: string, boardId: string) => {
  const id: string = uuid.v4();
  return action(CREATE_LISTS, { id, title, boardId });
};

export const updateListsTitle = (id: string, title: string) =>
  action(UPDATE_LISTS_TITLE, { id, title });

const actions = {
  addListCard,
  createLists,
  updateListsTitle,
};

export { actions };

export interface ListsType {
  id: string;
  boardId: string;
  title: string;
  taskIds: string[];
}

export interface ListsState {
  columns: { [key: string]: ListsType };
  columnOrder: string[];
}

export type ListsActions = ActionType<typeof actions>;

const initialState: ListsState = {
  columns: {},
  columnOrder: [],
};

export default createReducer<ListsState, ListsActions>(initialState, {
  [ADD_LIST_CARD]: (state, action) =>
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
  [CREATE_LISTS]: (state, action) =>
    produce(state, (draft) => {
      const { id, boardId, title } = action.payload;
      draft.columns = {
        ...state.columns,
        [id]: { id, boardId, title, taskIds: [] },
      };
      draft.columnOrder = [...draft.columnOrder, id];
    }),
  [UPDATE_LISTS_TITLE]: (state, action) =>
    produce(state, (draft) => {
      const { id, title } = action.payload;
      draft.columns = {
        ...state.columns,
        [id]: { ...state.columns[id], title },
      };
    }),
});
