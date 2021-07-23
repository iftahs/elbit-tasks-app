import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { deleteTask } from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private store: Store, private router: Router) { }

  onDeleteClick() {
    this.store.dispatch(deleteTask({ssid: this.task.ssid}));
  }

  onEditClick() {
    this.router.navigate([`edit`, this.task.ssid])
  }

}
