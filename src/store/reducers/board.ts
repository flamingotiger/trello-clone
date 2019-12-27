import produce from 'immer';
import { action, ActionType, createReducer } from 'typesafe-actions';
import uuid from 'uuid';

export const CREATE_BOARD = "CREATE_BOARD";

export const createBoard = (title: string) => {
    const id: string = uuid.v4();
    return action(CREATE_BOARD, { id, title });
}

const actions = {
    createBoard
};

export { actions };

export interface BoardType {
    id: string;
    title: string;
}

export interface BoardState {
    boards: BoardType[];
}

export type BoardActions = ActionType<typeof actions>;

const initialState: BoardState = {
    boards: []
};

export default createReducer<BoardState, BoardActions>(initialState, {
    [CREATE_BOARD]: (state, action) =>
        produce(state, draft => {
            draft.boards = [...state.boards, { id: action.payload.id, title: action.payload.title }];
        })
});