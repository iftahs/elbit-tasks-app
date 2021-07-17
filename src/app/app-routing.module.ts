import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksWidgetComponent } from './components/tasks-widget/tasks-widget.component';

const routes: Routes = [
  { path: '', component: TasksWidgetComponent },
  { path: 'edit', component: TaskFormComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
