import { Component,OnInit,ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { __values } from 'tslib';
import { NgForm } from '@angular/forms';
import { IelcapiService } from '../ielcapi.service';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { forkJoin, Observable } from 'rxjs';
import { EmailService } from 'src/app/email.service';
declare var Email: any;




interface holidaysinfo{
  date: string;
  content: string;
}
interface eventsinfo{
  id: number;
  eventData: string;
  eventName: string;
}
interface exam{
  id: number;
  examTime: number;
  batchLimitMembers: number;
  displayExamQuestions: number;
  standardExamQuestions: number;
  examPercentage: number;
}
interface examlisinfot{
  testTakenDate: string | null;
}
interface feedback{
  subjectMatterKnowledge: string;
  presentation: string;
  communication: string;
  handlingDoubts: string;
  applicationtowork: string;
  comments: string;
}

interface Result{
  result: string;
  percentage: string;
  testTakenDate: string;
}
interface crserest {
  id: number;
  coursesList: string;
}
interface SkillSession {
  sessionID: number;
  skillName: string;
  aadUsersData?: string; 
  groups?: string;
 
}

interface EnrollmentData {
  enrollmentID: number;
  name: string;
  firstName: string;
  lastName: string;
  mail: string;
  mobile: number;
  skillName: string;
  date: string;
  time: string;
  venue: string;
  batchmembers: number;
  enrollmentDate: string;
  startDate: string | null;
  endDate: string | null;
  result: string;
  percentage: string;
  testTakenDate: string;
  subjectMatterKnowledge: string;
  presentation: string;
  communication: string;
  handlingDoubts: string;
  applicationtowork: string;
  comments: string;
  sessionID: number;
}
interface EmailPayload {
  smtpUserName: string;
  smtpPassword: string;
  to: string;
  cc: string;
  subject: string;
  body: string;
}



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  // @Input() enrollmentList: any[] = [];
  // @Input() submittedFeedbackIds: string[] = [];
  
  // hasSubmittedFeedback(id: string): boolean {
  //   return this.submittedFeedbackIds.includes(id);
  // }

  enrollmentList: any[] = [];
  submittedFeedbackIds: any[] = [];
  submittedResultIds: any[] = [];
  loadingExamResults = true;
  @ViewChild('registration') registration!: NgForm;
 // currentDate:Date=new Date()

 selectedDate:string=''
 examlist: any[] = []; 
 Registeredusers: any[] = []; 
 isLoading = true;
 feedbackLoaded = false;
 skillname='';
 mode='';
 date:string = '';
 time:string = '';
 mobile='';
 examdata:exam={
  id: 0,
  examTime: 0,
  batchLimitMembers: 0,
  displayExamQuestions: 0,
  standardExamQuestions: 0,
  examPercentage: 0
 }
 leave='';
 // month=''
 // year=''
 work='';
 taskslist=''
 email='incidents@inteqsolutions.com'
 holidayslist: any[] = []; 
 holidaysdata:holidaysinfo={
  date: '',
  content: ''
 }
 eventslist: any[]=[];
 eventsdata:eventsinfo={
  id: 0,
  eventData: '',
  eventName: ''
 }
latestEvent: any= null; 
page: number = 1;  
itemsPerPage: number = 5; 
Enrolledskills: any[] = []; 
venueList: any[]=[];   
selectedVenue: string = '';
selectDate: string = '';
selectedTime: string = '';
availableDates: string[] = [];
availableTimes: string[] = [];
visibleSessionIds: SkillSession[] = [];
showDateTimeDropdowns: boolean = false;
// submittedFeedbackIds: number[] = [];
batchMemberCount: number = 0;
sessionID: number = 0;
currentUser: any = {};
allSkillSessions: any[] = [];
constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute,private emailService: EmailService){
   this.selectedDate= new Date().toISOString().split('T')[0]
   this.isTimeInputDisabled=true;
   this.GetHolidayslist();
   this.GetEventsList();
   this.GetExamlist();
  this.GetCourseist();
   if (this.eventslist && this.eventslist.length > 0) {
    this.eventslist = this.eventslist.sort((a, b) => Number(b.id) - Number(a.id));
  }
  
  this.Registeredusers.forEach((item) => {
    if (item.testTakenDate) {
      // Convert the string to a valid Date object
      item.testTakenDate = this.formatCustomDate(item.testTakenDate);
    }
  });
 }

convertToISODate(dateStr: string): string | null {
  // console.log('🔍 Converting date:', dateStr);

  if (!dateStr || typeof dateStr !== 'string') {
    // console.warn('⚠️ Invalid date input:', dateStr);
    return null;
  }

  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    const result = isoDate.toISOString().split('T')[0];
    // console.log('✅ Parsed ISO Date:', result);
    return result;
  }

  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (day.length <= 2 && month.length <= 2 && year.length === 4) {
      const result = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      // console.log('✅ Reconstructed Date:', result);
      return result;
    }
  }
  return null;
}

 formatCustomDate(dateStr: string | null): string {
  if (!dateStr) return 'Invalid Date';

  // Normalize spaces
  const normalizedDateStr = dateStr.replace(/\s+/g, ' ');

  // Parse using Moment.js (matching your API's format)
  const parsedDate = moment(normalizedDateStr, 'MMM D YYYY h:mmA');

  // Check if the parsing was successful
  if (!parsedDate.isValid()) {
    return 'Invalid Date';
  }

  // Format the date as required
  return parsedDate.format('MMM D, YYYY'); // Example: "Oct 3, 2024"
}

 userName: string | null = null;
 userEmail: string | null = null;
 firstName: string = '';
 middleName: string = '';
 lastName: string = '';
async ngOnInit() {
  
  try {
    await this.msalService.instance.initialize();  
    await this.msalService.instance.handleRedirectPromise();
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount) {
      this.router.navigate(['/login']);
      return;
    } 
    this.authService.setActiveAccount();
    this.authService.userDetails$.subscribe(userDetails => {
      this.currentUser = userDetails;  
      this.userName = userDetails?.displayName ;
      this.userEmail = userDetails?.email;

      if (userDetails?.displayName) {
        const nameParts = userDetails.displayName.trim().split(' ');
        this.firstName = nameParts[0] || '';
        this.lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
        this.middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';
      }
      
    
    });
    this.authService.userDetails$.subscribe(userDetails => {
      if (userDetails) {
        this.userEmail = userDetails.email; // Ensure the email is correctly assigned
        this.GetAllUsers(); // Call this AFTER we get the email
        this.GetAllSkillSessions(); 
        this.checkUserExists();
        this.checkCoOwnerUserExists();
      }
    });   
  }
   catch (error) {
    // console.error("MSAL initialization error in HeaderComponent:", error);
  }
  
}
 logout(): void {
  this.authService.logout();
}
sortRegisteredUsers(data: any[]): any[] {
  return data.sort((a, b) => (a.enrollmentID > b.enrollmentID ? -1 : a.enrollmentID < b.enrollmentID ? 1 : 0));
}

GetAllUsers() {
  this.ielc.GetUsers().subscribe((data) => {
    const aadEmail = this.userEmail;

    if (aadEmail) {
      this.Registeredusers = this.sortRegisteredUsers(
        data.filter(user => user.mail === aadEmail)
      ).map(user => {
        const hasFeedback = user.subjectMatterKnowledge &&
                            user.presentation &&
                            user.communication &&
                            user.handlingDoubts &&
                            user.applicationtowork;

        return {
          ...user,
          testTakenDate: user.testTakenDate ? this.formatCustomDate(user.testTakenDate) : null,
          hasFeedback: hasFeedback
        };
      });

      // Also store enrollment IDs for any other logic
      this.submittedFeedbackIds = this.Registeredusers
        .filter(user => user.hasFeedback)
        .map(user => user.enrollmentID);

    } else {
      this.Registeredusers = [];
    }
    // console.log("✅ Final Registered Users:", this.Registeredusers);
    this.feedbackLoaded = true;
  });
}

hasSubmittedFeedback(enrollmentID: string): boolean {
  return this.submittedFeedbackIds.includes(enrollmentID);
}

onSkillChange(skill: string) {
  if (skill) {
    this.ielc.GetEnrolledSessions().subscribe((data: any[]) => {
      const today = new Date();
      // console.log('🎯 Raw session data:', data);
      // console.log('🧩 Visible session IDs:', this.visibleSessionIds);

      // Group sessions by skill name
      const skillSessionMap = new Map<string, any[]>();

      // Group the sessions based on skill name and filter by active sessions
      this.visibleSessionIds.forEach((session: any) => {
        // console.log('🧩 Session being processed:', session); // Log session structure
        
        const skillName = (session.skillName ?? '').trim();
        const skillKey = skillName.toLowerCase();
        const sessionEndDate = new Date(session.toDate);
        const isActive = sessionEndDate >= today;


        // if (skill.toLowerCase() === skillKey && isActive) {
          if (skill.trim().toLowerCase() === skillKey && isActive) {

          // Add active sessions to the map for this skill
          if (!skillSessionMap.has(skillKey)) {
            skillSessionMap.set(skillKey, []);
          }
          skillSessionMap.get(skillKey)!.push(session);
        }
      });

      // Now filter out the sessions based on the selected skill and only active ones
      const activeSkillSessions = skillSessionMap.get(skill.trim().toLowerCase()) || [];
      
      // Only active venues for this skill will be considered
      if (activeSkillSessions.length > 0) {
        // Extract venue names directly from the `venue` property
        const venues = activeSkillSessions.map(session => session.venue).filter((value, index, self) => self.indexOf(value) === index);

        // console.log('✅ Filtered venue list for active sessions:', venues);

        // Update venue list based on filtered venues
        this.venueList = venues;
        this.selectedVenue = ''; // Reset selected venue
        this.showDateTimeDropdowns = false;
        this.availableDates = [];
        this.availableTimes = [];
      } else {
        // No active sessions for the selected skill
        this.venueList = [];
      }
    });
  }
}

convertToDDMMYYYY(dateStr: string): string {
  const [mm, dd, yyyy] = dateStr.split('-');
  return `${dd}-${mm}-${yyyy}`;
}

onVenueChange(venue: string) {
  this.showDateTimeDropdowns = ['Teams', 'Offline'].includes(venue);
//debugger;
  if (this.showDateTimeDropdowns && this.skillname) {
    const trimmedSkillname = this.skillname.trim();
    this.ielc.GetEnrolledSessionsbydate(trimmedSkillname,venue).subscribe({
      next: (res) => {
        const now = new Date();
        const activeRanges = new Set<string>();

        // this.visibleSessionIds.forEach((session: any) => {
        //   const skillName = (session.skillName ?? '').trim().toLowerCase();
        //   if (skillName !== trimmedSkillname.toLowerCase()) return;

        this.visibleSessionIds.forEach((session: any) => {
    const skillName = (session.skillName ?? '').trim().toLowerCase();
    const venueName = (session.venue ?? '').trim().toLowerCase(); // get venue

    // Check both skillName and venue
    if (skillName !== trimmedSkillname.toLowerCase() || venueName !== venue.toLowerCase()) return;


          const [hour, minute, second] = (session.skillStartTime ?? '00:00:00').split(':').map(Number);
          const sessionEndDateTime = new Date(session.toDate);
          sessionEndDateTime.setHours(hour || 0, minute || 0, second || 0, 0);

          const isActive = sessionEndDateTime >= now;
          // console.log(`📅🕒 Comparing session end datetime with now: ${sessionEndDateTime.toLocaleString()} >= ${now.toLocaleString()} -> ${isActive}`);

          if (isActive) {
            const formattedFrom = this.formatDate(session.fromDate);
            const formattedTo = this.formatDate(session.toDate);
            const range = `${formattedFrom} to ${formattedTo}`;
            activeRanges.add(range);
          }
        });
        //this.availableDates = res.filter((range: string) => activeRanges.has(range));
        this.availableDates = Array.from(activeRanges);
        console.log(this.availableDates);
        console.log(activeRanges);
      },
      error: (err) => {
        // console.error('Error fetching dates:', err);
        this.availableDates = [];
      }
    });
  } else {
    this.availableDates = [];
    this.availableTimes = [];
    this.date = '';
    this.time = '';
    this.batchMembersCount = 0;
  }
}

formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  //return `${day}-${month}-${year}`;
  return `${year}-${month}-${day}`;
}


onDateChange() {
  if (!this.date) return;

  this.ielc.getEnrollmentSessionsBySkillAndDateRange(this.skillname, this.date)
    .subscribe(
      (res: string) => {
        // If the backend returns a comma-separated string, split it into an array
        this.availableTimes = res ? res.split(',').map(time => time.trim()) : [];
        console.log('Available times:', this.availableTimes);
      },
      (err) => {
        console.error('❌ Error fetching time slots:', err);
        this.availableTimes = [];
      }
    );
}



// onDateChange() {
//   if (!this.date) return;
// debugger;
//   this.ielc.getEnrollmentSessionsBySkillAndDateRange(this.skillname, this.date).subscribe({
//     next: (res) => {
//       if (Array.isArray(res)) {
//         // Backend returned array of time slots
//         this.availableTimes = res;
//       } else if (typeof res === 'string') {
//         // Backend returned "No time ranges found..."
//         this.availableTimes = [];
//         console.warn(res);
//       } else {
//         // Unexpected format
//         this.availableTimes = [];
//       }
//     },
//     error: (err) => {
//       console.error('❌ Error fetching time slots:', err);
//       this.availableTimes = [];
//     }
//   });
// }



batchMembersCount: number = 0;
onBatchInputChange() {
  if (this.skillname && this.date && this.time) {
    this.checkBatchAvailability();
  } else {
    this.batchMembersCount = 0;
  }
}

checkBatchAvailability() {
  if (!this.skillname || !this.date || !this.time) {
    this.batchMembersCount = 0;
    return;
  }

  this.ielc.GetBatchMembers(this.skillname, this.date, this.time).subscribe({
    next: (count: number) => {
      if (typeof count === 'number') {
        this.batchMembersCount = count+1;
        if (this.batchMembersCount >= 150) {
          alert('Batch is full. Please choose another Date/Time slot.');
        }
      } else {
        // console.warn('⚠️ Invalid count from API:', count);
        this.batchMembersCount = 0;
      }
    },
    error: (err) => {
      if (err.status === 404) {
        // No batch yet, set count to 0
        this.batchMembersCount = 0;
      } else {
        // console.error('❌ Error fetching batch count:', err);
        this.batchMembersCount = 0;
        alert('Error checking batch availability.');
      }
    }
  });
}

// GetSessionID() {
//   this.ielc.GetSkillnameVenueDateTimeDetails(
//     this.selectedSkill,
//     this.selectedVenue,
//     this.selectedDate,
//     this.selectedTime
//   ).subscribe((data) => {
//     this.sessionID = data;
//     console.log("SessionID:", this.sessionID);
//   });
// }

GetSessionIDAllDetails() {
  //debugger;
  if (!this.skillname || !this.selectedVenue || !this.date || !this.time) {
    console.warn('Missing required parameters for getting session ID');
    return;
  }
  this.ielc.GetSkillnameVenueDateTimeDetails(
    this.skillname,
    this.selectedVenue,
    this.date,
    this.time
  ).subscribe({
    next: (data) => {
      // If data is an array, extract the first element and convert to number
      if (Array.isArray(data) && data.length > 0) {
        this.sessionID = Number(data[0]);
      } else {
        this.sessionID = Number(data);
      }
      console.log("SessionID:", this.sessionID);
    },
    error: (err) => {
      console.error('Error getting session ID:', err);
      this.sessionID = 0;
    }
  });
}

GetSessionIDSkillVenueDetails() {
  debugger;
  if (!this.skillname || !this.selectedVenue) {
    console.warn('Missing required parameters for getting session ID');
    return;
  }
  this.ielc.GetSkillnameVenueDetails(
    this.skillname,
    this.selectedVenue,
  ).subscribe({
    next: (data) => {
      // If data is an array, extract the first element and convert to number
      if (Array.isArray(data) && data.length > 0) {
        this.sessionID = Number(data[0]);
      } else {
        this.sessionID = Number(data);
      }
      console.log("SessionID:", this.sessionID);
    },
    error: (err) => {
      console.error('Error getting session ID:', err);
      this.sessionID = 0;
    }
  });
}


allowEnrollment() {
  //debugger;
  const now = new Date();
  const fullName = `${this.firstName} ${this.lastName}`;
  let startDate = '';
  let endDate = '';

  if (this.date?.includes(' - ')) {
    [startDate, endDate] = this.date.split(' - ');
  } else {
    startDate = this.date || '';
    endDate = this.date || '';
  }
  const formattedNow = now.toISOString().split('T')[0]; 
  // If startDate or endDate empty, assign current date
  if (!startDate) startDate = formattedNow;
  if (!endDate) endDate = formattedNow;

  const skill = this.skillname;
  const date = this.date;
  const time = this.time;
  const mail = this.userEmail ?? '';
  

  if (this.selectedVenue === 'Teams' || this.selectedVenue === 'Offline') {
    this.ielc.checkIfAlreadyEnrolled(skill, date, time, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
        if (alreadyEnrolled) {
          alert('You are already enrolled for this batch!');
          return;
        }
        //this.GetSessionIDAllDetails();
        const batchCountToInsert = this.selectedVenue === 'Teams' ? this.batchMembersCount : 0;
        this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedVenue, batchCountToInsert, startDate, endDate, now);
      },
      error: (err) => {
        // console.error('❌ Error checking enrollment status:', err);
        alert('Failed to verify enrollment status. Please try again.');
      }
    });
  } else if (this.selectedVenue === 'Self-Learning') {
    this.ielc.checkVenueEnrollment(skill, this.selectedVenue, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
      //this.GetSessionIDSkillVenueDetails();
        if (alreadyEnrolled) {
          alert('You are already enrolled for this skill!');
          return;
        }
        const batchCountToInsert = 0;
        this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedVenue, batchCountToInsert, startDate, endDate, now);
        // window.location.reload();
      },
      error: (err) => {
        console.error('❌ Error checking  enrollment:', err);
        if (err.error?.errors) {
          // Log detailed field-level validation issues
          for (const field in err.error.errors) {
            if (err.error.errors.hasOwnProperty(field)) {
              console.error(`❌ Validation failed: ${field} -> ${err.error.errors[field]}`);
            }
          }
        }
        alert('Failed to verify enrollment. Please try again.');
      }
    });

  } else {
    // For other venues, skip duplicate check for now
    const batchCountToInsert = 0;
    this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedVenue, batchCountToInsert, startDate, endDate, now);
  }
}

proceedToEnroll(
  fullName: string, mail: string, skill: string, date: string, time: string,
  venue: string, batchCount: number, startDate: string, endDate: string, now: Date
)
{
  const convertedStart = this.convertToISODate(startDate?.trim()) || null;
  const convertedEnd = this.convertToISODate(endDate?.trim()) || null;

  const enrollmentData: EnrollmentData = {
    enrollmentID: 0,
    name: fullName,
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    mail: mail || '',
    mobile: Number(this.mobile) || 0,
    skillName: skill || '',
    date: date || '',
    time: time || '',
    venue: venue || '',
    batchmembers: batchCount,
    enrollmentDate: now.toISOString(),
    startDate: convertedStart,
    endDate: convertedEnd,
    result: '',
    percentage: '',
    testTakenDate: '',
    subjectMatterKnowledge: '',
    presentation: '',
    communication: '',
    handlingDoubts: '',
    applicationtowork: '',
    comments: '',
    //sessionID: this.sessionID,
    sessionID: 100,
  };
  // Log the full payload for debugging
  console.log("Enrollment payload:", JSON.stringify(enrollmentData, null, 2));
  this.ielc.enrollUser(enrollmentData).subscribe({
    next: () => {
      alert('Enrollment successful! A confirmation email will be sent shortly.');
      this.resetForm();
      this.GetAllUsers();
      const sessionDescription = this.getSessionDescription(skill, venue, date, time);
      const subject = 'Session Invitation Link';
      const body = `
        <p>Thanks for the Registration!</p>
        <p>Attend the meeting SkillName\\ Self-Learning\\ Recorded using below link:</p>
        <p>
        <a href="${sessionDescription}" target="_blank" style="color: #007bff; text-decoration: underline;">
          Click here to access the session
        </a>
        </p>
        <br>
        <table style="border: 1px solid #ddd; border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">SkillName</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Time</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Venue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${fullName}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${skill}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${date}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${time}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${venue}</td>
            </tr>
          </tbody>
        </table>
        <br>
      `;

      this.emailService.sendEmail(mail, '', subject, body);
    },
    error: (err) => {
      console.error('❌ Enrollment error:', err);

      if (err.error?.errors) {
        for (const field in err.error.errors) {
          if (err.error.errors.hasOwnProperty(field)) {
            console.error(`❌ Validation failed: ${field} -> ${err.error.errors[field]}`);
          }
        }
      }
      alert('Enrollment failed. Please try again.');
    }
  });
}

resetForm(): void {
  this.mobile = '';
  this.skillname = '';
  this.date = '';
  this.time = '';
  this.selectedVenue = '';
  this.batchMembersCount = 0;
}

getSessionDescription(skill: string, venue: string, date: string, time: string): string {
  const [selectedStartDate, selectedEndDate] = date.split(' - ').map(this.convertDDMMYYYYToYYYYMMDD);
  const matchedSession = this.allSkillSessions.find((session: any) => {
    const sessionStartDate = this.convertToYYYYMMDD(session.fromDate);
    const sessionEndDate = this.convertToYYYYMMDD(session.toDate);
    const sessionTime = `${this.convertTo12HourFormat(session.skillStartTime)} - ${this.convertTo12HourFormat(session.skillEndTime)}`;
    if (venue === 'Teams') {
      return session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
             session.venue?.trim().toLowerCase() === venue.trim().toLowerCase() &&
             (selectedStartDate >= sessionStartDate && selectedEndDate <= sessionEndDate) &&
             time === sessionTime;
    } else {
      return session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
             session.venue?.trim().toLowerCase() === venue.trim().toLowerCase();
    }
  });
  return matchedSession?.skillDescription ?? 'No description available';
}
convertTo12HourFormat(time: string): string {
  const [hour, minute] = time.split(':');
  const period = +hour >= 12 ? 'PM' : 'AM';
  const hour12 = +hour % 12 || 12;
  return `${hour12}:${minute} ${period}`;
}
convertDDMMYYYYToYYYYMMDD(dateStr: string): string {
  const [dd, mm, yyyy] = dateStr.split('-');
  return `${yyyy}-${mm}-${dd}`;
}

convertToYYYYMMDD(dateStr: string): string {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

allowOnlyDigits(event: KeyboardEvent) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

validatePastedMobile(event: ClipboardEvent) {
  const pastedInput: string = event.clipboardData?.getData('text') ?? '';
  const isValid = /^[6-9]\d{9}$/.test(pastedInput.trim());

  if (!isValid) {
    event.preventDefault();
  }
}


handleFeedbackClick(item: any): void {
  if (item.result === 'Completed') {
    this.router.navigate(['/feedback'], {
      queryParams: {
        skill: item.skillName,
        enrollment: item.enrollmentID
      }
    });
  } else {
    alert('You must complete the test before giving feedback.');
  }
}

getExamPercentage(): number {
  return this.examlist.length > 0 ? this.examlist[0].examPercentage : 0;
}
isTestCompleted(item: any): boolean {
  return item.result && item.percentage !== null && item.testTakenDate;
}

isTestPassed(item: any): boolean {
  return this.isTestCompleted(item) && item.percentage >= this.getExamPercentage();
}


selectedSkill: string = '';
setSelectedSkill(skillName: string, enrollmentID: number, sessionID: number) {
  this.router.navigate(['/exampage'], { queryParams: { skill: skillName, enrollment: enrollmentID, session: sessionID } });
}

setSelectedSkillandId(skillName: string, enrollmentID: number) {
  this.router.navigate(['/feedback'], { queryParams: { skill: skillName, enrollment: enrollmentID } });
}


sortRegisteredUsersbysession(data: any[]): any[] {
  return data.sort((a, b) => (a.sessionID > b.sessionID ? -1 : a.sessionID < b.sessionID ? 1 : 0));
}

Enrolledusers: any[] = []; 
topSkillName: string = '';
GetAllSkillSessions() {
  const loggedInEmail = (this.userEmail ?? '').toLowerCase();

  forkJoin({
    sessions: this.ielc.GetSkillSessions(),
    
    aadUsers: this.ielc.GetAadUserslist(),
    aadGroups: this.ielc.GetAadUserGroupslist()
  }).subscribe(({ sessions, aadUsers, aadGroups }) => {
    const validGroups = aadGroups.map((g: any) => g.displayName?.trim()).filter(Boolean);
    const visibleSessions: any[] = [];
    this.allSkillSessions = sessions;
    // console.log('🗃️ All sessions:', this.allSkillSessions);

    const processSessions = async () => {
      for (const session of sessions) {
        const skill = session.skillName;
        const sessionUsers: string[] = (session.aadUsersData || '')
          .split(',').map((u: string) => u.trim().toLowerCase()).filter(Boolean);
  
        const sessionGroups: string[] = (session.groups || '')
          .split(',').map((g: string) => g.trim()).filter(Boolean);
  
        let isUserAssigned = sessionUsers.includes(this.userEmail?.toLowerCase() ?? '');
        let isGroupAssigned = false;
  
        for (const group of sessionGroups) {
          if (group && validGroups.includes(group)) {
            try {
              const groupMembers = await this.ielc.getUsersOfGroup(group).toPromise();
              const lowerGroupMembers = groupMembers.map((m: any) => m.toLowerCase());
              if (lowerGroupMembers.includes(this.userEmail?.toLowerCase() ?? '')) {
                isGroupAssigned = true;
                break;
              }
            } catch (err) {
              // console.error(`❌ Failed to fetch members of group "${group}"`, err);
            }
          }
        }
  
        const isSessionPublic = sessionUsers.length === 0 && sessionGroups.length === 0;
        const hasAccess = isUserAssigned || isGroupAssigned || isSessionPublic;
  
        if (hasAccess) {
          visibleSessions.push(session);
        }
      }
  
      this.visibleSessionIds = visibleSessions;
      // console.log('✅ Final visible session IDs with skills:', visibleSessions);
  
      this.Enrolledusers = this.sortRegisteredUsersbysession(visibleSessions);
  
      if (!this.topSkillReady) {
        this.GetEnrolledSessionsSkillsData();  // <-- now safe to call after filtering
      }
    };
  
    processSessions();  // trigger async function
  });
}

topSkillReady = false;

GetEnrolledSessionsSkillsData() {
  const loggedInEmail = (this.userEmail ?? '').toLowerCase();

  this.ielc.GetEnrolledSessions().subscribe((data) => {
    // console.log('📦 Enrolled session data:', data);
    // console.log('🧩 Visible session IDs:', this.visibleSessionIds);

    if (this.visibleSessionIds && this.visibleSessionIds.length > 0) {
      const enrolledSkillNames = data.map((name: string) => name.trim().toLowerCase());
      const today = new Date();
      const now = new Date();
      const currentTime = now.toTimeString().split(' ')[0];
   
      // Normalize current date to midnight (00:00:00)
    const currentDateOnly = new Date(now.setHours(0, 0, 0, 0));  

    
      // Group sessions by skill name
      const skillSessionMap = new Map<string, any[]>();

      this.visibleSessionIds.forEach((session: any) => {
        const skillName = (session.skillName ?? '').trim();
        const skillKey = skillName.toLowerCase();
  const [hour, minute, second] = (session.skillStartTime ?? '00:00:00').split(':').map(Number);
  const sessionEndDateTime = new Date(session.toDate);
  sessionEndDateTime.setHours(hour || 0, minute || 0, second || 0, 0);

  const now = new Date();

  const isActive = sessionEndDateTime >= now;

  // console.log(`📅🕒 Comparing session end datetime with now: ${sessionEndDateTime.toLocaleString()} >= ${now.toLocaleString()} -> ${isActive}`);


        if (!enrolledSkillNames.includes(skillKey)) return; // Not an enrolled skill

        if (!skillSessionMap.has(skillKey)) {
          skillSessionMap.set(skillKey, []);
        }

        if (isActive) {
          skillSessionMap.get(skillKey)!.push(session); // Add only active sessions
        }
      });

      // Final enrolled skills with at least one active session
      this.Enrolledskills = Array.from(skillSessionMap.entries())
        .filter(([_, sessions]) => sessions.length > 0) // Ensure at least one valid session
        .map(([skillKey, sessions]) => ({
          skillName: sessions[0].skillName,
          sessions: sessions // only non-expired sessions
        }));

      const enrolledNames = this.Enrolledskills.map((s: any) => s.skillName);
      // console.log('🎯 Enrolled skills visible to user (unique, with active sessions):', enrolledNames);

      if (enrolledNames.length > 0) {
        this.topSkillName = enrolledNames[0];
      }
    } else {
      // console.warn('⚠️ No visible sessions stored from GetAllSkillSessions yet.');
      this.Enrolledskills = [];
    }
  });
}

 crserestlist: any[]=[];
 courseSkillNames: string[] = [];
 GetCourseist() {
  this.ielc.Getcourse().subscribe((data: crserest[]) => {
    this.crserestlist = data;

    // Extract and normalize all skill names from all course entries
    this.courseSkillNames = data
      .map((item) => item.coursesList)       // get each coursesList string
      .filter(Boolean)                       // filter out any null/undefined/empty
      .flatMap((list) =>
        list.split(',').map((skill) => skill.trim().toLowerCase())
      );

    // console.log('Filtered course skill names:', this.courseSkillNames);
  });
}

isSkillRestricted(skillName: string): boolean {
  return this.courseSkillNames.includes(skillName.trim().toLowerCase());
}

 GetHolidayslist(){
  this.ielc.Getholidays().subscribe((data) => {
    this.holidayslist=data;
  });
 }
 sortlist(data: any[]): any[] {
  return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

GetEventsList() {
  this.ielc.Getevents().subscribe((data) => {
    this.eventslist = data;

    // Sort by ID in descending order & get the first event
    this.latestEvent = this.eventslist.sort((a, b) => b.id - a.id)[0];
  });
}


GetExamlist() {
  this.ielc.Getexaminfo().subscribe((data: any[]) => {
    if (data) {
      this.examlist = data.map((item: any) => ({
        ...item,
        skillName: item.skillName ?? '',  
        examPercentage: Number(item.examPercentage),
        testTakenDate: item.testTakenDate
          ? moment(item.testTakenDate, 'MMM D YYYY hh:mmA').toDate()  // Convert to Date
          : null,
      }));
      // console.log("ex",data);
      // console.log("exam",this.examlist);
    }
    this.isLoading = false;
  });
  
}

checkUserExists() {
  this.GetAllUniqueNames().subscribe((usernames: string[]) => {
    this.showButton = !!(this.userName && usernames.includes(this.userName));
    if (this.showButton) {
      //console.log('Your username exists in the list.');
    } else {
      //console.log('Your username is NOT in the list.');
    }
  });
}
 
checkCoOwnerUserExists() {
  this.GetCOwnersAllUniqueNames().subscribe((usernames: string[]) => {
    this.coownersshowButton = !!(this.userName && usernames.includes(this.userName));
    if (this.coownersshowButton) {
      //console.log(this.coownersshowButton);
      //console.log('Your username exists in the list.');
    } else {
      //console.log('Your username is NOT in the list.');
    }
  });
}
 
GetAllUniqueNames(): Observable<string[]> {
  return this.ielc.GetUniqueName();
}

GetCOwnersAllUniqueNames(): Observable<string[]> {
  return this.ielc.GetCoOwnersUniqueName();
}
 
showButton: boolean = false;
coownersshowButton: boolean = false;
 

showData(registration:any)
{
}
save()
{
  alert('🚧 Feature under development. Implementation is currently in progress.');
}

modaldatasave(){
//  console.log(this.attendanceform.value);
//  this.attendanceform.resetForm();
}

// ngOnInit(): void {
//   this.checkiftimepassed()
// }
isTimeInputDisabled:boolean=true
time1=''
firsttimeentered:Date |null=null
 
onFirsttimechange()
{
  this.isTimeInputDisabled=!!this.time1
 //  this.calculatetime()
  this.isTimeInputDisabled = false;
}

  calendarOptions: CalendarOptions = {
   initialView: 'dayGridMonth',
   plugins: [dayGridPlugin]
 };

 time2:string=''
 showEaxtraHoursLabel:boolean=false
 checktime(){
   if(this.time2==="23:59"){
     this.showEaxtraHoursLabel=true;
    //  console.log(this.time2)
   }else{
     this.showEaxtraHoursLabel=false;
   }
 }

 leavetype=[
   {
     name: 'Full Day'
   },
   {
     name: 'Half Day'
   },
   {
     name: 'OH(Optional Holiday)'
   }
 ]


worktype=[
 {
   name: 'WFO(Work From Office)'
 },
 {
   name: 'WFH(Work From Home)'
 },
 {
   name: 'WFH/WFO'
 },
 {
   name: 'WFC(Work From Client)'
 }
]

isSecondSelectDisabled: boolean = false;
isfirstSelectDisabled: boolean = false;


 onSelect1Change() {
    this.isSecondSelectDisabled = !!this.leave
   if(this.leave==='Half Day')
     {
      this.isSecondSelectDisabled=false
     this.isTimeInputDisabled=false
   } 
 }
 onSelect2Change() {
   this.isfirstSelectDisabled = !!this.work;
   if(this.work)
   {
     this.isTimeInputDisabled=false
   }
   
 }


 
}
