import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://localhost:9090/users/admin/roles';

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get(this.apiUrl);
  }

 
}
