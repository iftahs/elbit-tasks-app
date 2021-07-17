import { createReducer, on, Action } from '@ngrx/store';
import { TasksState } from 'src/app/models/task';
import { fetchTasks, fetchTasksDone } from '../actions/tasks.actions';

export const intialState: TasksState = {
    isLoading: false,
    tasks: []
}

const _tasksReducer = createReducer(
    intialState,
    on(fetchTasks, (state) => ({ ...state, isLoading: true })),
    on(fetchTasksDone, (state, action) => ({ isLoading: false, tasks: action.tasks })),
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
    return _tasksReducer(state, action);
}