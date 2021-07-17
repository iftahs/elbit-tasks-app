import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { TasksService } from "src/app/services/tasksService";
import { ActionTypes, deleteTask, deleteTaskDone, deleteTaskError } from "../actions/tasks.actions";;

@Injectable()
export class TasksEffects {

    fetchTasks$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.fetchTasks),
        mergeMap(() => this.tasksService.getAll()
            .pipe(
                map(tasks => {
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
                catchError(() => EMPTY)
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
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private tasksService: TasksService
    ) { }
}