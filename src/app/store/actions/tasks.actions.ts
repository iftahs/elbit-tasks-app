import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task';

export enum ActionTypes {
    fetchTasks = '[Tasks] Fetch',
    fetchTasksDone = '[Tasks] Fetch Done',
    fetchTasksError = '[Tasks] Fetch Error',
    deleteTask = '[Tasks] Delete',
    deleteTaskDone = '[Tasks] Delete Done',
    deleteTaskError = '[Tasks] Delete Error'
}

export const fetchTasks = createAction(ActionTypes.fetchTasks);
export const fetchTasksDone = createAction(ActionTypes.fetchTasksDone, props<{ tasks: Task[] }>());
export const fetchTasksError = createAction(ActionTypes.fetchTasksError);
export const deleteTask = createAction(ActionTypes.deleteTask, props<{ ssid: string }>());
export const deleteTaskDone = createAction(ActionTypes.deleteTaskDone, props<{ ssid: string }>());
export const deleteTaskError = createAction(ActionTypes.deleteTaskError);