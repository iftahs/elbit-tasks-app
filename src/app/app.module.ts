import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { HeaderComponent } from './ui/header/header.component';
import { tasksReducer } from './store/reducers/tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/effects/tasks.effect';
import { TasksWidgetComponent } from './components/tasks-widget/tasks-widget.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoTasksComponent } from './ui/no-tasks/no-tasks.component';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    TaskFormComponent,
    HeaderComponent,
    TasksWidgetComponent,
    NoTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ tasksReducer: tasksReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([TasksEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
