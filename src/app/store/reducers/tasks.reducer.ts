import { createReducer, on, Action } from '@ngrx/store';
import { TasksState } from 'src/app/models/task';
import { deleteTask, deleteTaskDone, fetchTasks, fetchTasksDone } from '../actions/tasks.actions';

export const intialState: TasksState = {
    isLoading: false,
    tasks: []
}

const deleteTaskHelper = (state: TasksState, action: {ssid: string}): TasksState => {
    const tasks = state.tasks;
    const updatedTasks = tasks.filter(task => task.ssid !== action.ssid)
    return {
        isLoading: false,
        tasks: updatedTasks
    }
}

const _tasksReducer = createReducer(
    intialState,
    on(fetchTasks, (state) => ({ ...state, isLoading: true })),
    on(fetchTasksDone, (state, action) => ({ isLoading: false, tasks: action.tasks })),
    on(deleteTask, (state) => ({...state, isLoading: true})),
    on(deleteTaskDone, (state, action) => deleteTaskHelper(state, action)),
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
    return _tasksReducer(state, action);
}