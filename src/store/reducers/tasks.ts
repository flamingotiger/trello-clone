import produce from "immer";
import { action, ActionType, createReducer } from "typesafe-actions";

export const CREATE_CARD = "CREATE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";

export const createCard = (id: string, cardName: string) => {
  return action(CREATE_CARD, { id, cardName });
};

export const updateCard = (cardId: string, cardName: string) =>
  action(UPDATE_CARD, { cardId, cardName });

const actions = {
  createCard,
  updateCard,
};

export { actions };

export interface CardType {
  id: string;
  cardName: string;
}

export interface ListsState {
  tasks: { [key: string]: CardType };
}

export type ListsActions = ActionType<typeof actions>;

const initialState: ListsState = {
  tasks: {},
};

export default createReducer<ListsState, ListsActions>(initialState, {
  [CREATE_CARD]: (state, action) =>
    produce(state, (draft) => {
      const { id, cardName } = action.payload;
      draft.tasks = {
        ...state.tasks,
        [id]: {
          id,
          cardName,
        },
      };
    }),
  [UPDATE_CARD]: (state, action) =>
    produce(state, (draft) => {
      draft.tasks = state.tasks;
      // draft.tasks = state.tasks.map((card: CardType) => {
      //   if (card.id === action.payload.cardId) {
      //     card = { ...card, cardName: action.payload.cardName };
      //   }
      //   return card;
      // });
    }),
});
