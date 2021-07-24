import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task, TasksState } from './models/task';
import { ActionTypes } from './store/actions/tasks.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{tasksReducer: TasksState}>) {}

  isLoading$: Observable<boolean> = this.store.select(state => state.tasksReducer.isLoading);
  error$: Observable<string | undefined> = this.store.select(state => state.tasksReducer.error);

  ngOnInit() {
    this.store.dispatch({ type: ActionTypes.fetchTasks });
  }
}
