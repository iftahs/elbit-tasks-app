import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task, TasksState } from 'src/app/models/task';

@Component({
  selector: 'app-tasks-widget',
  templateUrl: './tasks-widget.component.html',
  styleUrls: ['./tasks-widget.component.scss']
})
export class TasksWidgetComponent implements OnInit {

  tasks$: Observable<Task[]> = this.store.select(state => state.tasksReducer.tasks); 
  doneTasks: Task[] = [];
  notDoneTasks: Task[] = [];

  constructor(private store: Store<{tasksReducer: TasksState}>) {}

  ngOnInit(): void {
    this.tasks$.subscribe(data => {
      this.doneTasks = data.filter(task => task.isDone);
      this.notDoneTasks = data.filter(task => !task.isDone);
    });
  }

}
