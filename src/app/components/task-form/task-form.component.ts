import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task, TasksState } from 'src/app/models/task';
import { addTask, editTask } from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  editMode = false;
  ssid?: string;
  isLoading$ = this.store.select(state => state.tasksReducer.isLoading);;

  constructor(private fb: FormBuilder, private store: Store<{ tasksReducer: TasksState }>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.select(state => state.tasksReducer.tasks).subscribe(tasks => {
          const task = tasks.find(task => task.ssid === params['id']);
          this.form.get('title')?.setValue(task?.title);
          this.form.get('description')?.setValue(task?.description);
          this.ssid = task?.ssid;
          if (task) {
            this.editMode = true;
          }
        })
      }
    });
  }

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  })

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(!this.editMode ? addTask({
        task: {
          title: this.form.get('title')?.value,
          description: this.form.get('description')?.value
        }
      }) : editTask({
        task: {
          title: this.form.get('title')?.value,
          description: this.form.get('description')?.value,
          ssid: this.ssid
        }
      }));
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

}
