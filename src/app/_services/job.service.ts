import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:9090/jobs';
  private baseUrl = 'http://localhost:9090/status';


  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get(this.apiUrl);
  }

  getJobById(jobId: string): Observable<any> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.get<any>(url);
  }

  addJob(job): Observable<any>{
    // const { name,email,phone,address,skills,status} =candidate ;
    const url = `${this.apiUrl}/post`;

    return this.http.post(url,job);
  }

  updateJob(id: string, job: any) {

    const url =`${this.apiUrl}/${id}`;

    return this.http.put(url, job);
  }

  deleteJob(id: string): Observable<any> {
    const url =`${this.apiUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  getCanJob(id: string) {

    const url =`${this.apiUrl}/${id}/candidates`;

    return this.http.get(url);
  }

  
  getTOPCanJob(id: string) {

    const url =`${this.apiUrl}/${id}/top-10-candidates`;

    return this.http.get(url);
  }
  
  getJobsByStatus(statusId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/jobs-by-status/${statusId}`);
  }
  

  updateJobStatusToClosed(jobId: string): Observable<any> {
    const url = `${this.baseUrl}/${jobId}`;
    return this.http.post<any>(url, {});
  }

  getStatusIdByName(name: string): Observable<string> {
    console.log("name of status is "+ name)
    const url = `${this.baseUrl}/${name}`;
    return this.http.get<{ _id: string }>(url).pipe(map(res => res._id));
  }

  /*
  .pipe() est une méthode utilisée dans les Observables de RxJS pour chaîner des opérations qui seront exécutées sur les données émises par l'Observable.

Dans cet exemple, l'opération de chaîne .pipe() est utilisée pour appliquer une transformation sur les données émises. Cette transformation est réalisée en utilisant la méthode map() qui est une méthode de transformation d'Observables dans RxJS.

Dans ce cas précis, map(res => res._id) signifie que pour chaque émission de l'Observable, nous récupérons la propriété _id de l'objet émis. Cela permet de transformer l'objet émis en une simple chaîne de caractères correspondant à la valeur de la propriété _id.*/
}
