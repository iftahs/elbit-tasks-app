import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { concat, EMPTY, of } from 'rxjs';
import { TasksService } from "src/app/services/tasksService";
import { ActionTypes, addTask, deleteTask, editTask, openErrorModal } from "../actions/tasks.actions";import { Router } from "@angular/router";
import { Task } from "src/app/models/task";
;

@Injectable()
export class TasksEffects {

    fetchTasks$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.fetchTasks),
        mergeMap(() => this.tasksService.getAll()
            .pipe(
                map(tasks => {
                    if (!tasks) {
                        return {
                            type: ActionTypes.fetchTasksDone,
                            tasks: []
                        }
                    }
                    const manipulatedTasks = Object.keys(tasks).map(key => {
                        return {
                            ssid: key,
                            ...tasks[key]
                        }
                    });

                    return {
                        type: ActionTypes.fetchTasksDone,
                        tasks: manipulatedTasks
                    }
                }),
                catchError(() => of({type: ActionTypes.openErrorModal, message: 'Failed to fetch tasks from server.'}))
            ))
    ));

    deleteTask$ = createEffect(() => this.actions$.pipe(
        ofType(deleteTask),
        exhaustMap((action) => this.tasksService.delete(action.ssid)
            .pipe(
                map(() => {
                    return {
                        type: ActionTypes.deleteTaskDone,
                        ssid: action.ssid
                    }
                }),
                catchError(() => of({type: ActionTypes.openErrorModal, message: 'Failed to delete task.'}))
            ))
    ));

    addTask$ = createEffect(() => this.actions$.pipe(
        ofType(addTask),
        exhaustMap((action) => this.tasksService.post(action.task)
            .pipe(
                map((res) => {
                    const task: Task = {
                        title: action.task.title ?? '',
                        description: action.task.description ?? '',
                        isDone: false,
                        ssid: res.name
                    }

                    return {
                        type: ActionTypes.addTaskDone,
                        task: task
                    }
                }),
                catchError(() => of({type: ActionTypes.openErrorModal, message: 'Failed to add new task.'}))
            ))
    ));

    addTaskDone$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.addTaskDone),
        tap(() => this.router.navigate(['/']))
    ), {dispatch: false})

    editTask$ = createEffect(() => this.actions$.pipe(
        ofType(editTask),
        exhaustMap((action) => this.tasksService.update(action.task)
            .pipe(
                map((res) => {
                    const task: Task = {
                        title: res.title ?? action.task.title ?? '',
                        description: res.description ?? action.task.description ?? '',
                        isDone: res.isDone ?? action.task.isDone ?? false,
                        ssid: action.task.ssid ?? ''
                    }

                    return {
                        type: ActionTypes.editTaskDone,
                        task: task
                    }
                }),
                catchError(() => of({type: ActionTypes.openErrorModal, message: 'Failed to update task.'}))
            ))
    ));

    editTaskDone$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.editTaskDone),
        tap(() => this.router.navigate(['/']))
    ), {dispatch: false})

    constructor(
        private actions$: Actions,
        private tasksService: TasksService,
        private router: Router
    ) { }
}