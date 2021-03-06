import { createReducer, on, Action } from '@ngrx/store';
import { Task, TasksState } from 'src/app/models/task';
import { addTask, addTaskDone, closeErrorModal, deleteTask, deleteTaskDone, editTask, editTaskDone, fetchTasks, fetchTasksDone, openErrorModal } from '../actions/tasks.actions';

export const intialState: TasksState = {
    isLoading: false,
    tasks: [],
    error: undefined
}

const deleteTaskHelper = (state: TasksState, action: { ssid: string }): TasksState => {
    const tasks = state.tasks;
    const updatedTasks = tasks.filter(task => task.ssid !== action.ssid)
    return {
        error: undefined,
        isLoading: false,
        tasks: updatedTasks
    }
}

const addTaskHelper = (state: TasksState, action: { task: Task }): TasksState => {
    const tasks = [...state.tasks];
    tasks.push(action.task);
    return {
        error: undefined,
        isLoading: false,
        tasks
    }
}

const editTaskHelper = (state: TasksState, action: { task: Task }): TasksState => {
    const tasks = [...state.tasks];
    const index = tasks.findIndex(task => task.ssid === action.task.ssid)
    tasks[index] = { ...action.task };

    return {
        error: undefined,
        isLoading: false,
        tasks
    }
}

const _tasksReducer = createReducer(
    intialState,
    on(fetchTasks, (state) => ({ ...state, isLoading: true })),
    on(fetchTasksDone, (state, action) => ({ isLoading: false, tasks: action.tasks, error: undefined })),
    on(deleteTask, (state) => ({ ...state, isLoading: true })),
    on(deleteTaskDone, (state, action) => deleteTaskHelper(state, action)),
    on(addTask, (state, action) => ({ ...state, isLoading: true })),
    on(addTaskDone, (state, action) => addTaskHelper(state, action)),
    on(editTask, (state, action) => ({ ...state, isLoading: true })),
    on(editTaskDone, (state, action) => editTaskHelper(state, action)),
    on(openErrorModal, (state, action) => ({ ...state, error: action.message, isLoading: false })),
    on(closeErrorModal, (state, action) => ({ ...state, error: undefined}))
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
    return _tasksReducer(state, action);
}