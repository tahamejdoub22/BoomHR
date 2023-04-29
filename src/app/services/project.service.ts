import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private ProjectUrl="http://localhost:9090/api/project"
  
 
  constructor(private http: HttpClient) { }

  getProject(id:number):Observable<any>{
    let parametres = new HttpParams();
    parametres = parametres.append('Project-id', id);
    return this.http.get(this.ProjectUrl+'/'+id);
  }

  getALLProject():Observable<any>{
    return this.http.get(this.ProjectUrl+'/all');
  }
  saveProject(project : Project){
    return this.http.post(this.ProjectUrl+'/create',project);
  }
  deleteProject(idProject : number ){
    return this.http.delete(this.ProjectUrl+'/'+idProject);
    
  }
  modifyProject(idProject : number, project : Project){
    return this.http.put(this.ProjectUrl+'/'+idProject,project);
  }

}

