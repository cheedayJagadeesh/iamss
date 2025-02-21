import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
  import { UsersInfo } from './users-info';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { RegisteredusersComponent } from './registeredusers/registeredusers.component';

@Injectable({
  providedIn: 'root'
})
export class IelcapiService {

  constructor(private http:HttpClient,private datepipe:DatePipe) {}

    //---------------------------------------------------------------------------------------- Registeredusers
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

    //apidate="https://ielc-coreapi.azurewebsites.net/EnrollmentData/StartDate"
    GetUsersByDate(date: string): Observable<any> {
      // Convert input date to DD-MM-YYYY format
      const formattedDate = this.convertDateFormat(date);
      const url = `https://ielc-coreapi.azurewebsites.net/EnrollmentData/StartDate/${formattedDate}`;
    
      return this.http.get(url).pipe(
        map((response: any) => {
          return response.filter((user: any) => {
            // Ensure the date range is in the expected format "DD-MM-YYYY to DD-MM-YYYY"
            if (user.date && user.date.includes(" to ")) {
              const startDate = user.date.split(" to ")[0].trim(); // Extract start date
              const formattedStartDate = this.convertDateFormatForComparison(startDate); // Convert start date to YYYY-MM-DD for comparison
              return formattedStartDate === formattedDate; // Compare both dates
            }
            return false;
          });
        })
      );
    }
    
    // Convert input date to DD-MM-YYYY format
    convertDateFormat(dateString: string): string {
      const parts = dateString.split('-');
      if (parts.length !== 3) return ''; // Handle invalid cases
      const [day, month, year] = parts;
      return `${day}-${month}-${year}`; // Return "DD-MM-YYYY"
    }
    
    // Convert DD-MM-YYYY to YYYY-MM-DD format for comparison
    convertDateFormatForComparison(dateString: string): string {
      const parts = dateString.split('-');
      if (parts.length !== 3) return ''; // Handle invalid cases
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`; // Return "YYYY-MM-DD"
    }

    
    apiTime="https://ielc-coreapi.azurewebsites.net/EnrollmentData/Time"
    GetUsersByTime(Time: string): Observable<any> {
      return this.http.get<any>(`${this.apiTime}/${Time}`);
    }  

    apiID='https://ielc-coreapi.azurewebsites.net/EnrollmentData'
    DeleteDataById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiID}/${id}`);
    }

    //---------------------------------------------------------------------------------------Add New Skills

    EnrolledskillsUrl='https://ielc-coreapi.azurewebsites.net/EnrollmentSessions';
    GetSkills(): Observable<any> {
      return this.http.get<any>(this.EnrolledskillsUrl);
    }

    PostEnrolledSessions(skillData: any): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.EnrolledskillsUrl, skillData, {headers});
    }
   
    DeleteskillById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.EnrolledskillsUrl}/${id}`);
    }

    EnrolledskillDataUrl='https://ielc-coreapi.azurewebsites.net/EnrollmentSkillData';
    GetEnrolledSkills(): Observable<any> {
      return this.http.get<any>(this.EnrolledskillDataUrl);
    }

    PostEnrolledSkill(skillData: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.EnrolledskillDataUrl, skillData);
    }

    // DeleteEnrolledSkill(skillName: string[]): Observable<void> {
    //   return this.http.delete<void>(`${this.EnrolledskillDataUrl}/${skillName}`);
    // }
    DeleteEnrolledSkill(skillNames: string[]): Observable<any> {
      const queryParams = skillNames.join(',');
      return this.http.delete(`${this.EnrolledskillDataUrl}/${queryParams}`);
    }

    AadUsersUrl='https://ielc-coreapi.azurewebsites.net/AADUsersData'
    GetAadUserslist(): Observable<any> {
      return this.http.get<any>(this.AadUsersUrl);
    }

    AadUGroupUrl='https://ielc-coreapi.azurewebsites.net/AADGroupMails'
    GetAadUserGroupslist(): Observable<any> {
      return this.http.get<any>(this.AadUGroupUrl);
    }


}
