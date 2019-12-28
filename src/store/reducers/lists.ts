import produce from 'immer';
import { action, ActionType, createReducer } from 'typesafe-actions';
import uuid from 'uuid';

export const CREATE_LISTS = "CREATE_LISTS";
export const UPDATE_LISTS_TITLE = "UPDATE_LISTS_TITLE";

export const createLists = (title: string, boardId: string) => {
    const id: string = uuid.v4();
    return action(CREATE_LISTS, { id, title, boardId });
}

export const updateListsTitle = (id: string, title: string) => action(UPDATE_LISTS_TITLE, { id, title });

const actions = {
    createLists,
    updateListsTitle
};

export { actions };

export interface ListsType {
    id: string;
    boardId: string;
    title: string;
}

export interface ListsState {
    lists: ListsType[];
}

export type ListsActions = ActionType<typeof actions>;

const initialState: ListsState = {
    lists: []
};

export default createReducer<ListsState, ListsActions>(initialState, {
    [CREATE_LISTS]: (state, action) =>
        produce(state, draft => {
            draft.lists = [...state.lists, { id: action.payload.id, boardId: action.payload.boardId, title: action.payload.title }];
        }),
    [UPDATE_LISTS_TITLE]: (state, action) =>
        produce(state, draft => {
            draft.lists = state.lists.map((list: ListsType) => {
                if (list.id === action.payload.id) {
                    list = { ...list, title: action.payload.title }
                }
                return list;
            })
        })
});