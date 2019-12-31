import produce from 'immer';
import { action, ActionType, createReducer } from 'typesafe-actions';
import uuid from 'uuid';

export const CREATE_LISTS = "CREATE_LISTS";
export const UPDATE_LISTS_TITLE = "UPDATE_LISTS_TITLE";
export const UPDATE_LISTS_INDEX = "UPDATE_LISTS_INDEX";

export const createLists = (title: string, boardId: string) => {
    const id: string = uuid.v4();
    return action(CREATE_LISTS, { id, title, boardId });
}

export const updateListsTitle = (id: string, title: string) => action(UPDATE_LISTS_TITLE, { id, title });

export const updateListsIndex = (currentIndex: number, targetIndex: number) => action(UPDATE_LISTS_INDEX, { currentIndex, targetIndex });

const actions = {
    createLists,
    updateListsTitle,
    updateListsIndex
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
        }),
    [UPDATE_LISTS_INDEX]: (state, action) => 
        produce(state, draft => {
            const copyLists = [...state.lists];
            const currentList = copyLists[action.payload.currentIndex];
            const targetList = copyLists[action.payload.targetIndex];
            draft.lists = draft.lists.map((list: ListsType, index:number) => {
                if(index === action.payload.currentIndex){
                    list = targetList;
                }else if(index === action.payload.targetIndex){
                    list = currentList;
                }
                return list;
            })
        })
});