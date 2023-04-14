import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9090/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:9090/users/admin/ChangeRoleTab';

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getHrManagerBoard(): Observable<any> {
    return this.http.get(API_URL + 'HrManager', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  }



