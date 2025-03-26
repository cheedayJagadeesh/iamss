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
    apistatus='https://ielc-coreapi.azurewebsites.net/EnrollmentData/Status'
    GetUsersByStatus(data: string): Observable<any> {
      return this.http.get<any>(`${this.apistatus}/${data}`);
    }
    apimail='https://ielc-coreapi.azurewebsites.net/EnrollmentData/Mail'
    GetUsersByEmail(data: string): Observable<any> {
      return this.http.get<any>(`${this.apimail}/${data}`);
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

    PostITSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itsprtUrl, skillSessions);
    }

    GetITSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itsprtUrl}/${id}`);
    }

    UpdateITSprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itsprtUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteITSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itsprtUrl}/${id}`);
    }

    itismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ITSupport';
    Getitismsgeneral(): Observable<any> {
      return this.http.get<any>(this.itismsgeneralUrl);
    }
    Postitismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsgeneralUrl, data);
    }

    GetitismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsgeneralUrl}/${id}`);
    }

    Updateitismsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itismsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsgeneralUrl}/${id}`);
    }

    itismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ITSupportGuidelinessISMS';
    Getitismsguidelines(): Observable<any> {
      return this.http.get<any>(this.itismsguidelineUrl);
    }
    Postitismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsguidelineUrl, data);
    }

    GetitismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsguidelineUrl}/${id}`);
    }

    Updateitismsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itismsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsguidelineUrl}/${id}`);
    }

    itismspolicyUrl='https://ielc-coreapi.azurewebsites.net/ITSupportPolicyISMS';
    Getitismspolicy(): Observable<any> {
      return this.http.get<any>(this.itismspolicyUrl);
    }
    Postitismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismspolicyUrl, data);
    }

    GetitismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismspolicyUrl}/${id}`);
    }

    Updateitismspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itismspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismspolicyUrl}/${id}`);
    }

    itismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ITSupportProcedureISMS';
    Getitismsprocedure(): Observable<any> {
      return this.http.get<any>(this.itismsprocedureUrl);
    }
    Postitismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsprocedureUrl, data);
    }

    GetitismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsprocedureUrl}/${id}`);
    }

    Updateitismsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itismsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsprocedureUrl}/${id}`);
    }

    itismsformatUrl='https://ielc-coreapi.azurewebsites.net/ITSupportFormatsISMS';
    Getitismsformat(): Observable<any> {
      return this.http.get<any>(this.itismsformatUrl);
    }
    Postitismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsformatUrl, data);
    }

    GetitismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsformatUrl}/${id}`);
    }

    Updateitismsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itismsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsformatUrl}/${id}`);
    }

    itqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ITSupportGeneralQMS';
    Getitqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.itqmsgeneralUrl);
    }
    Postitqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsgeneralUrl, data);
    }

    GetitqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsgeneralUrl}/${id}`);
    }

    Updateitqmsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itqmsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsgeneralUrl}/${id}`);
    }

    itqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ITSupportGuidelinessQMS';
    Getitqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.itqmsguidelineUrl);
    }
    
    Postitqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsguidelineUrl, data);
    }

    GetitqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsguidelineUrl}/${id}`);
    }

    Updateitqmsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itqmsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsguidelineUrl}/${id}`);
    }

    itqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/ITSupportPolicyQMS';
    Getitqmspolicy(): Observable<any> {
      return this.http.get<any>(this.itqmspolicyUrl);
    }
    Postitqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmspolicyUrl, data);
    }

    GetitqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmspolicyUrl}/${id}`);
    }

    Updateitqmspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itqmspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmspolicyUrl}/${id}`);
    }

    itqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ITSupportProcedureQMS';
    Getitqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.itqmsprocedureUrl);
    }
    
    Postitqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsprocedureUrl, data);
    }

    GetitqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsprocedureUrl}/${id}`);
    }

    Updateitqmsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itqmsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsprocedureUrl}/${id}`);
    }


    itqmsformatUrl='https://ielc-coreapi.azurewebsites.net/ITSupportFormatsQMS';
    Getitqmsformat(): Observable<any> {
      return this.http.get<any>(this.itqmsformatUrl);
    }
    
    Postitqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsformatUrl, data);
    }

    GetitqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsformatUrl}/${id}`);
    }

    Updateitqmsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.itqmsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteitqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsformatUrl}/${id}`);
    }

     //---------------------------------------------------------------------------------------Inteq Admin/OS Support

     ossprtUrl='https://ielc-coreapi.azurewebsites.net/AdminHelpDesk';
     GetosSprt(): Observable<any> {
       return this.http.get<any>(this.ossprtUrl);
     }

     PostOsSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ossprtUrl, skillSessions);
    }

    GetOsSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ossprtUrl}/${id}`);
    }

    UpdateOsSprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.ossprtUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteOsSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ossprtUrl}/${id}`);
    }

    osismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupport';
    Getosismsgeneral(): Observable<any> {
      return this.http.get<any>(this.osismsgeneralUrl);
    }
    Postosismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsgeneralUrl, data);
    }

    GetosismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsgeneralUrl}/${id}`);
    }

    Updateosismsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osismsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsgeneralUrl}/${id}`);
    }

    osismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportGuidelinessISMS';
    Getosismsguidelines(): Observable<any> {
      return this.http.get<any>(this.osismsguidelineUrl);
    }
    Postosismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsguidelineUrl, data);
    }

    GetosismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsguidelineUrl}/${id}`);
    }

    Updateosismsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osismsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsguidelineUrl}/${id}`);
    }

    osismspolicyUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportPolicyISMS';
    Getosismspolicy(): Observable<any> {
      return this.http.get<any>(this.osismspolicyUrl);
    }
    Postosismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismspolicyUrl, data);
    }

    GetosismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismspolicyUrl}/${id}`);
    }

    Updateosismspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osismspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismspolicyUrl}/${id}`);
    }

    osismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportProcedureISMS';
    Getosismsprocedure(): Observable<any> {
      return this.http.get<any>(this.osismsprocedureUrl);
    }
    Postosismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsprocedureUrl, data);
    }

    GetosismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsprocedureUrl}/${id}`);
    }

    Updateosismsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osismsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsprocedureUrl}/${id}`);
    }

    osismsformatUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportFormatsISMS';
    Getosismsformat(): Observable<any> {
      return this.http.get<any>(this.osismsformatUrl);
    }
    Postosismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsformatUrl, data);
    }

    GetosismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsformatUrl}/${id}`);
    }

    Updateosismsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osismsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsformatUrl}/${id}`);
    }
    
    osqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportGeneralQMS';
    Getosqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.osqmsgeneralUrl);
    }
    
    Postosqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsgeneralUrl, data);
    }

    GetosqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsgeneralUrl}/${id}`);
    }

    Updateosqmsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osqmsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsgeneralUrl}/${id}`);
    }

    osqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportGuidelinessQMS';
    Getosqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.osqmsguidelineUrl);
    }
    
    Postosqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsguidelineUrl, data);
    }

    GetosqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsguidelineUrl}/${id}`);
    }

    Updateosqmsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osqmsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsguidelineUrl}/${id}`);
    }


    osqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportPolicyQMS';
    Getosqmspolicy(): Observable<any> {
      return this.http.get<any>(this.osqmspolicyUrl);
    }
    
    Postosqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmspolicyUrl, data);
    }

    GetosqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmspolicyUrl}/${id}`);
    }

    Updateosqmspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osqmspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmspolicyUrl}/${id}`);
    }

    osqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportProcedureQMS';
    Getosqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.osqmsprocedureUrl);
    }
    
    Postosqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsprocedureUrl, data);
    }

    GetosqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsprocedureUrl}/${id}`);
    }

    Updateosqmsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osqmsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsprocedureUrl}/${id}`);
    }

    osqmsformatUrl='https://ielc-coreapi.azurewebsites.net/OperationsSupportFormatsQMS';
    Getosqmsformat(): Observable<any> {
      return this.http.get<any>(this.osqmsformatUrl);
    }
    
    Postosqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsformatUrl, data);
    }

    GetosqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsformatUrl}/${id}`);
    }

    Updateosqmsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.osqmsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteosqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsformatUrl}/${id}`);
    }
     //---------------------------------------------------------------------------------------Inteq HR Support

     hrsprtUrl='https://ielc-coreapi.azurewebsites.net/HRHelpDesk';
     GetHrSprt(): Observable<any> {
       return this.http.get<any>(this.hrsprtUrl);
     }

     PostHrSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrsprtUrl, skillSessions);
    }

    GetHrSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrsprtUrl}/${id}`);
    }

    UpdateHrSprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrsprtUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrsprtUrl}/${id}`);
    }

    hrismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/HRSupport';
    Gethrismsgeneral(): Observable<any> {
      return this.http.get<any>(this.hrismsgeneralUrl);
    }

    PostHrismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsgeneralUrl, data);
    }

    GetHrismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsgeneralUrl}/${id}`);
    }

    UpdateHrismsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrismsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsgeneralUrl}/${id}`);
    }

    hrismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/HRSupportGuidelinessISMS';
    Gethrismsguidelines(): Observable<any> {
      return this.http.get<any>(this.hrismsguidelineUrl);
    }
    PostHrismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsguidelineUrl, data);
    }

    GetHrismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsguidelineUrl}/${id}`);
    }

    UpdateHrismsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrismsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsguidelineUrl}/${id}`);
    }

    hrismspolicyUrl='https://ielc-coreapi.azurewebsites.net/HRSupportPolicyISMS';
    Gethrismspolicy(): Observable<any> {
      return this.http.get<any>(this.hrismspolicyUrl);
    }
    PostHrismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismspolicyUrl, data);
    }

    GetHrismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismspolicyUrl}/${id}`);
    }

    UpdateHrismspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrismspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismspolicyUrl}/${id}`);
    }

    hrismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/HRSupportProcedureISMS';
    Gethrismsprocedure(): Observable<any> {
      return this.http.get<any>(this.hrismsprocedureUrl);
    }
    PostHrismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsprocedureUrl, data);
    }

    GetHrismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsprocedureUrl}/${id}`);
    }

    UpdateHrismsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrismsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsprocedureUrl}/${id}`);
    }

    hrismsformatUrl='https://ielc-coreapi.azurewebsites.net/HRSupportFormatsISMS';
    Gethrismsformat(): Observable<any> {
      return this.http.get<any>(this.hrismsformatUrl);
    }
    PostHrismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsformatUrl, data);
    }

    GetHrismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsformatUrl}/${id}`);
    }

    UpdateHrismsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrismsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsformatUrl}/${id}`);
    }

    hrqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/HRSupportGeneralQMS';
    Gethrqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.hrqmsgeneralUrl);
    }

    PostHrqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsgeneralUrl, data);
    }

    GetHrqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsgeneralUrl}/${id}`);
    }

    UpdateHrqmsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrqmsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsgeneralUrl}/${id}`);
    }

    hrqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/HRSupportGuidelinessQMS';
    Gethrqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.hrqmsguidelineUrl);
    }
    
    PostHrqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsguidelineUrl, data);
    }

    GetHrqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsguidelineUrl}/${id}`);
    }

    UpdateHrqmsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrqmsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsguidelineUrl}/${id}`);
    }


    hrqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/HRSupportPolicyQMS';
    Gethrqmspolicy(): Observable<any> {
      return this.http.get<any>(this.hrqmspolicyUrl);
    }
    
    PostHrqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmspolicyUrl, data);
    }

    GetHrqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmspolicyUrl}/${id}`);
    }

    UpdateHrqmspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrqmspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmspolicyUrl}/${id}`);
    }

    hrqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/HRSupportProcedureQMS';
    Gethrqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.hrqmsprocedureUrl);
    }

    PostHrqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsprocedureUrl, data);
    }

    GetHrqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsprocedureUrl}/${id}`);
    }

    UpdateHrqmsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrqmsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsprocedureUrl}/${id}`);
    }

    hrqmsformatUrl='https://ielc-coreapi.azurewebsites.net/HRSupportFormatsQMS';
    Gethrqmsformat(): Observable<any> {
      return this.http.get<any>(this.hrqmsformatUrl);
    }
    
    PostHrqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsformatUrl, data);
    }

    GetHrqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsformatUrl}/${id}`);
    }

    UpdateHrqmsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hrqmsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteHrqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsformatUrl}/${id}`);
    }

  //---------------------------------------------------------------------------------------Inteq Project Support

    prjtsprtUrl='https://ielc-coreapi.azurewebsites.net/ProjectsList';
    GetprjtSprt(): Observable<any> {
     return this.http.get<any>(this.prjtsprtUrl);
    }

    prjtismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupport';
    Getprjtismsgeneral(): Observable<any> {
      return this.http.get<any>(this.prjtismsgeneralUrl);
    }
    Postprjtismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsgeneralUrl, data);
    }

    GetprjtismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsgeneralUrl}/${id}`);
    }

    Updateprjtismsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtismsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsgeneralUrl}/${id}`);
    }

    prjtismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportGuidelinessISMS';
    Getprjtismsguidelines(): Observable<any> {
      return this.http.get<any>(this.prjtismsguidelineUrl);
    }
    
    Postprjtismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsguidelineUrl, data);
    }

    GetprjtismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsguidelineUrl}/${id}`);
    }

    Updateprjtismsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtismsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsguidelineUrl}/${id}`);
    }

    prjtismspolicyUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportPolicyISMS';
    Getprjtismspolicy(): Observable<any> {
      return this.http.get<any>(this.prjtismspolicyUrl);
    }
    
    Postprjtismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismspolicyUrl, data);
    }

    GetprjtismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismspolicyUrl}/${id}`);
    }

    Updateprjtismspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtismspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismspolicyUrl}/${id}`);
    }

    prjtismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportProcedureISMS';
    Getprjtismsprocedure(): Observable<any> {
      return this.http.get<any>(this.prjtismsprocedureUrl);
    }
    
    Postprjtismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsprocedureUrl, data);
    }

    GetprjtismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsprocedureUrl}/${id}`);
    }

    Updateprjtismsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtismsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsprocedureUrl}/${id}`);
    }

    prjtismsformatUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportFormatsISMS';
    Getprjtismsformat(): Observable<any> {
      return this.http.get<any>(this.prjtismsformatUrl);
    }
    
    Postprjtismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsformatUrl, data);
    }

    GetprjtismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsformatUrl}/${id}`);
    }

    Updateprjtismsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtismsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsformatUrl}/${id}`);
    }

    prjtqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportGeneralQMS';
    Getprjtqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.prjtqmsgeneralUrl);
    }
    
    Postprjtqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsgeneralUrl, data);
    }

    GetprjtqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsgeneralUrl}/${id}`);
    }

    Updateprjtqmsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtqmsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsgeneralUrl}/${id}`);
    }

    prjtqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportGuidelinessQMS';
    Getprjtqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.prjtqmsguidelineUrl);
    }
    
    Postprjtqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsguidelineUrl, data);
    }

    GetprjtqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsguidelineUrl}/${id}`);
    }

    Updateprjtqmsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtqmsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsguidelineUrl}/${id}`);
    }


    prjtqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportPolicyQMS';
    Getprjtqmspolicy(): Observable<any> {
      return this.http.get<any>(this.prjtqmspolicyUrl);
    }
    
    Postprjtqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmspolicyUrl, data);
    }

    GetprjtqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmspolicyUrl}/${id}`);
    }

    Updateprjtqmspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtqmspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmspolicyUrl}/${id}`);
    }

    prjtqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportProcedureQMS';
    Getprjtqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.prjtqmsprocedureUrl);
    }
    Postprjtqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsprocedureUrl, data);
    }

    GetprjtqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsprocedureUrl}/${id}`);
    }

    Updateprjtqmsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtqmsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsprocedureUrl}/${id}`);
    }

    prjtqmsformatUrl='https://ielc-coreapi.azurewebsites.net/ProjectsSupportFormatsQMS';
    Getprjtqmsformat(): Observable<any> {
      return this.http.get<any>(this.prjtqmsformatUrl);
    }
    
    Postprjtqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsformatUrl, data);
    }

    GetprjtqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsformatUrl}/${id}`);
    }

    Updateprjtqmsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.prjtqmsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteprjtqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsformatUrl}/${id}`);
    }

//---------------------------------------------------------------------------------------Inteq Emergency Support
  
    emersprtUrl='https://ielc-coreapi.azurewebsites.net/EmergencyContactList';
    GetemerSprt(): Observable<any> {
     return this.http.get<any>(this.emersprtUrl);
    }
    
    PostEmerSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.emersprtUrl, skillSessions);
    }

    GetEmerSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.emersprtUrl}/${id}`);
    }

    UpdateEmerSprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.emersprtUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteEmerSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.emersprtUrl}/${id}`);
    }

    emergeneralUrl='https://ielc-coreapi.azurewebsites.net/Emergency';
    Getemergeneral(): Observable<any> {
      return this.http.get<any>(this.emergeneralUrl);
    }
    Postemergeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.emergeneralUrl, data);
    }

    GetemergeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.emergeneralUrl}/${id}`);
    }

    Updateemergeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.emergeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteemergeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.emergeneralUrl}/${id}`);
    }
   
//---------------------------------------------------------------------------------------Inteq Various committees Support  
     
    varcmtsUrl='https://ielc-coreapi.azurewebsites.net/VariousCommittees';
    Getvarcmt(): Observable<any> {
     return this.http.get<any>(this.varcmtsUrl);
    }
    
    Postvarcmt(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.varcmtsUrl, data);
    }

    GetvarcmtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.varcmtsUrl}/${id}`);
    }

    Updatevarcmt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.varcmtsUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletevarcmtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.varcmtsUrl}/${id}`);
    }
//---------------------------------------------------------------------------------------Inteq ISO 27001

    iso27001Url='https://ielc-coreapi.azurewebsites.net/ISO27001';
    Getiso27001(): Observable<any> {
     return this.http.get<any>(this.iso27001Url);
    }

    PostIso27001Sprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.iso27001Url, skillSessions);
    }

    GetIso27001SprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.iso27001Url}/${id}`);
    }

    UpdateIso27001Sprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.iso27001Url}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteIso27001SprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.iso27001Url}/${id}`);
    }

    ismsinfoUrl='https://ielc-coreapi.azurewebsites.net/ISMSSupport';
    Getismsinfo(): Observable<any> {
     return this.http.get<any>(this.ismsinfoUrl);
    }

    PostIsmsSprt(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ismsinfoUrl, data);
    }

    GetIsmsSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ismsinfoUrl}/${id}`);
    }

    UpdateIsmsSprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.ismsinfoUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteIsmsSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ismsinfoUrl}/${id}`);
    }

    isosprtUrl='https://ielc-coreapi.azurewebsites.net/ISOSupport';
    Getisosprt(): Observable<any> {
     return this.http.get<any>(this.isosprtUrl);
    }
    
    Postisosprt(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.isosprtUrl, data);
    }

    GetisosprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.isosprtUrl}/${id}`);
    }

    Updateisosprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.isosprtUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteisosprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.isosprtUrl}/${id}`);
    }

    ispolicyUrl='https://ielc-coreapi.azurewebsites.net/ISPolicy';
    Getispolicy(): Observable<any> {
     return this.http.get<any>(this.ispolicyUrl);
    }
    
    Postispolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ispolicyUrl, data);
    }

    GetispolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ispolicyUrl}/${id}`);
    }

    Updateispolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.ispolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteispolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ispolicyUrl}/${id}`);
    }

//---------------------------------------------------------------------------------------Inteq ISO 9001
    
    iso9001Url='https://ielc-coreapi.azurewebsites.net/ISO9001';
    Getiso9001(): Observable<any> {
     return this.http.get<any>(this.iso9001Url);
    }

    PostIso9001Sprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.iso9001Url, skillSessions);
    }

    GetIso9001SprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.iso9001Url}/${id}`);
    }

    UpdateIso9001Sprt(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.iso9001Url}/${id}`, updatedData,{ observe: 'response' });
    }

    DeleteIso9001SprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.iso9001Url}/${id}`);
    }

    isoinfoUrl='https://ielc-coreapi.azurewebsites.net/ISOSupport';
    Getisoinfo(): Observable<any> {
     return this.http.get<any>(this.isoinfoUrl);
    }

//---------------------------------------------------------------------------------------CISO Support

    cisoismsgeneralUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_Support';
    Getcisoismsgeneral(): Observable<any> {
      return this.http.get<any>(this.cisoismsgeneralUrl);
    }
    Postcisoismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsgeneralUrl, data);
    }

    GetcisoismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsgeneralUrl}/${id}`);
    }

    Updatecisoismsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoismsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsgeneralUrl}/${id}`);
    }

    cisoismsguidelineUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportGuidelinessISMS';
    Getcisoismsguidelines(): Observable<any> {
      return this.http.get<any>(this.cisoismsguidelineUrl);
    }
    Postcisoismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsguidelineUrl, data);
    }

    GetcisoismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsguidelineUrl}/${id}`);
    }

    Updatecisoismsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoismsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsguidelineUrl}/${id}`);
    }

    cisoismspolicyUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportPolicyISMS';
    Getcisoismspolicy(): Observable<any> {
      return this.http.get<any>(this.cisoismspolicyUrl);
    }
    Postcisoismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismspolicyUrl, data);
    }

    GetcisoismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismspolicyUrl}/${id}`);
    }

    Updatecisoismspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoismspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismspolicyUrl}/${id}`);
    }

    cisoismsprocedureUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportProcedureISMS';
    Getcisoismsprocedure(): Observable<any> {
      return this.http.get<any>(this.cisoismsprocedureUrl);
    }
    Postcisoismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsprocedureUrl, data);
    }

    GetcisoismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsprocedureUrl}/${id}`);
    }

    Updatecisoismsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoismsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsprocedureUrl}/${id}`);
    }

    cisoismsformatUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportFormatsISMS';
    Getcisoismsformat(): Observable<any> {
      return this.http.get<any>(this.cisoismsformatUrl);
    }
    Postcisoismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsformatUrl, data);
    }

    GetcisoismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsformatUrl}/${id}`);
    }

    Updatecisoismsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoismsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsformatUrl}/${id}`);
    }

    cisoqmsgeneralUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportGeneralQMS';
    Getcisoqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.cisoqmsgeneralUrl);
    }
    
    Postcisoqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsgeneralUrl, data);
    }

    GetcisoqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsgeneralUrl}/${id}`);
    }

    Updatecisoqmsgeneral(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoqmsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsgeneralUrl}/${id}`);
    }


    cisoqmsguidelineUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportGuidelinessQMS';
    Getcisoqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.cisoqmsguidelineUrl);
    }
    
    Postcisoqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsguidelineUrl, data);
    }

    GetcisoqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsguidelineUrl}/${id}`);
    }

    Updatecisoqmsguideline(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoqmsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsguidelineUrl}/${id}`);
    }

    cisoqmspolicyUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportPolicyQMS';
    Getcisoqmspolicy(): Observable<any> {
      return this.http.get<any>(this.cisoqmspolicyUrl);
    }
    
    Postcisoqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmspolicyUrl, data);
    }

    GetcisoqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmspolicyUrl}/${id}`);
    }

    Updatecisoqmspolicy(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoqmspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmspolicyUrl}/${id}`);
    }

    cisoqmsprocedureUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportProcedureQMS';
    Getcisoqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.cisoqmsprocedureUrl);
    }
    
    Postcisoqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsprocedureUrl, data);
    }

    GetcisoqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsprocedureUrl}/${id}`);
    }

    Updatecisoqmsprocedure(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoqmsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsprocedureUrl}/${id}`);
    }


    cisoqmsformatUrl='https://ielc-coreapi.azurewebsites.net/CISO_MR_SupportFormatsQMS';
    Getcisoqmsformat(): Observable<any> {
      return this.http.get<any>(this.cisoqmsformatUrl);
    }
    
    Postcisoqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsformatUrl, data);
    }

    GetcisoqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsformatUrl}/${id}`);
    }

    Updatecisoqmsformat(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.cisoqmsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsformatUrl}/${id}`);
    }
    
//---------------------------------------------------------------------------------------Hippa

    hippaUrl='https://ielc-coreapi.azurewebsites.net/HIPAA';
    Gethippa(): Observable<any> {
     return this.http.get<any>(this.hippaUrl);
    }
    
    Posthippa(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hippaUrl, data);
    }

    GethippaById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hippaUrl}/${id}`);
    }

    Updatehippa(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.hippaUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletehippaById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hippaUrl}/${id}`);
    }
    
//---------------------------------------------------------------------------------------GDPR

    gdprUrl='https://ielc-coreapi.azurewebsites.net/GDPR';
    Getgdpr(): Observable<any> {
     return this.http.get<any>(this.gdprUrl);
    }
    Postgdpr(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.gdprUrl, data);
    }

    GetgdprById(id: number): Observable<any> {
      return this.http.get<any>(`${this.gdprUrl}/${id}`);
    }

    Updategdpr(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.gdprUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletegdprById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.gdprUrl}/${id}`);
    }

//---------------------------------------------------------------------------------------SOC

    socUrl='https://ielc-coreapi.azurewebsites.net/SOC';
    Getsoc(): Observable<any> {
     return this.http.get<any>(this.socUrl);
    }
    Postsoc(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.socUrl, data);
    }

    GetsocById(id: number): Observable<any> {
      return this.http.get<any>(`${this.socUrl}/${id}`);
    }

    Updatesoc(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.socUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletesocById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.socUrl}/${id}`);
    }

//---------------------------------------------------------------------------------------DPDP

    dpdpUrl='https://ielc-coreapi.azurewebsites.net/DPDP';
    Getdpdp(): Observable<any> {
     return this.http.get<any>(this.dpdpUrl);
    }
    Postdpdp(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.dpdpUrl, data);
    }

    GetdpdpById(id: number): Observable<any> {
      return this.http.get<any>(`${this.dpdpUrl}/${id}`);
    }

    Updatedpdp(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.dpdpUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletedpdpById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.dpdpUrl}/${id}`);
    }

//---------------------------------------------------------------------------------------Inteq Holidays

    holidaysUrl='https://ielc-coreapi.azurewebsites.net/HolidayList';
    Getholidays(): Observable<any> {
     return this.http.get<any>(this.holidaysUrl);
    } 
    Postholidays(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.holidaysUrl, data);
    }

    DeleteholidaysById(content: any): Observable<void> {
      return this.http.delete<void>(`${this.holidaysUrl}/${content}`);
    }
    
//---------------------------------------------------------------------------------------ISMS calendar
    ismscalenarUrl='https://ielc-coreapi.azurewebsites.net/ISMSInteqSoftware_Calendar/GetCurrentYearCalendar';
    Getismscalendar(): Observable<any> {
     return this.http.get<any>(this.ismscalenarUrl);
    } 
    PostIsmscalendar(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ismscalenarUrl, data);
    }

    GetIsmscalendarById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ismscalenarUrl}/${id}`);
    }

    UpdateIsmscalendar(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.ismscalenarUrl}/${id}`, updatedData,{ observe: 'response' });
    }

//---------------------------------------------------------------------------------------ISMS history
    ismshistoryUrl='https://ielc-coreapi.azurewebsites.net/ISMSInteqSoftware_Calendar/GetHistoryCalendar';
    Getismshistory(year: number): Observable<any> {
      return this.http.get<any>(`${this.ismshistoryUrl}?year=${year}`);
    }
//---------------------------------------------------------------------------------------QMS calendar
qmscalenarUrl='https://ielc-coreapi.azurewebsites.net/ISMSInteqSoftware_Calendar/GetCurrentYearCalendar';
Getqmscalendar(): Observable<any> {
 return this.http.get<any>(this.qmscalenarUrl);
} 
Postqmscalendar(data: any): Observable<any> {
  // const headers = { 'Content-Type': 'application/json' };
  return this.http.post<any>(this.qmscalenarUrl, data);
}

GetqmscalendarById(id: number): Observable<any> {
  return this.http.get<any>(`${this.qmscalenarUrl}/${id}`);
}

Updateqmscalendar(id: number, updatedData: any): Observable<any> {
  return this.http.put<any>(`${this.qmscalenarUrl}/${id}`, updatedData,{ observe: 'response' });
}

//---------------------------------------------------------------------------------------QMS history
qmshistoryUrl='https://ielc-coreapi.azurewebsites.net/ISMSInteqSoftware_Calendar/GetHistoryCalendar';
Getqmshistory(year: number): Observable<any> {
  return this.http.get<any>(`${this.qmshistoryUrl}?year=${year}`);
}
//---------------------------------------------------------------------------------------ISMS mails

    ismsmailsUrl='https://ielc-coreapi.azurewebsites.net/ISMSEmails';
    Getismsmails(): Observable<any> {
     return this.http.get<any>(this.ismsmailsUrl);
    } 
    
    PostIsmsMails(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ismsmailsUrl, skillSessions);
    }

    GetIsmsMailsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ismsmailsUrl}/${id}`);
    }

    UpdateIsmsMails(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.ismsmailsUrl}/${id}`, updatedData,{ observe: 'response' });
    }
 
//---------------------------------------------------------------------------------------QMS mails

    qmsmailsUrl='https://ielc-coreapi.azurewebsites.net/QMSEmails';
    Getqmsmails(): Observable<any> {
     return this.http.get<any>(this.qmsmailsUrl);
    } 
    
    PostqmsMails(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.qmsmailsUrl, skillSessions);
    }

    GetqmsMailsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.qmsmailsUrl}/${id}`);
    }

    UpdateqmsMails(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.qmsmailsUrl}/${id}`, updatedData);
    }

//---------------------------------------------------------------------------------------SMTP Admin

    smtpUrl='https://ielc-coreapi.azurewebsites.net/SMPTAdmin';
    Getsmtp(): Observable<any> {
     return this.http.get<any>(this.smtpUrl);
    } 

    Postsmtp(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.smtpUrl, data);
    }

    DeletesmtpById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.smtpUrl}/${id}`);
    }
 //---------------------------------------------------------------------------------------ADmin users
 
 adminusersUrl='https://ielc-coreapi.azurewebsites.net/AdminUsersRoles';
   Getadminusers(): Observable<any> {
     return this.http.get<any>(this.adminusersUrl);
    } 
    Postadminusers(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.adminusersUrl, data);
    }

    DeleteadminusersById(email: any): Observable<void> {
      return this.http.delete<void>(`${this.adminusersUrl}/${email}`);
    }  
 //---------------------------------------------------------------------------------------Events
 
 eventsUrl='https://ielc-coreapi.azurewebsites.net/Events';
   Getevents(): Observable<any> {
     return this.http.get<any>(this.eventsUrl);
    } 
    Postevents(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.eventsUrl, data);
    }

    DeleteeventsById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.eventsUrl}/${id}`);
    }  
    GeteventsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.eventsUrl}/${id}`);
    }

    Updateevents(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.eventsUrl}/${id}`, updatedData);
    }  
    
//---------------------------------------------------------------------------------------Courses Restriction
 
 courseUrl='https://ielc-coreapi.azurewebsites.net/CoursesRestriction';
   Getcourse(): Observable<any> {
     return this.http.get<any>(this.courseUrl);
    } 
    Postcourse(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.courseUrl, data);
    }

    DeletecourseById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.courseUrl}/${id}`);
    }  
    GetcourseById(id: number): Observable<any> {
      return this.http.get<any>(`${this.courseUrl}/${id}`);
    }

    Updatecourse(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.courseUrl}/${id}`, updatedData);
    }  

//---------------------------------------------------------------------------------------Events Alerts
 
 eventalertsUrl='https://ielc-coreapi.azurewebsites.net/EventAlerts';
   Geteventalerts(): Observable<any> {
     return this.http.get<any>(this.eventalertsUrl);
    } 
    Posteventalerts(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.eventalertsUrl, data);
    }

    DeleteeventalertsById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.eventalertsUrl}/${id}`);
    }  
    GeteventalertsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.eventalertsUrl}/${id}`);
    }

    Updateeventalerts(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.eventalertsUrl}/${id}`, updatedData);
    } 
//================================================================================Exam info

examinfoUrl='https://ielc-coreapi.azurewebsites.net/ExamInfo';
Getexaminfo(): Observable<any> {
     return this.http.get<any>(this.examinfoUrl);
}    
GetexaminfoById(id: number): Observable<any> {
  return this.http.get<any>(`${this.examinfoUrl}/${id}`);
}

Updateexaminfo(id: number, updatedData: any): Observable<any> {
  return this.http.put<any>(`${this.examinfoUrl}/${id}`, updatedData);
} 
}
