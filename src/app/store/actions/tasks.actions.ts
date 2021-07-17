import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task';

export enum ActionTypes {
    fetchTasks = '[Tasks] Fetch',
    fetchTasksDone = '[Tasks] Fetch Done',
    fetchTasksError = '[Tasks] Fetch Error'
}

export const fetchTasks = createAction(ActionTypes.fetchTasks);
export const fetchTasksDone = createAction(ActionTypes.fetchTasksDone, props<{tasks: Task[]}>());
export const fetchTasksError = createAction(ActionTypes.fetchTasksError);