import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersInfo } from './users-info';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { RegisteredusersComponent } from './registeredusers/registeredusers.component';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class IelcapiService {

  private apiKey = 'V5JSQXNizKDHHaeGhGBRDiHrF9rCvRYZUCCGdkmXXvfsb7mRz7KdISKOCCwGJH28MeP0jDjqLbLMFMMZ2onu36JCxK520U82dP7MJ6yX9wPV9HkKfqGauFQs0ANSONMn'
 

  constructor(private http:HttpClient,private datepipe:DatePipe) {}


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.apiKey
    });
  }
    //---------------------------------------------------------------------------------------- Registeredusers
    apiUrl='https://ielc-coreapi1.azurewebsites.net/EnrollmentData';
    GetUsers(): Observable<UsersInfo[]> {
      return this.http.get<UsersInfo[]>(this.apiUrl, {
        headers: this.getHeaders()
      });
    }

    apiskill='https://ielc-coreapi1.azurewebsites.net/EnrollmentData/skillname'
    GetUsersBySkill(skillName: string): Observable<any> {
      return this.http.get<any>(`${this.apiskill}/${skillName}`, {
        headers: this.getHeaders()
      });
    }
    apistatus='https://ielc-coreapi1.azurewebsites.net/EnrollmentData/Status'
    GetUsersByStatus(data: string): Observable<any> {
      return this.http.get<any>(`${this.apistatus}/${data}`, {
        headers: this.getHeaders()
      });
    }
    apimail='https://ielc-coreapi1.azurewebsites.net/EnrollmentData/Mail'
    GetUsersByEmail(data: string): Observable<any> {
      return this.http.get<any>(`${this.apimail}/${data}`, {
        headers: this.getHeaders()
      });
    }

    apivenue="https://ielc-coreapi1.azurewebsites.net/EnrollmentData/Venue"
    GetUsersByVenue(Venue: string): Observable<any> {
      return this.http.get<any>(`${this.apivenue}/${Venue}`, {
        headers: this.getHeaders()
      });
    }

    apidate="https://ielc-coreapi1.azurewebsites.net/EnrollmentData/StartDate"
    GetUsersByDate(date: string): Observable<any> {
      // Convert input date to DD-MM-YYYY format
      const formattedDate = this.convertDateFormat(date);
      const url = `https://ielc-coreapi1.azurewebsites.net/EnrollmentData/StartDate/${formattedDate}`;
    
      return this.http.get(url, { headers: this.getHeaders() }).pipe(
        map((response: any) => {
          return response.filter((user: any) => {
            // Ensure the date range is in the expected format "DD-MM-YYYY to DD-MM-YYYY"
            if (user.date && (user.date.includes(" - ") || user.date.includes(" to "))) {
              // const startDate = user.date.split(" - ")[0].trim(); // Extract start date
              let dateRange;
              if (user.date.includes(" - ")) {
                dateRange = user.date.split(" - "); // Split by " - "
              } else {
                dateRange = user.date.split(" to "); // Split by " to "
              }
              
              const startDate = dateRange[0].trim(); // Extract start date
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

   


    GetUsersBytoDate(date: string): Observable<any> {
      // Convert input date to DD-MM-YYYY format
      const formattedDate = this.convertDateFormat(date);
      const url = `https://ielc-coreapi1.azurewebsites.net/EnrollmentData/EndDate/${formattedDate}`;
    
      return this.http.get(url, { headers: this.getHeaders() }).pipe(
        map((response: any) => {
          return response.filter((user: any) => {
            // Ensure the date range is in the expected format "DD-MM-YYYY to DD-MM-YYYY"
            if (user.date && (user.date.includes(" - ") || user.date.includes(" to "))) {
              // const endDate = user.date.split(" - ")[1].trim(); // Extract end date
              let dateRange;
              if (user.date.includes(" - ")) {
                dateRange = user.date.split(" - "); // Split by " - "
              } else {
                dateRange = user.date.split(" to "); // Split by " to "
              }
              
              const endDate = dateRange[1].trim(); // Extract start date
              const formattedEndDate = this.convertDateFormatForComparison(endDate); // Convert end date to YYYY-MM-DD
              return formattedEndDate === formattedDate; // Compare both dates
            }
            return false;
          });
        })
      );
    }

   
   

    
    
    apiTime="https://ielc-coreapi1.azurewebsites.net/EnrollmentData/Time"
    GetUsersByTime(Time: string): Observable<any> {
      return this.http.get<any>(`${this.apiTime}/${Time}`, {
        headers: this.getHeaders()
      });
    }  

    apiID='https://ielc-coreapi1.azurewebsites.net/EnrollmentData'
    DeleteDataById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiID}/${id}`, {
        headers: this.getHeaders()
      });
    }

    GetBatchMembers(skillName: string, date: string, time: string): Observable<any> {
      const url = `${this.apiUrl}/Batchmembers?skillName=${encodeURIComponent(skillName)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;
      return this.http.get<any>(url, { headers: this.getHeaders() });
    }

    url = 'https://ielc-coreapi1.azurewebsites.net/EnrollmentData';
    enrollUser(enrollmentData: any): Observable<any> {
      const headers = this.getHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      return this.http.post<any>(this.url, enrollmentData,{ headers: headers });
    }

    checkurl='https://ielc-coreapi1.azurewebsites.net/EnrollmentData/check'
    checkIfAlreadyEnrolled(skillName: string, date: string, time: string, mail: string) {
      const params = {skillName,date,time,mail};
      return this.http.get<boolean>(this.checkurl, { params , headers: this.getHeaders() });
    }

    checkvenueurl='https://ielc-coreapi1.azurewebsites.net/EnrollmentData/checkself'
    checkVenueEnrollment(skillName: string, venue: string, mail: string) {
    const params = {skillName,venue,mail}
      return this.http.get<boolean>(this.checkvenueurl, { params , headers: this.getHeaders() });
    }


    //---------------------------------------------------------------------------------------Add New Skills

    EnrolledskillsUrl='https://ielc-coreapi1.azurewebsites.net/EnrollmentSessions';
    GetSkillSessions(): Observable<any> {
      return this.http.get<any>(this.EnrolledskillsUrl, { headers: this.getHeaders() });
    }

    GetSkillSessionById(id: string): Observable<any> {
      return this.http.get<any>(`${this.EnrolledskillsUrl}/${id}`, {
        headers: this.getHeaders()
      });
    }
  
    PostEnrolledSessions(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.EnrolledskillsUrl, skillSessions, {
        headers: this.getHeaders()
      });
    }

    UpdateSkillSession(id: string, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.EnrolledskillsUrl}/${id}`, updatedData, {
        headers: this.getHeaders()
      });
    }
   
    DeleteskillsessionsById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.EnrolledskillsUrl}/${id}`, {
        headers: this.getHeaders()
      });
    }

    EnrolledskillDataUrl='https://ielc-coreapi1.azurewebsites.net/EnrollmentSkillData';
    GetEnrolledSkills(): Observable<any> {
      return this.http.get<any>(this.EnrolledskillDataUrl, { headers: this.getHeaders() });
    }

    PostEnrolledSkill(skillData: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.EnrolledskillDataUrl, skillData, {
        headers: this.getHeaders()
      });
    }

    skillquestionsurl='https://ielc-coreapi1.azurewebsites.net/IELCQA/create'
    PostEnrolledSkillQuestions(skillData: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.skillquestionsurl, skillData, {
        headers: this.getHeaders()
      });
    }

    // DeleteEnrolledSkill(skillNames: string[]): Observable<any> {
    //   const queryParams = skillNames.join(',');
    //   return this.http.delete(`${this.EnrolledskillDataUrl}/${queryParams}`);
    // }

    DeleteEnrolledSkill(skillName: string): Observable<any> {
      const headers = this.getHeaders();
      return this.http.delete(`${this.EnrolledskillDataUrl}/${skillName}`, { headers,observe: 'response' });
    }
    
    AadUsersUrl='https://ielc-coreapi1.azurewebsites.net/AADUsersData'
    GetAadUserslist(): Observable<any> {
      return this.http.get<any>(this.AadUsersUrl, { headers: this.getHeaders() });
    }

    AadUGroupUrl='https://ielc-coreapi1.azurewebsites.net/AADGroupMails'
    GetAadUserGroupslist(): Observable<any> {
      return this.http.get<any>(this.AadUGroupUrl, { headers: this.getHeaders() });
    }
 
    getUsersOfGroup(groupName: string): Observable<any> {
      // return this.http.get(`https://ielc-coreapi1.azurewebsites.net/AADGroupMails/group-users/${encodeURIComponent(groupName)}`);
      const url = `https://ielc-coreapi1.azurewebsites.net/AADGroupMails/group-users/${encodeURIComponent(groupName)}`;
      return this.http.get(url, { headers: this.getHeaders() });
    }

    Enrolledsessionsurl='https://ielc-coreapi1.azurewebsites.net/EnrollmentSessions/skills/latest'
    GetEnrolledSessions(): Observable<any> {
        return this.http.get<any>(this.Enrolledsessionsurl, { headers: this.getHeaders() });
    }

    venuebyskill='https://ielc-coreapi1.azurewebsites.net/EnrollmentSessions/venues/search/skillName'
    GetEnrolledSessionsbyvenue(skillName: string): Observable<any> {
      return this.http.get<any>(`${this.venuebyskill}?skillName=${skillName}`, { headers: this.getHeaders() });
    }

    datebyskill='https://ielc-coreapi1.azurewebsites.net/EnrollmentSessions/Dates/search'
    // GetEnrolledSessionsbydate(skillName: string): Observable<any> {
    //   return this.http.get<any>(`${this.datebyskill}/${skillName}`);
    // }
    GetEnrolledSessionsbydate(skill: string, venue: string): Observable<any> {
      const url = `https://ielc-coreapi1.azurewebsites.net/EnrollmentSessions/Dates/search/${(skill)}/${(venue)}`;
      return this.http.get<any>(url, { headers: this.getHeaders() });
    }
    timebyskill='https://ielc-coreapi1.azurewebsites.net/EnrollmentSessions/Times/search'
    GetEnrolledSessionsbytime(skillName: string): Observable<any> {
      return this.http.get<any>(`${this.timebyskill}/${skillName}`, { headers: this.getHeaders() });
    }
    getEnrollmentSessionsBySkillAndDateRange(skillName: string, dateRange: string): Observable<any> {
      const url = `https://ielc-coreapi1.azurewebsites.net/EnrollmentSessions/Times/search/${skillName}/${dateRange}`;
      return this.http.get<any>(url, { headers: this.getHeaders() });
    }
    

   //---------------------------------------------------------------------------------------Inteq IT Support

    itsprtUrl='https://ielc-coreapi1.azurewebsites.net/INTEQITSupport';
    GetItSprt(): Observable<any> {
      return this.http.get<any>(this.itsprtUrl, { headers: this.getHeaders() });
    }

    PostITSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itsprtUrl, skillSessions, { headers: this.getHeaders() });
    }

    GetITSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itsprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateITSprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itsprtUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteITSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itsprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    itismsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/ITSupport';
    Getitismsgeneral(): Observable<any> {
      return this.http.get<any>(this.itismsgeneralUrl, { headers: this.getHeaders() });
    }
    Postitismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetitismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitismsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itismsgeneralUrl}/${id}`, updatedData,{ headers, observe: 'response' });
    }

    DeleteitismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    itismsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportGuidelinessISMS';
    Getitismsguidelines(): Observable<any> {
      return this.http.get<any>(this.itismsguidelineUrl, { headers: this.getHeaders() });
    }
    Postitismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetitismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitismsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itismsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    itismspolicyUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportPolicyISMS';
    Getitismspolicy(): Observable<any> {
      return this.http.get<any>(this.itismspolicyUrl, { headers: this.getHeaders() });
    }
    Postitismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetitismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitismspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itismspolicyUrl}/${id}`, updatedData,{ headers, observe: 'response' });
    }

    DeleteitismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    itismsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportProcedureISMS';
    Getitismsprocedure(): Observable<any> {
      return this.http.get<any>(this.itismsprocedureUrl, { headers: this.getHeaders() });
    }
    Postitismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetitismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitismsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itismsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    itismsformatUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportFormatsISMS';
    Getitismsformat(): Observable<any> {
      return this.http.get<any>(this.itismsformatUrl, { headers: this.getHeaders() });
    }
    Postitismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itismsformatUrl, data, { headers: this.getHeaders() });
    }

    GetitismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitismsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itismsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    itqmsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportGeneralQMS';
    Getitqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.itqmsgeneralUrl, { headers: this.getHeaders() });
    }
    Postitqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetitqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitqmsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itqmsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    itqmsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportGuidelinessQMS';
    Getitqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.itqmsguidelineUrl, { headers: this.getHeaders() });
    }
    
    Postitqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetitqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitqmsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itqmsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    itqmspolicyUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportPolicyQMS';
    Getitqmspolicy(): Observable<any> {
      return this.http.get<any>(this.itqmspolicyUrl, { headers: this.getHeaders() });
    }
    Postitqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetitqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitqmspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itqmspolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    itqmsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportProcedureQMS';
    Getitqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.itqmsprocedureUrl, { headers: this.getHeaders() });
    }
    
    Postitqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetitqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitqmsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itqmsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }


    itqmsformatUrl='https://ielc-coreapi1.azurewebsites.net/ITSupportFormatsQMS';
    Getitqmsformat(): Observable<any> {
      return this.http.get<any>(this.itqmsformatUrl, { headers: this.getHeaders() });
    }
    
    Postitqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.itqmsformatUrl, data, { headers: this.getHeaders() });
    }

    GetitqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.itqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateitqmsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.itqmsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteitqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.itqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

     //---------------------------------------------------------------------------------------Inteq Admin/OS Support

     ossprtUrl='https://ielc-coreapi1.azurewebsites.net/AdminHelpDesk';
     GetosSprt(): Observable<any> {
       return this.http.get<any>(this.ossprtUrl, { headers: this.getHeaders() });
     }

     PostOsSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ossprtUrl, skillSessions, { headers: this.getHeaders() });
    }

    GetOsSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ossprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateOsSprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.ossprtUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteOsSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ossprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    osismsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupport';
    Getosismsgeneral(): Observable<any> {
      return this.http.get<any>(this.osismsgeneralUrl, { headers: this.getHeaders() });
    }
    Postosismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetosismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosismsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osismsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    osismsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportGuidelinessISMS';
    Getosismsguidelines(): Observable<any> {
      return this.http.get<any>(this.osismsguidelineUrl, { headers: this.getHeaders() });
    }
    Postosismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetosismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosismsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osismsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    osismspolicyUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportPolicyISMS';
    Getosismspolicy(): Observable<any> {
      return this.http.get<any>(this.osismspolicyUrl, { headers: this.getHeaders() });
    }
    Postosismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetosismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosismspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osismspolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    osismsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportProcedureISMS';
    Getosismsprocedure(): Observable<any> {
      return this.http.get<any>(this.osismsprocedureUrl, { headers: this.getHeaders() });
    }
    Postosismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetosismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosismsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osismsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    osismsformatUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportFormatsISMS';
    Getosismsformat(): Observable<any> {
      return this.http.get<any>(this.osismsformatUrl, { headers: this.getHeaders() });
    }
    Postosismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osismsformatUrl, data, { headers: this.getHeaders() });
    }

    GetosismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosismsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osismsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }
    
    osqmsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportGeneralQMS';
    Getosqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.osqmsgeneralUrl, { headers: this.getHeaders() });
    }
    
    Postosqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetosqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosqmsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osqmsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    osqmsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportGuidelinessQMS';
    Getosqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.osqmsguidelineUrl, { headers: this.getHeaders() });
    }
    
    Postosqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetosqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosqmsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osqmsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }


    osqmspolicyUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportPolicyQMS';
    Getosqmspolicy(): Observable<any> {
      return this.http.get<any>(this.osqmspolicyUrl, { headers: this.getHeaders() });
    }
    
    Postosqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetosqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosqmspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osqmspolicyUrl}/${id}`, updatedData,{ headers, observe: 'response' });
    }

    DeleteosqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    osqmsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportProcedureQMS';
    Getosqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.osqmsprocedureUrl, { headers: this.getHeaders() });
    }
    
    Postosqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetosqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosqmsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osqmsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    osqmsformatUrl='https://ielc-coreapi1.azurewebsites.net/OperationsSupportFormatsQMS';
    Getosqmsformat(): Observable<any> {
      return this.http.get<any>(this.osqmsformatUrl, { headers: this.getHeaders() });
    }
    
    Postosqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.osqmsformatUrl, data, { headers: this.getHeaders() });
    }

    GetosqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.osqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateosqmsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.osqmsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteosqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.osqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }
     //---------------------------------------------------------------------------------------Inteq HR Support

     hrsprtUrl='https://ielc-coreapi1.azurewebsites.net/HRHelpDesk';
     GetHrSprt(): Observable<any> {
       return this.http.get<any>(this.hrsprtUrl, { headers: this.getHeaders() });
     }

     PostHrSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrsprtUrl, skillSessions, { headers: this.getHeaders() });
    }

    GetHrSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrsprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrSprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrsprtUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrsprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrismsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/HRSupport';
    Gethrismsgeneral(): Observable<any> {
      return this.http.get<any>(this.hrismsgeneralUrl, { headers: this.getHeaders() });
    }

    PostHrismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetHrismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrismsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrismsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrismsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportGuidelinessISMS';
    Gethrismsguidelines(): Observable<any> {
      return this.http.get<any>(this.hrismsguidelineUrl, { headers: this.getHeaders() });
    }
    PostHrismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetHrismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrismsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrismsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrismspolicyUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportPolicyISMS';
    Gethrismspolicy(): Observable<any> {
      return this.http.get<any>(this.hrismspolicyUrl, { headers: this.getHeaders() });
    }
    PostHrismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetHrismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrismspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrismspolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrismsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportProcedureISMS';
    Gethrismsprocedure(): Observable<any> {
      return this.http.get<any>(this.hrismsprocedureUrl, { headers: this.getHeaders() });
    }
    PostHrismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetHrismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrismsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrismsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrismsformatUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportFormatsISMS';
    Gethrismsformat(): Observable<any> {
      return this.http.get<any>(this.hrismsformatUrl, { headers: this.getHeaders() });
    }
    PostHrismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrismsformatUrl, data, { headers: this.getHeaders() });
    }

    GetHrismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrismsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrismsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrqmsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportGeneralQMS';
    Gethrqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.hrqmsgeneralUrl, { headers: this.getHeaders() });
    }

    PostHrqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetHrqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrqmsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrqmsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrqmsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportGuidelinessQMS';
    Gethrqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.hrqmsguidelineUrl, { headers: this.getHeaders() });
    }
    
    PostHrqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetHrqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrqmsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrqmsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }


    hrqmspolicyUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportPolicyQMS';
    Gethrqmspolicy(): Observable<any> {
      return this.http.get<any>(this.hrqmspolicyUrl, { headers: this.getHeaders() });
    }
    
    PostHrqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetHrqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrqmspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrqmspolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrqmsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportProcedureQMS';
    Gethrqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.hrqmsprocedureUrl, { headers: this.getHeaders() });
    }

    PostHrqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetHrqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrqmsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrqmsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    hrqmsformatUrl='https://ielc-coreapi1.azurewebsites.net/HRSupportFormatsQMS';
    Gethrqmsformat(): Observable<any> {
      return this.http.get<any>(this.hrqmsformatUrl, { headers: this.getHeaders() });
    }
    
    PostHrqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hrqmsformatUrl, data, { headers: this.getHeaders() });
    }

    GetHrqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hrqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateHrqmsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hrqmsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteHrqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hrqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

  //---------------------------------------------------------------------------------------Inteq Project Support

    prjtsprtUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsList';
    GetprjtSprt(): Observable<any> {
     return this.http.get<any>(this.prjtsprtUrl, { headers: this.getHeaders() });
    }

    prjtismsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupport';
    Getprjtismsgeneral(): Observable<any> {
      return this.http.get<any>(this.prjtismsgeneralUrl, { headers: this.getHeaders() });
    }
    Postprjtismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetprjtismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtismsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtismsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtismsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportGuidelinessISMS';
    Getprjtismsguidelines(): Observable<any> {
      return this.http.get<any>(this.prjtismsguidelineUrl, { headers: this.getHeaders() });
    }
    
    Postprjtismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetprjtismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtismsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtismsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtismspolicyUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportPolicyISMS';
    Getprjtismspolicy(): Observable<any> {
      return this.http.get<any>(this.prjtismspolicyUrl, { headers: this.getHeaders() });
    }
    
    Postprjtismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetprjtismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtismspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtismspolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtismsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportProcedureISMS';
    Getprjtismsprocedure(): Observable<any> {
      return this.http.get<any>(this.prjtismsprocedureUrl, { headers: this.getHeaders() });
    }
    
    Postprjtismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetprjtismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtismsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtismsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtismsformatUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportFormatsISMS';
    Getprjtismsformat(): Observable<any> {
      return this.http.get<any>(this.prjtismsformatUrl, { headers: this.getHeaders() });
    }
    
    Postprjtismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtismsformatUrl, data, { headers: this.getHeaders() });
    }

    GetprjtismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtismsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtismsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtqmsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportGeneralQMS';
    Getprjtqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.prjtqmsgeneralUrl, { headers: this.getHeaders() });
    }
    
    Postprjtqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetprjtqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtqmsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtqmsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtqmsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportGuidelinessQMS';
    Getprjtqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.prjtqmsguidelineUrl, { headers: this.getHeaders() });
    }
    
    Postprjtqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetprjtqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtqmsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtqmsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }


    prjtqmspolicyUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportPolicyQMS';
    Getprjtqmspolicy(): Observable<any> {
      return this.http.get<any>(this.prjtqmspolicyUrl, { headers: this.getHeaders() });
    }
    
    Postprjtqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetprjtqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtqmspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtqmspolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtqmsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportProcedureQMS';
    Getprjtqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.prjtqmsprocedureUrl, { headers: this.getHeaders() });
    }
    Postprjtqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetprjtqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtqmsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtqmsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    prjtqmsformatUrl='https://ielc-coreapi1.azurewebsites.net/ProjectsSupportFormatsQMS';
    Getprjtqmsformat(): Observable<any> {
      return this.http.get<any>(this.prjtqmsformatUrl, { headers: this.getHeaders() });
    }
    
    Postprjtqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.prjtqmsformatUrl, data, { headers: this.getHeaders() });
    }

    GetprjtqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.prjtqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateprjtqmsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.prjtqmsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteprjtqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.prjtqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

//---------------------------------------------------------------------------------------Inteq Emergency Support
  
    emersprtUrl='https://ielc-coreapi1.azurewebsites.net/EmergencyContactList';
    GetemerSprt(): Observable<any> {
     return this.http.get<any>(this.emersprtUrl, { headers: this.getHeaders() });
    }
    
    PostEmerSprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.emersprtUrl, skillSessions, { headers: this.getHeaders() });
    }

    GetEmerSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.emersprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateEmerSprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.emersprtUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteEmerSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.emersprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    emergeneralUrl='https://ielc-coreapi1.azurewebsites.net/Emergency';
    Getemergeneral(): Observable<any> {
      return this.http.get<any>(this.emergeneralUrl, { headers: this.getHeaders() });
    }
    Postemergeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.emergeneralUrl, data, { headers: this.getHeaders() });
    }

    GetemergeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.emergeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateemergeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.emergeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteemergeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.emergeneralUrl}/${id}`, { headers: this.getHeaders() });
    }
   
//---------------------------------------------------------------------------------------Inteq Various committees Support  
     
    varcmtsUrl='https://ielc-coreapi1.azurewebsites.net/VariousCommittees';
    Getvarcmt(): Observable<any> {
     return this.http.get<any>(this.varcmtsUrl, { headers: this.getHeaders() });
    }
    
    Postvarcmt(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.varcmtsUrl, data, { headers: this.getHeaders() });
    }

    GetvarcmtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.varcmtsUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatevarcmt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.varcmtsUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletevarcmtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.varcmtsUrl}/${id}`, { headers: this.getHeaders() });
    }
//---------------------------------------------------------------------------------------Inteq ISO 27001

    iso27001Url='https://ielc-coreapi1.azurewebsites.net/ISO27001';
    Getiso27001(): Observable<any> {
     return this.http.get<any>(this.iso27001Url, { headers: this.getHeaders() });
    }

    PostIso27001Sprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.iso27001Url, skillSessions, { headers: this.getHeaders() });
    }

    GetIso27001SprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.iso27001Url}/${id}`, { headers: this.getHeaders() });
    }

    UpdateIso27001Sprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.iso27001Url}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteIso27001SprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.iso27001Url}/${id}`, { headers: this.getHeaders() });
    }

    ismsinfoUrl='https://ielc-coreapi1.azurewebsites.net/ISMSSupport';
    Getismsinfo(): Observable<any> {
     return this.http.get<any>(this.ismsinfoUrl, { headers: this.getHeaders() });
    }

    PostIsmsSprt(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ismsinfoUrl, data, { headers: this.getHeaders() });
    }

    GetIsmsSprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ismsinfoUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateIsmsSprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.ismsinfoUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteIsmsSprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ismsinfoUrl}/${id}`, { headers: this.getHeaders() });
    }

    isosprtUrl='https://ielc-coreapi1.azurewebsites.net/ISOSupport';
    Getisosprt(): Observable<any> {
     return this.http.get<any>(this.isosprtUrl, { headers: this.getHeaders() });
    }
    
    Postisosprt(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.isosprtUrl, data, { headers: this.getHeaders() });
    }

    GetisosprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.isosprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateisosprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.isosprtUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteisosprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.isosprtUrl}/${id}`, { headers: this.getHeaders() });
    }

    ispolicyUrl='https://ielc-coreapi1.azurewebsites.net/ISPolicy';
    Getispolicy(): Observable<any> {
     return this.http.get<any>(this.ispolicyUrl, { headers: this.getHeaders() });
    }
    
    Postispolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ispolicyUrl, data, { headers: this.getHeaders() });
    }

    GetispolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ispolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateispolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.ispolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteispolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ispolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

//---------------------------------------------------------------------------------------Inteq ISO 9001
    
    iso9001Url='https://ielc-coreapi1.azurewebsites.net/ISO9001';
    Getiso9001(): Observable<any> {
     return this.http.get<any>(this.iso9001Url, { headers: this.getHeaders() });
    }

    PostIso9001Sprt(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.iso9001Url, skillSessions, { headers: this.getHeaders() });
    }

    GetIso9001SprtById(id: number): Observable<any> {
      return this.http.get<any>(`${this.iso9001Url}/${id}`, { headers: this.getHeaders() });
    }

    UpdateIso9001Sprt(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.iso9001Url}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteIso9001SprtById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.iso9001Url}/${id}`, { headers: this.getHeaders() });
    }

    isoinfoUrl='https://ielc-coreapi1.azurewebsites.net/ISOSupport';
    Getisoinfo(): Observable<any> {
     return this.http.get<any>(this.isoinfoUrl, { headers: this.getHeaders() });
    }

//---------------------------------------------------------------------------------------CISO Support

    cisoismsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_Support';
    Getcisoismsgeneral(): Observable<any> {
      return this.http.get<any>(this.cisoismsgeneralUrl, { headers: this.getHeaders() });
    }
    Postcisoismsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetcisoismsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoismsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoismsgeneralUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    cisoismsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportGuidelinessISMS';
    Getcisoismsguidelines(): Observable<any> {
      return this.http.get<any>(this.cisoismsguidelineUrl, { headers: this.getHeaders() });
    }
    Postcisoismsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetcisoismsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoismsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoismsguidelineUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    cisoismspolicyUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportPolicyISMS';
    Getcisoismspolicy(): Observable<any> {
      return this.http.get<any>(this.cisoismspolicyUrl, { headers: this.getHeaders() });
    }
    Postcisoismspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetcisoismspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoismspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoismspolicyUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    cisoismsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportProcedureISMS';
    Getcisoismsprocedure(): Observable<any> {
      return this.http.get<any>(this.cisoismsprocedureUrl, { headers: this.getHeaders() });
    }
    Postcisoismsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetcisoismsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoismsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoismsprocedureUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    cisoismsformatUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportFormatsISMS';
    Getcisoismsformat(): Observable<any> {
      return this.http.get<any>(this.cisoismsformatUrl, { headers: this.getHeaders() });
    }
    Postcisoismsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoismsformatUrl, data, { headers: this.getHeaders() });
    }

    GetcisoismsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoismsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoismsformatUrl}/${id}`, updatedData,{ observe: 'response' });
    }

    DeletecisoismsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoismsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    cisoqmsgeneralUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportGeneralQMS';
    Getcisoqmsgeneral(): Observable<any> {
      return this.http.get<any>(this.cisoqmsgeneralUrl, { headers: this.getHeaders() });
    }
    
    Postcisoqmsgeneral(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsgeneralUrl, data, { headers: this.getHeaders() });
    }

    GetcisoqmsgeneralById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoqmsgeneral(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoqmsgeneralUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletecisoqmsgeneralById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsgeneralUrl}/${id}`, { headers: this.getHeaders() });
    }


    cisoqmsguidelineUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportGuidelinessQMS';
    Getcisoqmsguidelines(): Observable<any> {
      return this.http.get<any>(this.cisoqmsguidelineUrl, { headers: this.getHeaders() });
    }
    
    Postcisoqmsguideline(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsguidelineUrl, data, { headers: this.getHeaders() });
    }

    GetcisoqmsguidelineById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoqmsguideline(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoqmsguidelineUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletecisoqmsguidelineById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsguidelineUrl}/${id}`, { headers: this.getHeaders() });
    }

    cisoqmspolicyUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportPolicyQMS';
    Getcisoqmspolicy(): Observable<any> {
      return this.http.get<any>(this.cisoqmspolicyUrl, { headers: this.getHeaders() });
    }
    
    Postcisoqmspolicy(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmspolicyUrl, data, { headers: this.getHeaders() });
    }

    GetcisoqmspolicyById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoqmspolicy(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoqmspolicyUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletecisoqmspolicyById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmspolicyUrl}/${id}`, { headers: this.getHeaders() });
    }

    cisoqmsprocedureUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportProcedureQMS';
    Getcisoqmsprocedure(): Observable<any> {
      return this.http.get<any>(this.cisoqmsprocedureUrl, { headers: this.getHeaders() });
    }
    
    Postcisoqmsprocedure(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsprocedureUrl, data, { headers: this.getHeaders() });
    }

    GetcisoqmsprocedureById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoqmsprocedure(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoqmsprocedureUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletecisoqmsprocedureById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsprocedureUrl}/${id}`, { headers: this.getHeaders() });
    }


    cisoqmsformatUrl='https://ielc-coreapi1.azurewebsites.net/CISO_MR_SupportFormatsQMS';
    Getcisoqmsformat(): Observable<any> {
      return this.http.get<any>(this.cisoqmsformatUrl, { headers: this.getHeaders() });
    }
    
    Postcisoqmsformat(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.cisoqmsformatUrl, data, { headers: this.getHeaders() });
    }

    GetcisoqmsformatById(id: number): Observable<any> {
      return this.http.get<any>(`${this.cisoqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecisoqmsformat(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.cisoqmsformatUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletecisoqmsformatById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.cisoqmsformatUrl}/${id}`, { headers: this.getHeaders() });
    }
    
//---------------------------------------------------------------------------------------Hippa

    hippaUrl='https://ielc-coreapi1.azurewebsites.net/HIPAA';
    Gethippa(): Observable<any> {
     return this.http.get<any>(this.hippaUrl, { headers: this.getHeaders() });
    }
    
    Posthippa(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.hippaUrl, data, { headers: this.getHeaders() });
    }

    GethippaById(id: number): Observable<any> {
      return this.http.get<any>(`${this.hippaUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatehippa(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.hippaUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletehippaById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.hippaUrl}/${id}`, { headers: this.getHeaders() });
    }
    
//---------------------------------------------------------------------------------------GDPR

    gdprUrl='https://ielc-coreapi1.azurewebsites.net/GDPR';
    Getgdpr(): Observable<any> {
     return this.http.get<any>(this.gdprUrl, { headers: this.getHeaders() });
    }
    Postgdpr(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.gdprUrl, data, { headers: this.getHeaders() });
    }

    GetgdprById(id: number): Observable<any> {
      return this.http.get<any>(`${this.gdprUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updategdpr(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.gdprUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletegdprById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.gdprUrl}/${id}`, { headers: this.getHeaders() });
    }

//---------------------------------------------------------------------------------------SOC

    socUrl='https://ielc-coreapi1.azurewebsites.net/SOC';
    Getsoc(): Observable<any> {
     return this.http.get<any>(this.socUrl, { headers: this.getHeaders() });
    }
    Postsoc(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.socUrl, data, { headers: this.getHeaders() });
    }

    GetsocById(id: number): Observable<any> {
      return this.http.get<any>(`${this.socUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatesoc(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.socUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletesocById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.socUrl}/${id}`, { headers: this.getHeaders() });
    }

//---------------------------------------------------------------------------------------DPDP

    dpdpUrl='https://ielc-coreapi1.azurewebsites.net/DPDP';
    Getdpdp(): Observable<any> {
     return this.http.get<any>(this.dpdpUrl, { headers: this.getHeaders() });
    }
    Postdpdp(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.dpdpUrl, data, { headers: this.getHeaders() });
    }

    GetdpdpById(id: number): Observable<any> {
      return this.http.get<any>(`${this.dpdpUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatedpdp(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.dpdpUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeletedpdpById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.dpdpUrl}/${id}`, { headers: this.getHeaders() });
    }
//---------------------------------------------------------------------------------------feedback
    feedbackUrl='https://ielc-coreapi1.azurewebsites.net/EnrollmentData'
    Updatefeedback(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.feedbackUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    GetExamById(id: number): Observable<any> {
      return this.http.get<any>(`${this.feedbackUrl}/${id}`, { headers: this.getHeaders() });
    }
//---------------------------------------------------------------------------------------Inteq Holidays

    holidaysUrl='https://ielc-coreapi1.azurewebsites.net/HolidayList';
    Getholidays(): Observable<any> {
     return this.http.get<any>(this.holidaysUrl, { headers: this.getHeaders() });
    } 
    Postholidays(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.holidaysUrl, data, { headers: this.getHeaders() });
    }

    DeleteholidaysById(content: any): Observable<void> {
      return this.http.delete<void>(`${this.holidaysUrl}/${content}`, { headers: this.getHeaders() });
    }
    
//---------------------------------------------------------------------------------------ISMS calendar
    ismscalenarUrl='https://ielc-coreapi1.azurewebsites.net/ISMSInteqSoftware_Calendar';
    Getismscalendar(): Observable<any> {
     return this.http.get<any>(this.ismscalenarUrl, { headers: this.getHeaders() });
    } 
    // PostIsmscalendar(data: any): Observable<any> {
    //   // const headers = { 'Content-Type': 'application/json' };
    //   return this.http.post<any>(this.ismscalenarUrl, data);
    // }
    PostIsmscalendar(data: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.post(this.ismscalenarUrl, data, {headers, responseType: 'text' });
    }
    

    GetIsmscalendarById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ismscalenarUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateIsmscalendar(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put(`${this.ismscalenarUrl}/${id}`, updatedData, {
        headers,
        observe: 'response',
        responseType: 'text'
      });
    }
    

//---------------------------------------------------------------------------------------ISMS history
    ismshistoryUrl='https://ielc-coreapi1.azurewebsites.net/ISMSInteqSoftware_Calendar/GetHistoryCalendar';
    Getismshistory(year: number): Observable<any> {
      return this.http.get<any>(`${this.ismshistoryUrl}?year=${year}`, { headers: this.getHeaders() });
    }
//---------------------------------------------------------------------------------------QMS calendar
qmscalenarUrl='https://ielc-coreapi1.azurewebsites.net/QMSInteqSoftware_Calendar';
Getqmscalendar(): Observable<any> {
 return this.http.get<any>(this.qmscalenarUrl, { headers: this.getHeaders() });
} 
Postqsmscalendar(data: any): Observable<any> {
  const headers = this.getHeaders();
  return this.http.post(this.qmscalenarUrl, data, {headers, responseType: 'text' });
}

GetqmscalendarById(id: number): Observable<any> {
  return this.http.get<any>(`${this.qmscalenarUrl}/${id}`, { headers: this.getHeaders() });
}

Updateqmscalendar(id: number, updatedData: any): Observable<any> {
  const headers = this.getHeaders();
  return this.http.put(`${this.qmscalenarUrl}/${id}`, updatedData, {
    headers,
    observe: 'response',
    responseType: 'text'
  });
}

//---------------------------------------------------------------------------------------QMS history
qmshistoryUrl='https://ielc-coreapi1.azurewebsites.net/QMSInteqSoftware_Calendar/GetHistoryCalendar';
Getqmshistory(year: number): Observable<any> {
  return this.http.get<any>(`${this.qmshistoryUrl}?year=${year}`, { headers: this.getHeaders() });
}
//---------------------------------------------------------------------------------------ISMS mails

    ismsmailsUrl='https://ielc-coreapi1.azurewebsites.net/ISMSEmails';
    Getismsmails(): Observable<any> {
     return this.http.get<any>(this.ismsmailsUrl, { headers: this.getHeaders() });
    } 
    
    PostIsmsMails(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.ismsmailsUrl, skillSessions, { headers: this.getHeaders(), responseType: 'text' as 'json' });
    }

    GetIsmsMailsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.ismsmailsUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateIsmsMails(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.ismsmailsUrl}/${id}`, updatedData,{headers, observe: 'response' });
    }

    DeleteismsById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ismsmailsUrl}/${id}`, { headers: this.getHeaders() });
    }

   DeleteismsByOwner(process_Owner: string): Observable<void> {
  return this.http.delete<void>(
`${this.ismsmailsUrl}/details?processOwner=${process_Owner}`,
    { headers: this.getHeaders() }
  );
}

 
//---------------------------------------------------------------------------------------QMS mails

    qmsmailsUrl='https://ielc-coreapi1.azurewebsites.net/QMSEmails';
    Getqmsmails(): Observable<any> {
     return this.http.get<any>(this.qmsmailsUrl, { headers: this.getHeaders() });
    } 
    
    PostqmsMails(skillSessions: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.qmsmailsUrl, skillSessions, { headers: this.getHeaders(), responseType: 'text' as 'json' });
    }

    GetqmsMailsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.qmsmailsUrl}/${id}`, { headers: this.getHeaders() });
    }

    UpdateqmsMails(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.qmsmailsUrl}/${id}`, updatedData, { headers: this.getHeaders() });
    }
    DeleteqmsById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.qmsmailsUrl}/${id}`, { headers: this.getHeaders() });
    }

       DeleteqmsByOwner(process_Owner: string): Observable<void> {
  return this.http.delete<void>(
`${this.qmsmailsUrl}/details?processOwner=${process_Owner}`,
    { headers: this.getHeaders() }
  );
}

//---------------------------------------------------------------------------------------SMTP Admin

    smtpUrl='https://ielc-coreapi1.azurewebsites.net/SMPTAdmin';
    Getsmtp(): Observable<any> {
     return this.http.get<any>(this.smtpUrl, { headers: this.getHeaders() });
    } 

    Postsmtp(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.smtpUrl, data, { headers: this.getHeaders() });
    }

    DeletesmtpById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.smtpUrl}/${id}`, { headers: this.getHeaders() });
    }
 //---------------------------------------------------------------------------------------ADmin users
 
 adminusersUrl='https://ielc-coreapi1.azurewebsites.net/AdminUsersRoles';
   Getadminusers(): Observable<any> {
     return this.http.get<any>(this.adminusersUrl, { headers: this.getHeaders() });
    } 
    Postadminusers(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.adminusersUrl, data, { headers: this.getHeaders() });
    }

    DeleteadminusersById(email: any): Observable<void> {
      return this.http.delete<void>(`${this.adminusersUrl}/${email}`, { headers: this.getHeaders() });
    }  
 //---------------------------------------------------------------------------------------Events
 
 eventsUrl='https://ielc-coreapi1.azurewebsites.net/Events';
   Getevents(): Observable<any> {
     return this.http.get<any>(this.eventsUrl, { headers: this.getHeaders() });
    } 
    // Postevents(data: any): Observable<any> {
    //   // const headers = { 'Content-Type': 'application/json' };
    //   return this.http.post<any>(this.eventsUrl, data);
    // }
    Postevents(data: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
       'Authorization': this.apiKey
       });
      
      return this.http.post<any>(this.eventsUrl, JSON.stringify(data), { headers });
    }

    DeleteeventsById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.eventsUrl}/${id}`, { headers: this.getHeaders() });
    }  
    GeteventsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.eventsUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateevents(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.eventsUrl}/${id}`, updatedData, { headers: this.getHeaders() });
    }  
    
//---------------------------------------------------------------------------------------Courses Restriction
 
 courseUrl='https://ielc-coreapi1.azurewebsites.net/CoursesRestriction';
   Getcourse(): Observable<any> {
     return this.http.get<any>(this.courseUrl, { headers: this.getHeaders() });
    } 
    Postcourse(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.courseUrl, data, { headers: this.getHeaders() });
    }

    DeletecourseById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.courseUrl}/${id}`, { headers: this.getHeaders() });
    }  
    GetcourseById(id: number): Observable<any> {
      return this.http.get<any>(`${this.courseUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updatecourse(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.courseUrl}/${id}`, updatedData, { headers: this.getHeaders() });
    }  

//---------------------------------------------------------------------------------------Events Alerts
 
 eventalertsUrl='https://ielc-coreapi1.azurewebsites.net/EventAlerts';
   Geteventalerts(): Observable<any> {
     return this.http.get<any>(this.eventalertsUrl, { headers: this.getHeaders() });
    } 
    Posteventalerts(data: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(this.eventalertsUrl, data, { headers: this.getHeaders() });
    }

    DeleteeventalertsById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.eventalertsUrl}/${id}`, { headers: this.getHeaders() });
    }  
    GeteventalertsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.eventalertsUrl}/${id}`, { headers: this.getHeaders() });
    }

    Updateeventalerts(id: number, updatedData: any): Observable<any> {
      return this.http.put<any>(`${this.eventalertsUrl}/${id}`, updatedData, { headers: this.getHeaders() });
    } 

UpdateEventAlertStatus(data: any): Observable<any> {
  const url = `${this.eventalertsUrl}/UpdateStatus`;
  return this.http.post<any>(url, data, { headers: this.getHeaders() });
}
//================================================================================Exam info

examinfoUrl='https://ielc-coreapi1.azurewebsites.net/ExamInfo';
Getexaminfo(): Observable<any> {
     return this.http.get<any>(this.examinfoUrl, { headers: this.getHeaders() });
}    
GetexaminfoById(id: number): Observable<any> {
  return this.http.get<any>(`${this.examinfoUrl}/${id}`, { headers: this.getHeaders() });
}

Updateexaminfo(id: number, updatedData: any): Observable<any> {
  return this.http.put<any>(`${this.examinfoUrl}/${id}`, updatedData, { headers: this.getHeaders() });
} 
//=================================================================================skillQA
skillqaurl='https://ielc-coreapi1.azurewebsites.net/IELCQA';
Getskillqa(): Observable<any> {
  return this.http.get<any>(this.skillqaurl, { headers: this.getHeaders() });
}   
// Postskillqa(data: any): Observable<any> {
//   return this.http.post<any>(this.skillqaurl, data);
// }
Postskillqa(data: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': this.apiKey
   });

  return this.http.post<any>(this.skillqaurl, JSON.stringify(data), { headers });
}

// Postskillqa(data: FormData): Observable<any> {
//   return this.http.post<any>(this.skillqaurl, data); 
// }


DeleteskillqaById(id: number): Observable<void> {
  return this.http.delete<void>(`${this.skillqaurl}/${id}`, { headers: this.getHeaders() });
}  
GetskillqaById(id: number): Observable<any> {
  return this.http.get<any>(`${this.skillqaurl}/${id}`, { headers: this.getHeaders() });
}

Updateskillqa(id: number, updatedData: any): Observable<any> {
  const headers = this.getHeaders();
  return this.http.put<any>(`${this.skillqaurl}/${id}`, updatedData, {headers, observe: 'response' });
} 
skillnameurl='https://ielc-coreapi1.azurewebsites.net/IELCQA/skillname'
    GetskillqaBySkill(skillName: string): Observable<any> {
      return this.http.get<any>(`${this.skillnameurl}/${skillName}`, { headers: this.getHeaders() });
    }


//===============================================================================================Compliance Isms
complianceismsUrl='https://ielc-coreapi1.azurewebsites.net/ISMSInteqSoftware_Calendar';
complianceqmsUrl='https://ielc-coreapi1.azurewebsites.net/QMSInteqSoftware_Calendar';

Getcomplianceismsdata(): Observable<any> {
     return this.http.get<any>(this.complianceismsUrl, { headers: this.getHeaders() });
} 

Getcomplianceqmsdata(): Observable<any> {
  return this.http.get<any>(this.complianceqmsUrl, { headers: this.getHeaders() });
} 

GetCCDisplayNames(): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/CCDisplayNames`, { headers: this.getHeaders() });
}

GetToDisplayNames(): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/TODisplayNames`, { headers: this.getHeaders() });
}

GetByProjects(): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/Team`, { headers: this.getHeaders() })
}

Getcompliancefilterprojects(displayname: string): Observable<any> {
  return this.http.get<any>(`${this.complianceismsUrl}/detailsbyDisplayName/${displayname}`, { headers: this.getHeaders() });
}

GetUserByProjects(displayname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/userprojectsbydisplayname/${displayname}`, { headers: this.getHeaders() });
}


GetISMSUserByProjectTable(projectname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/searchproject/${projectname}`, { headers: this.getHeaders() })
}

GetCurrentMonth(projectname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/currentmonthstatus/${projectname}`, { headers: this.getHeaders() })
}

GetProjectIDISMS(projectname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/projectids/search/${projectname}`, { headers: this.getHeaders() })
}

UpdateISMSCompliance(id: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': this.apiKey
     });
    return this.http.put(`${this.complianceismsUrl}/update-month/${id}`, JSON.stringify(updatedData), { headers });
}

//==================================================================================================Compliance QMS

Getcompliancefilterprojectsqms(displayname: string): Observable<any> {
  return this.http.get<any>(`${this.complianceqmsUrl}/detailsbyDisplayName/${displayname}`, { headers: this.getHeaders() });
}

GetUserByProjectsqms(displayname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceqmsUrl}/userprojectsbydisplayname/${displayname}`, { headers: this.getHeaders() });
}

GetCCDisplayNamesQMS(): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceqmsUrl}/CCDisplayNames`, { headers: this.getHeaders() });
}
 
GetToDisplayNamesQMS(): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceqmsUrl}/TODisplayNames`, { headers: this.getHeaders() });
}


GetQMSUserByProjectTable(projectname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceqmsUrl}/searchproject/${projectname}`, { headers: this.getHeaders() })
}

GetCurrentMonthQMS(projectname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceqmsUrl}/currentmonthstatus/${projectname}`, { headers: this.getHeaders() })
}

GetProjectIDQMS(projectname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceqmsUrl}/projectids/search/${projectname}`, { headers: this.getHeaders() })
}

UpdateQMSCompliance(id: number, updatedData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': this.apiKey
   });
  return this.http.put(`${this.complianceqmsUrl}/update-month/${id}`, JSON.stringify(updatedData), { headers });
}

GetUniqueName(): Observable<string[]> {
  return this.http.get<string[]>(`${this.complianceismsUrl}/AllUniqueDisplayNames`, { headers: this.getHeaders() });
}

//======================================================================== Send Email
sendEmailFromBackend(payload: {
  smtpUserName: string;
  smtpPassword: string;
  to: string;
  cc: string;
  subject: string;
  body: string;
}) {
  const apiUrl = 'https://ielc-coreapi1.azurewebsites.net/SendEmail/api/sendemail'; // 🔁 Replace with your actual backend API URL
  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': this.apiKey
   });
  return this.http.post(apiUrl, payload, {headers, responseType: 'text' });
}
//---------------------------------------------------------------------------------------Events Alerts
eventschedulerAdminUrl='https://ielc-coreapi1.azurewebsites.net/EventSchedulerAdmin/';


GetEventSchedulerAdmin(): Observable<string[]> {
  return this.http.get<string[]>(`${this.eventschedulerAdminUrl}`, { headers: this.getHeaders() });
}

  GetEventSchedulerAdminId(id: number): Observable<any> {
      return this.http.get<any>(`${this.eventschedulerAdminUrl}/${id}`, { headers: this.getHeaders() });
    }

 PostEventSchedulerAdmin(data: any): Observable<any> {
      return this.http.post<any>(this.eventschedulerAdminUrl, data, { headers: this.getHeaders() });
    }

  DeleteEventSchedulerAdmin(id: any): Observable<void> {
      return this.http.delete<void>(`${this.eventschedulerAdminUrl}/${id}`, { headers: this.getHeaders() });
    } 

  UpdateEventSchedulerAdmin(id: number, updatedData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': this.apiKey
   });
  return this.http.put(`${this.eventschedulerAdminUrl}/${id}`, JSON.stringify(updatedData), { headers });
}
//---------------------------------------------------------------------------------------------------------EventSchedulerAdmin
eventschedulerUserUrl='https://ielc-coreapi1.azurewebsites.net/EventSchedulerUser';

GetEventSchedulerUser(year: string, month: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.eventschedulerUserUrl}/${year}/${month}`, {
    headers: this.getHeaders()
  });
}
GetEventSchedulerUserId(year: string, month: string, id: number): Observable<any> {
  return this.http.get<any>(
    `${this.eventschedulerUserUrl}/user/${year}/${month}/${id}`,
    { headers: this.getHeaders() }
  );
}

PostEventSchedulerUser(year: string, month: string, payload: any): Observable<void> {
  return this.http.post<void>(
    `${this.eventschedulerUserUrl}/user/${year}/${month}`,
    payload, // ✅ send payload directly, not wrapped
    { headers: this.getHeaders() }
  );
}


DeleteEventSchedulerUser(year: string, month: string, id: number): Observable<void> {
  return this.http.delete<void>(`${this.eventschedulerUserUrl}/user/${year}/${month}/${id}`, {
  headers: this.getHeaders()
  });
}

UpdateEventSchedulerUser(year: string, month: string, id: number, updatedData: any): Observable<void> {
  return this.http.put<void>(
    `${this.eventschedulerUserUrl}/user/${year}/${month}/${id}`,
    JSON.stringify(updatedData),
    { headers: this.getHeaders() }
  );
}

GetEventSchedulerUserByDeptYearMonth(department: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.eventschedulerUserUrl}/auditee/latest`, {
    params: { department }, // add department as query param if needed
    headers: this.getHeaders()
  });
}

GetEventSchedulerUserAuditeesDept(): Observable<string[]> {
  return this.http.get<string[]>(`${this.eventschedulerUserUrl}/auditees/latest`, { headers: this.getHeaders() });
}

checkScheduleExists(department: string, starting: string, time: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.eventschedulerUserUrl}/check/latest`, {
    params: { department, starting, time },
    headers: this.getHeaders()
  });
}

UpdateEventScheduleByDepartment(data: {
  ID: number;
  AUDITEEDEPARTMENT: string;
  STARTING: string;
  TIME: string;
  AUDITEES: string;
  AUDITORS: string;
}): Observable<any> {  // <-- Change from void to any
  return this.http.put(
    `${this.eventschedulerUserUrl}/update-by-department/latest`,
    data,
    { headers: this.getHeaders(), responseType: 'json' }
  );
}


GetEventScheduleruseryearbylatestId(id: number): Observable<any> {
  return this.http.get<any>(
    `${this.eventschedulerUserUrl}/user/latest/${id}`,
    { headers: this.getHeaders() }
  );
}


GetBookedTimes(date: string): Observable<string[]> {
  return this.http.get<string[]>(
    `${this.eventschedulerUserUrl}/available-times/latest`,
    {
      headers: this.getHeaders(),
      params: { date }
    }
  );
}

// GetBookedTimes(date: string): Observable<string[]> {
//   return this.http.get<string[]>(
//     `${this.eventschedulerUserUrl}/booked-times/latest`,
//     {
//       headers: this.getHeaders(),
//       params: { date }
//     }
//   );
// }

//  GetLatestEvent(): Observable<string[]> {
//     return this.http.get<any[]>(`${this.eventschedulerUrl}/latest`, { headers: this.getHeaders() });

//   }
  //https://ielc-coreapi1.azurewebsites.net/EventSchedulerUser/latest

// GetEventsscfilterprojects(displayname: string): Observable<any> {
//   return this.http.get<any>(`${this.EventSchedulerUser}EventSchedulerUser/userprojectsbydisplayname/${displayname}`, { headers: this.getHeaders() });
// }

// GetByProjectsevents(): Observable<string[]> {
//   return this.http.get<any[]>(`${this.EventSchedulerUser}EventSchedulerUser/auditees`, { headers: this.getHeaders() })
// }
//-------------------------------------------------------------------------------------------------------EventSchedules
eventscheduleUrls='https://ielc-coreapi1.azurewebsites.net/EventSchedules';
GetEventSchedules(year: string, month: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.eventscheduleUrls}/${year}/${month}`, {
    headers: this.getHeaders()
  });
}
GetEventSchedulesId(year: string, month: string, id: number): Observable<any> {
  return this.http.get<any>(
    `${this.eventscheduleUrls}/schedule/${year}/${month}/${id}`,
    { headers: this.getHeaders() }
  );
}

GetEventSchedulesyearbylatestId(id: number): Observable<any> {
  return this.http.get<any>(
    `${this.eventscheduleUrls}/schedule/latest/${id}`,
    { headers: this.getHeaders() }
  );
}

UpdateEventSchedules(year: string, month: string, id: number, payload: any): Observable<void> {
  return this.http.put<void>(
    `${this.eventscheduleUrls}/schedule/${year}/${month}/${id}`,
    JSON.stringify(payload),
    { headers: this.getHeaders() }
  );
}

UpdateEventScheduleslatest(id: number, updateData: any): Observable<void> {
  return this.http.put<void>(
    `${this.eventscheduleUrls}/schedule/latest/${id}`,
    JSON.stringify(updateData),
    { headers: this.getHeaders() }
  );
}


 GetLatestEvent(): Observable<string[]> {
    return this.http.get<any[]>(`${this.eventscheduleUrls}/latest`, { headers: this.getHeaders() });

  }
//-------------------------------------------------------------------------------------------------------EventSchedules
//rough
eventscheduleUrl='https://ielc-coreapi1.azurewebsites.net/';


  UpdateEventScheduleadmin(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.eventscheduleUrl}/EventSchedulerUser/schedule/${id}`, updatedData,{headers, observe: 'response' });
}
//-------------------------------------------------------------------------------------------------------EventSchedulerUser
eventschedulertime = 'https://ielc-coreapi1.azurewebsites.net';
eventschedulertimes = 'https://ielc-coreapi1.azurewebsites.net/times';

GetEventSchedulerTime(year: string, month: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.eventschedulertime}/EventSchedulerTime/Get/${year}/${month}`, {
    headers: this.getHeaders()
  });
}

GetEventSchedulersTime(year: string, month: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.eventschedulertime}/EventSchedulerTime/geteventschedulertime/${year}/${month}`, {
    headers: this.getHeaders()
  });
}

GetEventSchedulerTimeIds(year: string, month: string): Observable<string[]> {
  return this.http.get<any[]>(`${this.eventschedulertime}/EventSchedulerTime/timesid/${year}/${month}`, { headers: this.getHeaders() })
}

GetEventSchedulerTimeId(year: string, month: string, id: number): Observable<any> {
  return this.http.get<any>(
    `${this.eventschedulertime}/EventSchedulerTime/times/${year}/${month}/${id}`,
    { headers: this.getHeaders() }
  );
}

GetAvailableMonthsByYear(year: string): Observable<string[]> {
  return this.http.get<any[]>(`${this.eventschedulertime}/EventSchedulerTime/getmonthsfromtables/${year}`, { headers: this.getHeaders() })
}

PostEventSchedulerTime(year: string, month: string, time: string): Observable<void> {
  return this.http.post<void>(
    `${this.eventschedulertime}/EventSchedulerTime/times/${year}/${month}`,
    { time }, // wrap in object
    { headers: this.getHeaders() }
  );
}

UpdateEventSchedulerTime(year: string, month: string, id: number, time: string): Observable<void> {
  return this.http.put<void>(
    `${this.eventschedulertime}/EventSchedulerTime/times/${year}/${month}/${id}`,
    JSON.stringify(time),
    { headers: this.getHeaders() }
  );
}

DeleteEventSchedulerTime(year: string, month: string, id: number): Observable<void> {
  return this.http.delete<void>(`${this.eventschedulertime}/EventSchedulerTime/times/${year}/${month}/${id}`, {
  headers: this.getHeaders()
  });
}

// GetBookedTimes(date: string): Observable<string[]> {
//   return this.http.get<string[]>(
//     `${this.eventschedulertime}/EventSchedulerTime/times/exclude/latest`,
//     {
//       headers: this.getHeaders(),
//       params: { date }
//     }
//   );
// }
//https://ielc-coreapi1.azurewebsites.net/EventSchedulerTime/times/exclude/latest?selectedTime=06%3A30%20PM%20%E2%80%93%2008%3A00%20PM
//---------------------------------------------------------------------------------------EventSchedulerTime
coownersurl = 'https://ielc-coreapi1.azurewebsites.net/CoOwners';

GetCoOwners(): Observable<string[]> {
  return this.http.get<any[]>(`${this.coownersurl}`, { headers: this.getHeaders() })
}

GetCoOwnersId(id: number): Observable<any> {
  return this.http.get<any>(
    `${this.coownersurl}/${id}`,
    { headers: this.getHeaders() }
  );
}

GetCoOwnersSuperOwners(): Observable<string[]> {
  return this.http.get<string[]>(`${this.coownersurl}/superowners`, { headers: this.getHeaders() });
}

GetCoOwnersAllAuditees(): Observable<string[]> {
  return this.http.get<string[]>(`${this.coownersurl}/allauditeeslist`, { headers: this.getHeaders() });
}

GetCoOwnersfilterprojects(): Observable<string[]> {
  return this.http.get<string[]>(`${this.coownersurl}/project`, { headers: this.getHeaders() });
}

GetCoOwnersUserByProjects(displayname: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.coownersurl}/userprojectsbydisplayname/${displayname}`, { headers: this.getHeaders() });
}

GetCoOwnersAllProjects(department: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.coownersurl}/projects`, { params: { department }, headers: this.getHeaders() })
}

GetCoOwnersAllProjectsList(): Observable<string[]> {
  return this.http.get<string[]>(`${this.coownersurl}/projects`, { headers: this.getHeaders() })
}

GetCoOwnersUniqueName(): Observable<string[]> {
  return this.http.get<string[]>(`${this.coownersurl}/uniqueusers`, { headers: this.getHeaders() });
}

PostCoOwners(data: any): Observable<any> {
      return this.http.post<any>(this.coownersurl, data, { headers: this.getHeaders() });
    }
    DeleteCoOwners(id: number): Observable<void> {
      return this.http.delete<void>(`${this.coownersurl}/${id}`, {
        headers: this.getHeaders()
      });
    }

   UpdateCoOwners(id: number, updatedData: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.put<any>(`${this.coownersurl}/${id}`, updatedData,{headers, observe: 'response' });
    }
//---------------------------------------------------------------------------------------CoOwners 
createeventtablesurl = 'https://ielc-coreapi1.azurewebsites.net/AddNewTables/createeventtables';

createEventTables(): Observable<any> {
  return this.http.post(this.createeventtablesurl, {}, {
    headers: this.getHeaders(),
    responseType: 'text' as 'json' // 🛠️ trick to let Angular parse string as JSON
  });
}
//---------------------------------------------------------------------------------------CreateTables



}
