import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
  import { UsersInfo } from './users-info';

@Injectable({
  providedIn: 'root'
})
export class IelcapiService {

  constructor(private http:HttpClient) {}

    // Registeredusers
    apiUrl='https://ielc-coreapi.azurewebsites.net/EnrollmentData';
    GetUsers(): Observable<UsersInfo[]> {
      return this.http.get<UsersInfo[]>(this.apiUrl);
    }
 

 


}
