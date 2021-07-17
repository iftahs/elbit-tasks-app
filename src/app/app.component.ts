import { Component, OnInit } from '@angular/core';
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

  tasks$: Observable<Task[]> = this.store.select(state => state.tasksReducer.tasks);
  isLoading$: Observable<boolean> = this.store.select(state => state.tasksReducer.isLoading);

  doneTasks: Task[] = [];
  notDoneTasks: Task[] = [];
  isLoading = true;

  ngOnInit() {
    this.tasks$.subscribe(data => {
      this.doneTasks = data.filter(task => task.isDone);
      this.notDoneTasks = data.filter(task => !task.isDone);
    });
    this.isLoading$.subscribe(data => this.isLoading = data);

    this.store.dispatch({ type: ActionTypes.fetchTasks });
  }


}
