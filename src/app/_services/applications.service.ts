import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private apiUrl = 'http://localhost:9090/applications';

  constructor(private http: HttpClient) { }

  getCandidatesByDepartment() : Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/candidates-by-department`);
  }
  getAllDepartments() {
    return this.http.get<any[]>(`${this.apiUrl}/departments`);
  }

  getVacanciesByDepartment() {
    return this.http.get<any[]>(`${this.apiUrl}/vacanciesByDepartement`);
  }
}
