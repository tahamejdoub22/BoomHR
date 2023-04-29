import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private EmployeUrl="http://localhost:9090/api/auth/emp"

  constructor(private http: HttpClient) { }

  getEmploye(id : number):Observable<any>{
    let parametres = new HttpParams();
    parametres = parametres.append('employe-id', id);
    return this.http.get(this.EmployeUrl+'/'+id);
  }

  getALLEmploye():Observable<any>{
    return this.http.get(this.EmployeUrl+'/');
  }
  saveEmploye(employe : Employe){
    return this.http.post(this.EmployeUrl+'/add',employe);
  }
  deleteEmploye(idEmploye : number){
    return this.http.delete(this.EmployeUrl+'/'+idEmploye);
  }

  modifyEmploye(idEmploye : number ,employe : Employe){
    return this.http.patch(this.EmployeUrl+'/'+idEmploye ,employe)
  }
}