import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task';

export enum ActionTypes {
    fetchTasks = '[Tasks] Fetch',
    fetchTasksDone = '[Tasks] Fetch Done',
    deleteTask = '[Tasks] Delete',
    deleteTaskDone = '[Tasks] Delete Done',
    addTask = '[Tasks] Add Task',
    addTaskDone = '[Tasks] Add Task Done',
    editTask = '[Tasks] Edit Task',
    editTaskDone = '[Tasks] Edit Task Done',
}

export const fetchTasks = createAction(ActionTypes.fetchTasks);
export const fetchTasksDone = createAction(ActionTypes.fetchTasksDone, props<{ tasks: Task[] }>());
export const deleteTask = createAction(ActionTypes.deleteTask, props<{ ssid: string }>());
export const deleteTaskDone = createAction(ActionTypes.deleteTaskDone, props<{ ssid: string }>());
export const addTask = createAction(ActionTypes.addTask, props<{ task: Partial<Task> }>());
export const addTaskDone = createAction(ActionTypes.addTaskDone, props<{ task: Task }>());
export const editTask = createAction(ActionTypes.editTask, props<{ task: Partial<Task> }>());
export const editTaskDone = createAction(ActionTypes.editTaskDone, props<{ task: Task }>());