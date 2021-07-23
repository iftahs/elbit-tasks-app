import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Task } from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = 'https://intuit-todo-app-default-rtdb.europe-west1.firebasedatabase.app/todos';

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}.json`);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}.json`);
  }

  post(task: Partial<Task>): Observable<{name: string}> {
    return this.http.post<{name: string}>(`${this.baseUrl}.json`, task);
  }

  update(task: Partial<Task>): Observable<Partial<Task>> {
    console.log(task);
    return this.http.patch<Partial<Task>>(`${this.baseUrl}/${task.ssid}/.json`, task);
  }
}