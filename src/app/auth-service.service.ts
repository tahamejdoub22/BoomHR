import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private userRoles: string[];

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(`${baseUrl}users/login`, data);
  }

  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }
}
