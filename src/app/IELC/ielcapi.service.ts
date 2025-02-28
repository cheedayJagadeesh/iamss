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
    GetSkillSessions(): Observable<any> {
      return this.http.get<any>(this.EnrolledskillsUrl);
    }

    GetSkillSessionById(id: string): Observable<any> {
      return this.http.get<any>(`${this.EnrolledskillsUrl}/${id}`);
    }
  
    PostEnrolledSessions(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.EnrolledskillsUrl, skillSessions);
    }

    UpdateSkillSession(id: string, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.EnrolledskillsUrl}/${id}`, updatedData);
    }
   
    DeleteskillsessionsById(id: number): Observable<void> {
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

   //---------------------------------------------------------------------------------------Inteq IT Support

    itsprtUrl='https://ielc-coreapi.azurewebsites.net/INTEQITSupport';
    GetItSprt(): Observable<any> {
      return this.http.get<any>(this.itsprtUrl);
    }

    itismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ITSupport';
    Getitismsgeneral(): Observable<any> {
      return this.http.get<any>(this.itismsgeneralUrl);
    }

    itismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ITSupportGuidelinessISMS';
    Getitismsguidelines(): Observable<any> {
      return this.http.get<any>(this.itismsguidelineUrl);
    }

    itismspolicyUrl='https://ielc-coreapi.azurewebsites.net/ITSupportPolicyISMS';
    Getitismspolicy(): Observable<any> {
      return this.http.get<any>(this.itismspolicyUrl);
    }

    itismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ITSupportProcedureISMS';
    Getitismsprocedure(): Observable<any> {
      return this.http.get<any>(this.itismsprocedureUrl);
    }

    itismsformatUrl='https://ielc-coreapi.azurewebsites.net/ITSupportFormatsISMS';
    Getitismsformat(): Observable<any> {
      return this.http.get<any>(this.itismsformatUrl);
    }

    itqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ITSupportGeneralQMS';
    Getitqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.itqmsgeneralUrl);
    }

    itqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ITSupportGuidelinessQMS';
    Getitqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.itqmsguidelineUrl);
    }

    itqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/ITSupportPolicyQMS';
    Getitqmspolicy(): Observable<any> {
      return this.http.get<any>(this.itqmspolicyUrl);
    }

    itqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ITSupportProcedureQMS';
    Getitqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.itqmsprocedureUrl);
    }

    itqmsformatUrl='https://ielc-coreapi.azurewebsites.net/ITSupportFormatsQMS';
    Getitqmsformat(): Observable<any> {
      return this.http.get<any>(this.itqmsformatUrl);
    }

     //---------------------------------------------------------------------------------------Inteq Admin/OS Support

     ossprtUrl='';
     GetosSprt(): Observable<any> {
       return this.http.get<any>(this.ossprtUrl);
     }
     
    osismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupport';
    Getosismsgeneral(): Observable<any> {
      return this.http.get<any>(this.osismsgeneralUrl);
    }

    osismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportGuidelinessISMS';
    Getosismsguidelines(): Observable<any> {
      return this.http.get<any>(this.osismsguidelineUrl);
    }

    osismspolicyUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportPolicyISMS';
    Getosismspolicy(): Observable<any> {
      return this.http.get<any>(this.osismspolicyUrl);
    }

    osismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportProcedureISMS';
    Getosismsprocedure(): Observable<any> {
      return this.http.get<any>(this.osismsprocedureUrl);
    }

    osismsformatUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportFormatsISMS';
    Getosismsformat(): Observable<any> {
      return this.http.get<any>(this.osismsformatUrl);
    }
    
    osqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportGeneralQMS';
    Getosqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.osqmsgeneralUrl);
    }

    osqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportGuidelinessQMS';
    Getosqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.osqmsguidelineUrl);
    }

    osqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportPolicyQMS';
    Getosqmspolicy(): Observable<any> {
      return this.http.get<any>(this.osqmspolicyUrl);
    }

    osqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportProcedureQMS';
    Getosqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.osqmsprocedureUrl);
    }

    osqmsformatUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportFormatsQMS';
    Getosqmsformat(): Observable<any> {
      return this.http.get<any>(this.osqmsformatUrl);
    }
     //---------------------------------------------------------------------------------------Inteq HR Support

     hrsprtUrl='https://ielc-coreapi.azurewebsites.net/HRHelpDesk';
     GetHrSprt(): Observable<any> {
       return this.http.get<any>(this.hrsprtUrl);
     }

    hrismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/HRSupport';
    Gethrismsgeneral(): Observable<any> {
      return this.http.get<any>(this.hrismsgeneralUrl);
    }

    hrismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/HRSupportGuidelinessISMS';
    Gethrismsguidelines(): Observable<any> {
      return this.http.get<any>(this.hrismsguidelineUrl);
    }

    hrismspolicyUrl='https://ielc-coreapi.azurewebsites.net/HRSupportPolicyISMS';
    Gethrismspolicy(): Observable<any> {
      return this.http.get<any>(this.hrismspolicyUrl);
    }

    hrismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/HRSupportProcedureISMS';
    Gethrismsprocedure(): Observable<any> {
      return this.http.get<any>(this.hrismsprocedureUrl);
    }

    hrismsformatUrl='https://ielc-coreapi.azurewebsites.net/HRSupportFormatsISMS';
    Gethrismsformat(): Observable<any> {
      return this.http.get<any>(this.hrismsformatUrl);
    }

    hrqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/HRSupportGeneralQMS';
    Gethrqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.hrqmsgeneralUrl);
    }

    hrqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/HRSupportGuidelinessQMS';
    Gethrqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.hrqmsguidelineUrl);
    }

    hrqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/HRSupportPolicyQMS';
    Gethrqmspolicy(): Observable<any> {
      return this.http.get<any>(this.hrqmspolicyUrl);
    }

    hrqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/HRSupportProcedureQMS';
    Gethrqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.hrqmsprocedureUrl);
    }

    hrqmsformatUrl='https://ielc-coreapi.azurewebsites.net/HRSupportFormatsQMS';
    Gethrqmsformat(): Observable<any> {
      return this.http.get<any>(this.hrqmsformatUrl);
    }

  //---------------------------------------------------------------------------------------Inteq Project Support

    prjtsprtUrl='';
    GetprjtSprt(): Observable<any> {
     return this.http.get<any>(this.prjtsprtUrl);
    }

    prjtismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupport';
    Getprjtismsgeneral(): Observable<any> {
      return this.http.get<any>(this.prjtismsgeneralUrl);
    }

    prjtismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportGuidelinessISMS';
    Getprjtismsguidelines(): Observable<any> {
      return this.http.get<any>(this.prjtismsguidelineUrl);
    }

    prjtismspolicyUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportPolicyISMS';
    Getprjtismspolicy(): Observable<any> {
      return this.http.get<any>(this.prjtismspolicyUrl);
    }

    prjtismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportProcedureISMS';
    Getprjtismsprocedure(): Observable<any> {
      return this.http.get<any>(this.prjtismsprocedureUrl);
    }

    prjtismsformatUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportFormatsISMS';
    Getprjtismsformat(): Observable<any> {
      return this.http.get<any>(this.prjtismsformatUrl);
    }

    prjtqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportGeneralQMS';
    Getprjtqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.prjtqmsgeneralUrl);
    }

    prjtqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportGuidelinessQMS';
    Getprjtqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.prjtqmsguidelineUrl);
    }

    prjtqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportPolicyQMS';
    Getprjtqmspolicy(): Observable<any> {
      return this.http.get<any>(this.prjtqmspolicyUrl);
    }

    prjtqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportProcedureQMS';
    Getprjtqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.prjtqmsprocedureUrl);
    }

    prjtqmsformatUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportFormatsQMS';
    Getprjtqmsformat(): Observable<any> {
      return this.http.get<any>(this.prjtqmsformatUrl);
    }
}
