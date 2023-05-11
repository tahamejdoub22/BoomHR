import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../board-admin/user';

@Injectable({
  providedIn: 'root'
})
export class UserchangeService {

  private apiUrl = 'http://localhost:9090/users/admin/ChangeRoleTab';

  constructor(private http: HttpClient) { }

  createUser( user: any): Observable<User> {
    const { username,email,roles,password} =user ;

    return this.http.post<User>(`${this.apiUrl}/add`, { username, email,roles,password});
  }

  updateUser(id: string, user: any) {

    const url =`${this.apiUrl}/update/${id}`;

    return this.http.put(url, user);
  }

  
  deleteUser(id: string): Observable<any> {
    const url =`${this.apiUrl}/delete/${id}`;
    return this.http.delete(url);
  }

}


