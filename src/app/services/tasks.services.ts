import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private TaskUrl="http://localhost:9090/api/tasks" ;
  private TaskUrl1= "http://localhost:9090/api/projects";

  constructor(private http: HttpClient) { }

  getTask(id:number):Observable<any>{
    let parametres = new HttpParams();
    parametres = parametres.append('Task-id', id);
    return this.http.get(this.TaskUrl+'/'+id);
  }

  getALLTask():Observable<any>{
    return this.http.get(this.TaskUrl+'/');
  }
  saveTask(task : Task){
    return this.http.post(this.TaskUrl+'/add',task);
  }
  deleteTask(idTask : string ){
    return this.http.delete(this.TaskUrl+'/'+idTask);
    
  }
  modifyTask(idTask : number ,task : Task){
    return this.http.put(this.TaskUrl+'/'+idTask ,task)
  }
  getTaskByProject(id:number):Observable<any>{
    let parametres = new HttpParams();
    parametres = parametres.append('Task-id', id);
    return this.http.get(this.TaskUrl1+'/'+id+'/tasks');
  }

}

