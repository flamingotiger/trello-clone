import produce from "immer";
import { action, ActionType, createReducer } from "typesafe-actions";

export const CREATE_TASK = "CREATE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

export const createTask = (id: string, taskName: string) => {
  return action(CREATE_TASK, { id, taskName });
};

export const updateTask = (taskId: string, taskName: string) =>
  action(UPDATE_TASK, { taskId, taskName });

const actions = {
  createTask,
  updateTask,
};

export { actions };

export interface TaskType {
  id: string;
  taskName: string;
}

export interface TaskState {
  tasks: { [key: string]: TaskType };
}

export type TaskActions = ActionType<typeof actions>;

const initialState: TaskState = {
  tasks: {},
};

export default createReducer<TaskState, TaskActions>(initialState, {
  [CREATE_TASK]: (state, action) =>
    produce(state, (draft) => {
      const { id, taskName } = action.payload;
      draft.tasks = {
        ...state.tasks,
        [id]: {
          id,
          taskName,
        },
      };
    }),
  [UPDATE_TASK]: (state, action) =>
    produce(state, (draft) => {
      const { taskId, taskName } = action.payload;
      draft.tasks = {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          taskName,
        },
      };
    }),
});
