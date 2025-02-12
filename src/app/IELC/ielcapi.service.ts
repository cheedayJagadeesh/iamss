import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
  import { UsersInfo } from './users-info';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IelcapiService {

  constructor(private http:HttpClient,private datepipe:DatePipe) {}

    // Registeredusers
    apiUrl='https://ielc-coreapi.azurewebsites.net/EnrollmentData';
    GetUsers(): Observable<UsersInfo[]> {
      return this.http.get<UsersInfo[]>(this.apiUrl);
    }

    apiskill='https://ielc-coreapi.azurewebsites.net/EnrollmentData/skillname'
    GetUsersBySkill(skillName: string): Observable<any> {
      return this.http.get<any>(`${this.apiskill}/${skillName}`);
    }

    apivenue="https://ielc-coreapi.azurewebsites.net/EnrollmentData/Venue"
    GetUsersByVenue(Venue: string): Observable<any> {
      return this.http.get<any>(`${this.apivenue}/${Venue}`);
    }

    apidate="https://ielc-coreapi.azurewebsites.net/EnrollmentData/Date"
    // GetUsersByDate(date: string): Observable<any> {
    //   return this.http.get<any>(`${this.apidate}/${date}`);
    // }
    getEnrollmentData(date: string) : Observable<any>{
      // Convert date from YYYY-MM-DD to DD-MM-YYYY using DatePipe
      const formattedDate = this.convertDateFormat(date);
      const url = `${this.apidate}/${formattedDate}`;
      
      return this.http.get(url);
    }
  
    private convertDateFormat(date: string): string {
      const parsedDate = new Date(date); // Convert string to Date object
      return this.datepipe.transform(parsedDate, 'dd-MM-yyyy') || date; // Format using DatePipe
    }

    apiTime="https://ielc-coreapi.azurewebsites.net/EnrollmentData/Time"
    GetUsersByTime(Time: string): Observable<any> {
      return this.http.get<any>(`${this.apiTime}/${Time}`);
    }  

    apiID='https://ielc-coreapi.azurewebsites.net/EnrollmentData'
    DeleteDataById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiID}/${id}`);
    }

}
