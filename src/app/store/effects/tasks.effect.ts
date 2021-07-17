import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { TasksService } from "src/app/services/tasksService";
import { ActionTypes } from "../actions/tasks.actions";
import { Task } from "src/app/models/task";

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
    )
    );

    constructor(
        private actions$: Actions,
        private tasksService: TasksService
    ) { }
}