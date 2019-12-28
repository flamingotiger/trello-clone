import produce from 'immer';
import { action, ActionType, createReducer } from 'typesafe-actions';
import uuid from 'uuid';

export const CREATE_CARD = "CREATE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";

export const createCard = (listsId: string, cardName: string) => {
    const id: string = uuid.v4();
    return action(CREATE_CARD, { id, cardName, listsId })
}

export const updateCard = (cardId: string, cardName: string) => action(UPDATE_CARD, { cardId, cardName });

const actions = {
    createCard,
    updateCard
};

export { actions };

export interface CardType {
    id: string;
    cardName: string;
    listsId: string;
}

export interface ListsState {
    cards: CardType[];
}

export type ListsActions = ActionType<typeof actions>;

const initialState: ListsState = {
    cards: []
};

export default createReducer<ListsState, ListsActions>(initialState, {
    [CREATE_CARD]: (state, action) =>
        produce(state, draft => {
            draft.cards = [...state.cards, { id: action.payload.id, listsId: action.payload.listsId, cardName: action.payload.cardName }];
        }),
    [UPDATE_CARD]: (state, action) =>
        produce(state, draft => {
            draft.cards = state.cards.map((card: CardType) => {
                if (card.id === action.payload.cardId) {
                    card = { ...card, cardName: action.payload.cardName };
                }
                return card;
            });
        })
});