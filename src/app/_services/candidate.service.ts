import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../hr-board/candidate';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = 'http://localhost:9090/candidas';
  private baseUrl = 'http://localhost:9090/statuscan';


  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get(this.apiUrl);
  }

  sendEmailToMeet(id: string): Observable<any> {
    const url = `${this.apiUrl}/send-email/${id}`;
    return this.http.post(url, {});
  }
  
  addCandidate(candidate): Observable<any>{
    // const { name,email,phone,address,skills,status} =candidate ;
    const url = `${this.apiUrl}/post`;

    return this.http.post(url,candidate);
  }

  updateCandidate(id: string, candidate: any) {

    const url =`${this.apiUrl}/${id}`;

    return this.http.put(url, candidate);
  }

  deleteCandidate(id: string): Observable<any> {
    const url =`${this.apiUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  sendEmail(id: string, date: string,selectedTime:string,  candidate: any) {
    const url = `${this.apiUrl}/send-email/${id}`;
    const body = { date,selectedTime };

    return this.http.post(url, body);
  }

  sendEmailAccept(id: string, candidate: any) {
    console.log("ID: ", id);
    console.log("Candidate: ", candidate);
    const url = `${this.apiUrl}/accept/${id}`;

    return this.http.put(url,candidate);
  }

  sendEmailReject(id: string, candidate: any) {
    const url = `${this.apiUrl}/reject/${id}`;

    return this.http.put(url,candidate);
  }

  updateCanStatusToAccepted(canId: string): Observable<any> {
    const url = `${this.baseUrl}/${canId}`;
    return this.http.post<any>(url, {});
  }

  getStatusIdByName(name: string): Observable<string> {
    console.log("name of status is "+ name)
    const url = `${this.baseUrl}/${name}`;
    return this.http.get<{ _id: string }>(url).pipe(map(res => res._id));
  }

  getStatusofCan(idCan: string): Observable<any> {
    const url = `${this.baseUrl}/${idCan}/can`;
    return this.http.get<any>(url, {});
}

}