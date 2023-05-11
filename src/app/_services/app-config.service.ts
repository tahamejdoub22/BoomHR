import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;
  private http : HttpClient;

// Define configUpdate$ as a Subject
private configUpdateSource = new BehaviorSubject<any>(null);
configUpdate$ = this.configUpdateSource.asObservable();
  constructor(http: HttpClient) { 
    this.http = http;

  }

  // loadAppConfig() {
  //   return this.http.get('/assets/config/app-settings.json')
  //     .toPromise()
  //     .then(config => {
  //       this.appConfig = config;
  //     });
  // }

  public async loadAppConfig(): Promise<void> {
    const config = await this.http.get('http://localhost:9090/applications/candidates-by-department').toPromise();
    this.appConfig = config;
    // Emit the new config through configUpdate$
    this.configUpdateSource.next(this.appConfig);
  }


  public getAppConfig() {
    return this.appConfig;
  }
  get config(): any {
    return this.appConfig;
  }
  get apiBaseUrl() : string {
    return this.appConfig.apiBaseUrl;
  }
}

export interface AppConfig {
  dark: AppConfig;
  apiUrl: string;
  environment: string;
}