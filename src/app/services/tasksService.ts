import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = 'https://intuit-todo-app-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/todos.json`);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/todos/${id}.json`);
  }
}