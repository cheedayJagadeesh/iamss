import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
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

interface holidaysinfo {
  date: string;
  content: string;
}
interface auditevents{
  Id: number,
  auditeedepartment: string;
  auditees: string;
  startingdate: string;
  timeslot: string;
  auditors: string;
  location: string;
}
interface eventsinfo {
  id: number;
  eventData: string;
  eventName: string;
}
interface exam {
  id: number;
  examTime: number;
  batchLimitMembers: number;
  displayExamQuestions: number;
  standardExamQuestions: number;
  examPercentage: number;
}
interface examlisinfot {
  testTakenDate: string | null;
}
interface feedback {
  subjectMatterKnowledge: string;
  presentation: string;
  communication: string;
  handlingDoubts: string;
  applicationtowork: string;
  comments: string;
}

interface Result {
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
  skillDescription: string;
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


enrollmentList: any[] = [];
submittedFeedbackIds: any[] = [];
submittedResultIds: any[] = [];
loadingExamResults = true;
@ViewChild('registration') registration!: NgForm;
ID: number = 0;

selectedDate: string = ''
examlist: any[] = [];
Registeredusers: any[] = [];
isLoading = true;
feedbackLoaded = false;
skillname = '';
mode = '';
date: string = '';
time: string = '';
mobile = '';
examdata: exam = {
  id: 0,
  examTime: 0,
  batchLimitMembers: 0,
  displayExamQuestions: 0,
  standardExamQuestions: 0,
  examPercentage: 0
}
leave = '';
// month=''
// year=''
work = '';
taskslist = ''
email = 'incidents@inteqsolutions.com'
holidayslist: any[] = [];
holidaysdata: holidaysinfo = {
  date: '',
  content: ''
}
eventslist: any[] = [];
eventsdata: eventsinfo = {
  id: 0,
  eventData: '',
  eventName: ''
}

 auditeventsdata:auditevents={
  Id: 0,
  auditeedepartment: '',
  auditees: '',
  startingdate: '',
  timeslot: '',
  auditors: '',
  location: '',
 }

latestEvent: any = null;
page: number = 1;
itemsPerPage: number = 5;
Enrolledskills: any[] = [];
EnrolledskillsLearning: any[] = [];
EnrolledskillsTeams: any[] = [];
EnrolledskillsOffline: any[] = [];
venueList: any[] = [];
selectedVenue: string = '';
selectDate: string = '';
selectedTime: string = '';
availableDates: string[] = [];
availableTimes: string[] = [];
visibleSessionIds: SkillSession[] = [];
showDateTimeDropdowns: boolean = false;
batchMemberCount: number = 0;
currentUser: any = {};
allSkillSessions: any[] = [];

constructor(private ielc: IelcapiService, private msalService: MsalService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private emailService: EmailService){
  this.selectedDate = new Date().toISOString().split('T')[0]
  this.isTimeInputDisabled = true;
  this.GetHolidayslist();
  this.GetEventsList();
  this.GetExamlist();
  this.GetCourseist();

  if (this.eventslist && this.eventslist.length > 0) {
    this.eventslist = this.eventslist.sort((a, b) => Number(b.id) - Number(a.id));
  }

  this.Registeredusers.forEach((item) => {
    if (item.testTakenDate) {
      item.testTakenDate = this.formatCustomDate(item.testTakenDate);
    }
  });
}

convertToISODate(dateStr: string): string {
  if (!dateStr || typeof dateStr !== 'string') {
    return '';
  }

  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    const result = isoDate.toISOString().split('T')[0];
    return result;
  }

  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (day.length <= 2 && month.length <= 2 && year.length === 4) {
      const result = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      return result;
    }
  }
  return '';
}

formatCustomDate(dateStr: string | null): string {
  if (!dateStr) return 'Invalid Date';
  const normalizedDateStr = dateStr.replace(/\s+/g, ' ');
  const parsedDate = moment(normalizedDateStr, 'MMM D YYYY h:mmA');
  if (!parsedDate.isValid()) {
    return 'Invalid Date';
  }
  return parsedDate.format('MMM D, YYYY');
}


userName: string | null = null;
userEmail: string | null = null;
firstName: string = '';
middleName: string = '';
lastName: string = '';
//selectedValue: string = 'Offline';
async ngOnInit() {
  this.skillname = '';
  this.date = '';
  this.time = '';
  this.availableDates = [];
  this.availableTimes = [];
  // const savedMode = localStorage.getItem('selectedMode');
  // this.selectedValue = savedMode ? savedMode : 'Offline';
  // debugger;
  //   if (!this.venue) {
  //   this.venue = 'Offline';
  //   // this.ielc.GetSkillsByVenue(this.selectedValue).subscribe((data: any[]) => {
  //   //   this.venueList = data;
  //   // });
  //   this.onModeOfTrainingChange({ target: { value: this.venue } } as any);
  //   }

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
      this.userName = userDetails?.displayName;
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
        this.userEmail = userDetails.email;
        this.GetAllUsers();
        this.GetAllSkillSessions();
        this.checkUserExists();
        this.checkCoOwnerUserExists();
        this.GetAuditSchedule();
      }
    });
  }
  catch (error) {
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
      this.submittedFeedbackIds = this.Registeredusers
        .filter(user => user.hasFeedback)
        .map(user => user.enrollmentID);

    } else {
      this.Registeredusers = [];
    }
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
      const skillSessionMap = new Map<string, any[]>();
      this.visibleSessionIds.forEach((session: any) => {
        const skillName = (session.skillName ?? '').trim();
        const skillKey = skillName.toLowerCase();
        const sessionEndDate = new Date(session.toDate);
        const isActive = sessionEndDate >= today;
        if (skill.trim().toLowerCase() === skillKey && isActive) {

          if (!skillSessionMap.has(skillKey)) {
            skillSessionMap.set(skillKey, []);
          }
          skillSessionMap.get(skillKey)!.push(session);
        }
      });
      const activeSkillSessions = skillSessionMap.get(skill.trim().toLowerCase()) || [];
      if (activeSkillSessions.length > 0) {
        const venues = activeSkillSessions.map(session => session.venue).filter((value, index, self) => self.indexOf(value) === index);
        this.venueList = venues;
        this.selectedVenue = '';
        this.showDateTimeDropdowns = false;
        this.availableDates = [];
        this.availableTimes = [];
      } else {
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
  if (this.showDateTimeDropdowns && this.skillname) {
    const trimmedSkillname = this.skillname.trim();
    this.ielc.GetEnrolledSessionsbydate(trimmedSkillname, venue).subscribe({
      next: (res) => {
        const now = new Date();
        const activeRanges = new Set<string>();
        this.visibleSessionIds.forEach((session: any) => {
          const skillName = (session.skillName ?? '').trim().toLowerCase();
          if (skillName !== trimmedSkillname.toLowerCase()) return;
          const [hour, minute, second] = (session.skillStartTime ?? '00:00:00').split(':').map(Number);
          const sessionEndDateTime = new Date(session.toDate);
          sessionEndDateTime.setHours(hour || 0, minute || 0, second || 0, 0);
          const isActive = sessionEndDateTime >= now;
          if (isActive) {
            const formattedFrom = this.formatDate(session.fromDate);
            const formattedTo = this.formatDate(session.toDate);
            const range = `${formattedFrom} - ${formattedTo}`;
            activeRanges.add(range);
          }
        });
        this.availableDates = res.filter((range: string) => activeRanges.has(range));
      },
      error: (err) => {
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
  return `${day}-${month}-${year}`;
}

onDateChange() {
  if (!this.date) return;

  this.ielc.getEnrollmentSessionsBySkillAndDateRange(this.skillname, this.date, this.selectedValue)
    .subscribe(
      (res: string) => {
        this.availableTimes = res ? res.split(',').map(time => time.trim()) : [];
        //console.log('Available times:', this.availableTimes);
      },
      (err) => {
        console.error('❌ Error fetching time slots:', err);
        this.availableTimes = [];
      }
    );
}
batchMembersCount: number = 0;
onBatchInputChange() {
  //debugger;
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
        this.batchMembersCount = count + 1;
            //console.log('Batch members count:', this.batchMembersCount)
        if (this.batchMembersCount >= 150) {
          alert('Batch is full. Please choose another Date/Time slot.');
        }
      } else {
        this.batchMembersCount = 0;
      }
    },
    error: (err) => {
      if (err.status === 404) {
        this.batchMembersCount = 0;
      } else {
        this.batchMembersCount = 0;
        alert('Error checking batch availability.');
      }
    }
  });
}

GetSessionIDAllDetails(callback: (id: number) => void) {
  if (!this.skillname || !this.selectedValue || !this.date || !this.time) {
    console.warn('Missing required parameters for getting session ID');
    callback(0);
    return;
  }
  this.ielc.GetSkillnameVenueDateTimeDetails(
    this.skillname,
    this.selectedValue,
    this.date,
    this.time
  ).subscribe({
    next: (data) => {
      let sessionId: number;
      if (Array.isArray(data) && data.length > 0) {
        sessionId = Number(data[0]);
      } else {
        sessionId = Number(data);
      }
      this.ID = sessionId;
      //console.log("SessionID:", sessionId);
      callback(sessionId);
    },
    error: (err) => {
      console.error('Error getting session ID:', err);
      this.ID = 0;
      callback(0);
    }
  });
}
GetSessionIDSkillVenueDetails(callback: (id: number) => void) {
  if (!this.skillname || !this.selectedValue) {
    console.warn('Missing required parameters for getting session ID');
    callback(0);
    return;
  }

  this.ielc.GetSkillnameVenueDetails(this.skillname, this.selectedValue).subscribe({
    next: (data) => {
      let id = 0;
      if (Array.isArray(data) && data.length > 0) {
        id = Number(data[0]);
      } else {
        id = Number(data);
      }
      callback(id);
    },
    error: (err) => {
      console.error('Error getting session ID:', err);
      callback(0);
    }
  });
}

private splitDateRange(dateRange: string | null): { start: string | null, end: string | null } {
  if (!dateRange) return { start: null, end: null };

  const parts = dateRange.split("to").map(x => x.trim());

  return {
    start: parts[0] || null,
    end: parts[1] || parts[0] || null
  };
}
allowEnrollment() {
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
  if (!startDate) startDate = formattedNow;
  if (!endDate) endDate = formattedNow;

  const skill = this.skillname;
  const date = this.date;
  const time = this.time;
  const mail = this.userEmail ?? '';
  const skilldescription = this.getSessionDescription(skill, this.selectedValue, date,  time);

  

  if (this.selectedValue === 'Teams' || this.selectedValue === 'Offline') {
    this.ielc.checkIfAlreadyEnrolled(skill, date, time, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
        if (alreadyEnrolled) {
          alert('You are already enrolled for this batch!');
          return;
        }
        const batchCountToInsert = this.selectedValue === 'Teams' ? this.batchMembersCount : 0;
        this.GetSessionIDAllDetails((id: number) => {
          this.ID = id;
          this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedValue, batchCountToInsert, skilldescription, startDate, endDate, now);
        });
      },
      error: (err) => {
        alert('Failed to verify enrollment status. Please try again.');
      }
    });
  } else if (this.selectedValue === 'Self-Learning') {
    this.ielc.checkVenueEnrollment(skill, this.selectedValue, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
        if (alreadyEnrolled) {
          alert('You are already enrolled for this skill!');
          return;
        }
        const batchCountToInsert = 0;
        this.GetSessionIDSkillVenueDetails((id: number) => {
          this.ID = id;
          this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedValue, batchCountToInsert, skilldescription, startDate, endDate, now);
        });
      },
      error: (err) => {
        console.error('❌ Error checking  enrollment:', err);
        if (err.error?.errors) {
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
    const batchCountToInsert = 0;
    this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedValue, batchCountToInsert, skilldescription, startDate, endDate, now);
  }
}

proceedToEnroll(
  fullName: string, mail: string, skill: string, date: string, time: string,
  venue: string, batchCount: number, skillDescription: string, startDate: string, endDate: string, now: Date
)
{
  const convertedStart = this.convertToISODate(startDate?.trim()) || null;
  const convertedEnd = this.convertToISODate(endDate?.trim()) || null;
  const { start, end } = this.splitDateRange(date?.trim() || null);
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
    venue: this.selectedValue,
    batchmembers: batchCount,
    skillDescription: skillDescription,
    enrollmentDate: now.toISOString(),
    startDate: start,
    endDate: end,
    result: 'null',
    percentage: 'null',
    testTakenDate: 'null',
    subjectMatterKnowledge: 'null',
    presentation: 'null',
    communication: 'null',
    handlingDoubts: 'null',
    applicationtowork: 'null',
    comments: 'null',
    //sessionID: 105,
    sessionID: this.ID,
  };
  //console.log("Enrollment payload:", JSON.stringify(enrollmentData, null, 2));
  this.ielc.enrollUser(enrollmentData).subscribe({
    next: () => {
      alert('Enrollment successful! A confirmation email will be sent shortly.');
      this.GetAllUsers();
      const sessionDescription = this.getSessionDescription(skill, venue, date, time);
      //debugger;
      // Decide date & time for email
let emailDate = date;
let emailTime = time;

if (venue === 'Self-Learning') {
  const nowDate = new Date();

  // yyyy-MM-dd (or format as you like)
  emailDate = nowDate.toISOString().split('T')[0];

  // 12-hour time with AM/PM
  emailTime = nowDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

      const subject = 'Session Invitation Link';
      const body = `
        <p>Thanks for the Registration!</p>
        <p>Attend the meeting SkillName\\ Self-Learning\\ Recorded using below link:</p>
        <p>
        <a href="${sessionDescription ?? '#'}" target="_blank">
  Click here to access the meeting
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
              <td style="border: 1px solid #ddd; padding: 8px;">${emailDate}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${emailTime}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${venue}</td>
            </tr>
          </tbody>
        </table>
        <br>
          <p class="contact-info">
  For ISMS &amp; QMS queries contact:
  <a href="mailto:ramprasadh@inteqsolutions.com">ramprasadh@inteqsolutions.com</a>
</p>
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
        this.resetForm();
}

resetForm(): void {
  this.mobile = '';
  this.skillname = '';
  this.date = '';
  this.time = '';
  this.selectedVenue = '';
  this.batchMembersCount = 0;
}

// getSessionDescription(skill: string, venue: string, date: string, time: string): string {
//   debugger;
//   const [selectedStartDate, selectedEndDate] = date.split(' - ').map(this.convertDDMMYYYYToYYYYMMDD);
//   const matchedSession = this.allSkillSessions.find((session: any) => {
//     const sessionStartDate = this.convertToYYYYMMDD(session.date);
//     //const sessionEndDate = this.convertToYYYYMMDD(session.toDate);
//     const sessionTime = `${this.convertTo12HourFormat(session.skillStartTime)} - ${this.convertTo12HourFormat(session.skillEndTime)}`;
//     // if (venue === 'Teams') {
//     //   return session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
//     //     session.venue?.trim().toLowerCase() === venue.trim().toLowerCase() &&
//     //     (selectedStartDate >= sessionStartDate && selectedEndDate <= sessionEndDate) &&
//     //     time === sessionTime;
//     // } 
//     if (venue === 'Teams') {
//   const normalizedTime = time.replace(/\s+/g, '').toLowerCase();
//   const normalizedSessionTime = sessionTime.replace(/\s+/g, '').toLowerCase();

//   return (
//     session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
//     session.venue?.trim().toLowerCase() === venue.trim().toLowerCase() &&
//     (selectedStartDate >= sessionStartDate) &&
//     normalizedTime === normalizedSessionTime
//   );
// }

//     else {
//       return session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
//         session.venue?.trim().toLowerCase() === venue.trim().toLowerCase();
//     }
//   });
//   return matchedSession?.skillDescription ?? 'No description available';
// }


getSessionDescription(skill: string, venue: string, date: string, time: string): string {
  //debugger;

  // UI has only ONE date
  // const selectedDate = this.convertDDMMYYYYToYYYYMMDD(date);

  const selectedDate = date;

  const matchedSession = this.allSkillSessions.find((session: any) => {

    //const sessionDate = this.convertToYYYYMMDD(session.date);

    const sessionTime = 
  `${this.convertTo12HourFormat(session.skillStartTime)} - ${this.convertTo12HourFormat(session.skillEndTime)}`;


    const normalizedTime = time.replace(/\s+/g, '').toLowerCase();
    const normalizedSessionTime = sessionTime.replace(/\s+/g, '').toLowerCase();

    if (venue === 'Teams') {
      return (
        session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
        session.venue?.trim().toLowerCase() === venue.trim().toLowerCase() &&

        // ✔ Only compare single date
        //selectedDate === sessionDate &&

        // ✔ Normalized time comparison
        normalizedTime === normalizedSessionTime
      );
    }

    // Self-Learning / Offline
    return (
      session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
      session.venue?.trim().toLowerCase() === venue.trim().toLowerCase()
    );
  });

  return matchedSession?.skillDescription ?? 'No description available';
}


// convertTo12HourFormat(time: string): string {
//   const [hour, minute] = time.split(':');
//   const period = +hour >= 12 ? 'PM' : 'AM';
//   const hour12 = +hour % 12 || 12;
//   return `${hour12}:${minute} ${period}`;
// }

convertTo12HourFormat(time24: string): string {
  if (!time24) return '';

  const [hour, minute] = time24.split(':');
  let h = parseInt(hour, 10);
  const m = minute;

  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12; // 12 AM or 12 PM

  return `${h}:${m}${ampm}`;  // ❗ no leading zero on hours
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
  if(item.result === 'Completed') {
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
      this.Enrolledusers = this.sortRegisteredUsersbysession(visibleSessions);
      if (!this.topSkillReady) {
        this.GetEnrolledSessionsSkillsData();
      }
    };
    processSessions();
  });

}
topSkillReady = false;
GetEnrolledSessionsSkillsData() {
  const loggedInEmail = (this.userEmail ?? '').toLowerCase();

  this.ielc.GetEnrolledSessions().subscribe((data) => {
    if (this.visibleSessionIds && this.visibleSessionIds.length > 0) {
      const enrolledSkillNames = data.map((name: string) => name.trim().toLowerCase());
      const today = new Date();
      const now = new Date();
      const currentTime = now.toTimeString().split(' ')[0];
      const currentDateOnly = new Date(now.setHours(0, 0, 0, 0));
      const skillSessionMap = new Map<string, any[]>();

      this.visibleSessionIds.forEach((session: any) => {
        const skillName = (session.skillName ?? '').trim();
        const skillKey = skillName.toLowerCase();
        const [hour, minute, second] = (session.skillStartTime ?? '00:00:00').split(':').map(Number);
        const sessionEndDateTime = new Date(session.toDate);
        sessionEndDateTime.setHours(hour || 0, minute || 0, second || 0, 0);
        const now = new Date();
        const isActive = sessionEndDateTime >= now;
        if (!enrolledSkillNames.includes(skillKey)) return;

        if (!skillSessionMap.has(skillKey)) {
          skillSessionMap.set(skillKey, []);
        }

        if (isActive) {
          skillSessionMap.get(skillKey)!.push(session);
        }
      });

this.Enrolledskills = Array.from(skillSessionMap.entries())
        .filter(([_, sessions]) => sessions.length > 0)
        .map(([skillKey, sessions]) => ({
          skillName: sessions[0].skillName,
          venue: sessions[0].venue,
          sessions: sessions
        }));

      if (this.Enrolledskills.length > 0) {
        this.topSkillName = `${this.Enrolledskills[0].skillName} (${this.Enrolledskills[0].venue})`;
      }
    } else {
      this.Enrolledskills = [];
    }
  });
}

crserestlist: any[] = [];
courseSkillNames: string[] = [];
GetCourseist() {
  this.ielc.Getcourse().subscribe((data: crserest[]) => {
    this.crserestlist = data;
    this.courseSkillNames = data
      .map((item) => item.coursesList)
      .filter(Boolean)
      .flatMap((list) =>
        list.split(',').map((skill) => skill.trim().toLowerCase())
      );
  });
}

isSkillRestricted(skillName: string): boolean {
  return this.courseSkillNames.includes(skillName.trim().toLowerCase());
}

GetHolidayslist(){
  this.ielc.Getholidays().subscribe((data) => {
    this.holidayslist = data;
  });
}
sortlist(data: any[]): any[] {
  return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

GetEventsList() {
  this.ielc.Getevents().subscribe((data) => {
    this.eventslist = data;
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
    }
    this.isLoading = false;
  });

}

checkUserExists() {
  this.GetAllUniqueNames().subscribe((usernames: string[]) => {
    this.showButton = !!(this.userName && usernames.includes(this.userName));
    if (this.showButton) {
     // console.log('Your username exists in the list.');
    } else {
     // console.log('Your username is NOT in the list.');
    }
  });
}

checkCoOwnerUserExists() {
  this.GetCOwnersAllUniqueNames().subscribe((usernames: string[]) => {
    this.coownersshowButton = !!(this.userName && usernames.includes(this.userName));
    if (this.coownersshowButton) {
      //console.log('Your username exists in the list.');
    } else {
      //console.log('Your username is NOT in the list.');
    }
  });
}

GetAllUniqueNames(): Observable < string[] > {
  return this.ielc.GetUniqueName();
}

GetCOwnersAllUniqueNames(): Observable < string[] > {
  return this.ielc.GetCoOwnersUniqueName();
}

showButton: boolean = false;
coownersshowButton: boolean = false;
showData(registration: any)
{
}
save()
{
  alert('🚧 Feature under development. Implementation is currently in progress.');

}

modaldatasave(){
}

isTimeInputDisabled: boolean = true
time1 = ''
firsttimeentered: Date | null=null

onFirsttimechange()
{
  this.isTimeInputDisabled = !!this.time1
  //  this.calculatetime()
  this.isTimeInputDisabled = false;
}

calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin]
};

time2: string = ''
showEaxtraHoursLabel: boolean = false
checktime(){
  if (this.time2 === "23:59") {
    this.showEaxtraHoursLabel = true;
  } else {
    this.showEaxtraHoursLabel = false;
  }
}

leavetype = [
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


worktype = [
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
  if (this.leave === 'Half Day') {
    this.isSecondSelectDisabled = false
    this.isTimeInputDisabled = false
  }
}
onSelect2Change() {
  this.isfirstSelectDisabled = !!this.work;
  if (this.work) {
    this.isTimeInputDisabled = false
  }

}

  skillname1: string = '';
  selectedValue: string = '';
  showPopup: boolean = false;
  Enrolledskill: { skillName: string }[] = [];
  availableTime: string[] = [];
  disableDate: boolean = false;
  disableTime: boolean = false;
  isSelfLearning = false;
  venue: string = '';

  isLoadingSkills = false;

// onModeOfTrainingChange(event: any) {
//   const venue = (event.target as HTMLInputElement).value;
//   this.isLoadingSkills = true;
//   // ... your same logic ...

//   this.ielc.GetSkillsByVenue(venue).subscribe({
//     next: (res) => {
//       const skills = res.map((skill: any) => ({ skillName: skill }));
//       this.Enrolledskills = skills;
//       this.skillname = '';
//       this.isLoadingSkills = false;
//     },
//     error: () => {
//       this.Enrolledskills = [];
//       this.skillname = '';
//       this.isLoadingSkills = false;
//     }
//   });
// }

isModeSelected: boolean = false;
  onModeOfTrainingChange(event: any) {
  //debugger;
  this.isModeSelected = true;
  const venue = (event.target as HTMLInputElement).value;
  this.selectedValue = venue;
  this.isLoadingSkills = true;
  // Clear all skill arrays
  this.Enrolledskills = [];
  this.EnrolledskillsOffline = [];
  this.EnrolledskillsTeams = [];
  this.EnrolledskillsLearning = [];

  this.date = '';
  this.time = '';
  this.availableDates = [];
  this.availableTimes = [];

  // this.selectedValue = event.target.value;
  // localStorage.setItem('selectedMode', this.selectedValue);

  // Common UI flags
  this.showPopup = venue === 'Self-Learning';
  this.disableDate = true;
  this.disableTime = true;

  // Fetch skills based on venue
  this.ielc.GetSkillsByVenue(venue).subscribe({
    next: (res) => {
      const skills = res.map((skill: any) => ({ skillName: skill }));
      //debugger;
      if (venue === 'Offline') this.EnrolledskillsOffline = skills;
      else if (venue === 'Teams') this.EnrolledskillsTeams = skills;
      else if (venue === 'Self-Learning') this.EnrolledskillsLearning = skills;

      // ✅ Bind active list to dropdown
      this.Enrolledskills = skills;

      this.skillname = '';
      this.isLoadingSkills = false;
      //console.log(`Skills for ${venue}:`, skills);
    },
    error: (err) => {
      console.error(`Error fetching skills for ${venue}`, err);
      this.Enrolledskills = [];
      this.skillname = '';
      this.isLoadingSkills = false;
    }
  });
}

  
// onModeOfTrainingChange(event: any) {
//   debugger;
//   //const venue = event.target.nextSibling.textContent.trim();
//   const venue = (event.target as HTMLInputElement).value;
//   this.selectedValue = venue;
//   if (venue === 'Self-Learning') {
//     this.date = '';
//     this.time = '';
//     this.availableDates = [];
//     this.availableTimes = [];
//     this.EnrolledskillsOffline = [];
//     this.EnrolledskillsTeams = [];
//     this.EnrolledskillsLearning = [];
//     this.ielc.GetSkillsByVenue('Self-Learning').subscribe({
//       next: (res) => {
//         this.EnrolledskillsLearning = res.map(skill => ({ skillName: skill }));
//         this.skillname = '';
//         this.showPopup = true;
//         this.disableDate = true;
//         this.disableTime = true;
//       },
//       error: (err) => {
//       if (err.status === 404) {
//       this.EnrolledskillsOffline = [];
//       this.EnrolledskillsTeams = [];
//       this.EnrolledskillsLearning = [];
//       this.skillname = '';
//       } else {
//           console.error('Error fetching skills for Self-Learning', err);
//         }
//         this.showPopup = true;
//         this.disableDate = true;
//         this.disableTime = true;
//       }
//     });
//   } 
//   else if (venue === 'Teams') {
//     this.EnrolledskillsOffline = [];
//     this.EnrolledskillsTeams = [];
//     this.EnrolledskillsLearning = [];
//     //this.isLoading = true;
//     this.ielc.GetSkillsByVenue('Teams').subscribe({
//       next: (res) => {
//         this.EnrolledskillsTeams = res.map(skill => ({ skillName: skill }));
//         //this.isLoading = false;
//         this.skillname = '';
//         this.availableDates = [];
//         this.availableTimes = [];
//         this.showPopup = false;
//         this.disableDate = true;
//         this.disableTime = true;
//       },
//       error: (err) => {
//         if (err.status === 404) {
//         this.EnrolledskillsOffline = [];
//         this.EnrolledskillsTeams = [];
//         this.EnrolledskillsLearning = [];
//         this.skillname = '';
//         } else {
//           console.error('Error fetching skills for Teams', err);
//         }
//         this.showPopup = false;
//         this.disableDate = true;
//         this.disableTime = true;
//       }
//     });
//   } 
//   else if (venue === 'Offline') {
//     this.EnrolledskillsOffline = [];
//     this.EnrolledskillsTeams = [];
//     this.EnrolledskillsLearning = [];
//     this.ielc.GetSkillsByVenue('Offline').subscribe({
//       next: (res) => {
//         this.EnrolledskillsOffline = res.map(skill => ({ skillName: skill }));
//         this.skillname = ''; 
//         this.availableDates = [];
//         this.availableTimes = [];
//         this.date = '';
//         this.time = '';
//         this.showPopup = false;
//         this.disableDate = true;
//         this.disableTime = true;
//       },
//       error: (err) => {
//         if (err.status === 404) {
//         this.EnrolledskillsOffline = [];
//         this.EnrolledskillsTeams = [];
//         this.EnrolledskillsLearning = [];
//         this.skillname = '';
//         } else {
//           console.error('Error fetching skills for Offline', err);
//         }
//         this.showPopup = false;
//         this.date = '';
//         this.time = '';
//         this.disableDate = true;
//         this.disableTime = true;
//       }
//     });
//   }
// }

onSkillSelected(skill: string) {
  if (!skill) return;
  this.skillname = skill;          
  this.closePopup();               
  this.onBatchInputChange();       

  this.availableDates = [];
  this.availableTimes = [];
  this.date = '';
  this.time = '';
  this.disableDate= true;

  if (this.selectedValue === 'Teams' || this.selectedValue === 'Offline') {
    this.ielc.GetEnrolledSessionsbydate(this.skillname, this.selectedValue).subscribe({
      next: (res: string[]) => {
        this.availableDates = res || [];
        this.disableDate = false;
      },
      error: (err) => {
        console.error('Error fetching dates:', err);
        this.availableDates = [];
      }
    });
  }
}
closePopup() {
  this.showPopup = false;
}


onDateChanged() {
  if (!this.skillname || !this.date || !this.selectedValue) {
    this.availableTime = [];
    return;
    this.disableTime = false;
  }
this.ielc.getEnrollmentSessionsBySkillAndDateRange(this.skillname, this.date, this.selectedValue)
  .subscribe(
    (res: string) => {
      this.availableTimes = res
  ? res.split(',')
      .map(time => this.normalizeTimeRange(time.trim()))
  : [];

      this.disableTime = false;
    },
    (err) => {
      console.error('❌ Error fetching time slots:', err);
      this.availableTimes = [];
    }
  );
}

normalizeTimeRange(range: string): string {
  if (!range) return range;

  const [start, end] = range.split(' - ');

  return `${this.stripLeadingZero(start)} - ${this.stripLeadingZero(end)}`;
}

stripLeadingZero(time: string): string {
  // Converts "01:50PM" -> "1:50PM"
  return time.replace(/^0/, '');
}


 auditschedulelist: any[]=[];
GetAuditSchedule(){
  this.ielc.GetAuditSchedule().subscribe((data) => {
    this.auditschedulelist=data;
    this.isLoading = false;
  });
 }


// pdfUrl: string | null = null;
// openDocument(fileName: string) {
//   this.ielc.getWordAsPdf(fileName).subscribe(blob => {
//     const pdfBlob = new Blob([blob], { type: 'application/pdf' });
//     this.pdfUrl = URL.createObjectURL(pdfBlob);
//   });
// }
// closePdf() {
//   this.pdfUrl = null;
// }


showPreExamWarning = false;
selectedExam: {
  skillName: string;
  enrollmentID: number;
  sessionID: number;
} | null = null;

openPreExamWarning(item: any) {
  this.selectedExam = {
    skillName: item.skillName,
    enrollmentID: item.enrollmentID,
    sessionID: item.sessionID
  };
  this.showPreExamWarning = true;
}
confirmStartExam() {
  if (!this.selectedExam) return;

  this.showPreExamWarning = false;

  this.router.navigate(['/exampage'], {
    queryParams: {
      skill: this.selectedExam.skillName,
      enrollment: this.selectedExam.enrollmentID,
      session: this.selectedExam.sessionID
    }
  });
}





}


 
