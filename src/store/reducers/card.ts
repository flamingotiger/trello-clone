import produce from 'immer';
import { action, ActionType, createReducer } from 'typesafe-actions';
import uuid from 'uuid';

export const CREATE_CARD = "CREATE_CARD";

export const createLists = (title: string) => {
    const id: string = uuid.v4();
    return action(CREATE_CARD, { id, title });
}

const actions = {
    createLists
};

export { actions };

export interface CardType {
    id: string;
    title: string;
}

export interface CardState {
    lists: CardType[];
}

export type CardActions = ActionType<typeof actions>;

const initialState: CardState = {
    lists: []
};

export default createReducer<CardState, CardActions>(initialState, {
    [CREATE_CARD]: (state, action) =>
        produce(state, draft => {
            draft.lists = [...state.lists, { id: action.payload.id, title: action.payload.title }];
        })
});