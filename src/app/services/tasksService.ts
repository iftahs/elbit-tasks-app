import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TasksResponse } from "../models/task";

@Injectable({
    providedIn: 'root'
  })
  export class TasksService {
    baseUrl = 'https://intuit-todo-app-default-rtdb.europe-west1.firebasedatabase.app';

    constructor (private http: HttpClient) {}

  
    getAll(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/todos.json`);
    }
  }