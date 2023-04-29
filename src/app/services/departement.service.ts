import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private DepartementUrl="http://localhost:9090/api/auth/dep"

  constructor(private http: HttpClient) { }

  getDepartement(id:number):Observable<any>{
    let parametres = new HttpParams();
    parametres = parametres.append('Departement-id', id);
    return this.http.get(this.DepartementUrl+'/'+id);
  }

  getALLDepartement():Observable<any>{
    return this.http.get(this.DepartementUrl+'/');
  }
  saveDepartement(departement : Departement){
    return this.http.post(this.DepartementUrl+'/add',departement);
  }
  deleteDepartement(idDepartement : string ){
    return this.http.delete(this.DepartementUrl+'/'+idDepartement);
    
  }
  modifyDepartement(idDepartement : number ,departement : Departement){
    return this.http.put(this.DepartementUrl+'/'+idDepartement ,departement)
  }

}

