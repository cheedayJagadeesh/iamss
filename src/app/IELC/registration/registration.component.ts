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
  startDate: string;
  endDate: string;
  result: string;
  percentage: string;
  testTakenDate: string;
  subjectMatterKnowledge: string;
  presentation: string;
  communication: string;
  handlingDoubts: string;
  applicationtowork: string;
  comments: string;
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
currentUser: any = {};
constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute){
   // this.selectedDate= new Date().toString()
   this.selectedDate= new Date().toISOString().split('T')[0]
   this.isTimeInputDisabled=true;
   this.GetHolidayslist();
   this.GetEventsList();
   this.GetExamlist();
  //  this.GetAllUsers();
  this.GetCourseist();
  this.GetAllSkillSessions();
  // this.GetEnrolledSessionsSkillsData();
  // this.loadUserRestrictionsAndSessions();
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
//  currentUserEmail: string = '';
// currentUserGroups: string[] = [];
// aadUsers: any[] = [];
// aadGroups: any[] = [];

//  loadUserRestrictionsAndSessions() {
//   forkJoin({
//     users: this.ielc.GetAadUserslist(),
//     groups: this.ielc.GetAadUserGroupslist()
//   }).subscribe(({ users, groups }) => {
//     this.aadUsers = users;
//     this.aadGroups = groups;

//     const userRecord = users.find((u: any) => u.email === this.currentUserEmail);
//     this.currentUserGroups = groups
//       .filter((g: any) => g.members?.includes(this.currentUserEmail)) // adjust as needed
//       .map((g: any) => g.groupName);

//     // Now load sessions after knowing user's groups
//     this.GetAllSkillSessions();
//     this.GetEnrolledSessionsSkillsData();
//   });
// }
// filterSkillsByUserRestriction(data: any[]): any[] {
//   return data.filter(session => {
//     const assignedUsers = session.assignedUsers || [];
//     const assignedGroups = session.assignedGroups || [];

//     const isPublic = assignedUsers.length === 0 && assignedGroups.length === 0;
//     const isUserAllowed = assignedUsers.includes(this.currentUserEmail);
//     const isGroupAllowed = assignedGroups.some((g: string) =>
//       this.currentUserGroups.includes(g)
//     );

//     return isPublic || isUserAllowed || isGroupAllowed;
//   });
// }




 convertToISODate(dateStr: string): string {
  const [dd, mm, yyyy] = dateStr.split('-');
  return `${yyyy}-${mm}-${dd}`;
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
 lastName: string = '';
//  async ngOnInit() {
//    try {
//      await this.msalService.instance.handleRedirectPromise(); // Ensure MSAL is initialized
//      this.authService.setActiveAccount(); // Ensure an account is set

//     //  this.authService.userName$.subscribe(username => {
//     //    if (username) {
//     //      this.userName = username;
//     //    } else {
//     //      this.authService.fetchUserDetails(); // Fetch from Microsoft Graph API if missing
//     //    }
//     //  });
//     this.authService.userDetails$.subscribe(userDetails => {
//       this.userName = userDetails.displayName;
//       this.userEmail = userDetails.email;
//     });
//     if (this.userEmail) {
//       const emailPrefix = this.userEmail.split('@')[0]; // Get the part before '@'
//       const nameParts = emailPrefix.split(/[._]/); // Split by dot (.) or underscore (_)
//       this.firstName = nameParts[0] || ''; // First part as first name
//       this.lastName = nameParts.length > 1 ? nameParts[1] : ''; // Second part as last name (if exists)
//     }
//    else {
//     this.authService.fetchUserDetails(); // Fetch details if missing
//   }

//      if (!this.authService.isAuthenticated()) {
//        this.router.navigate(['/login']); // Redirect if not authenticated
//      }
//    } catch (error) {
//      console.error('MSAL initialization error in HomeComponent:', error);
//    }
//  }
async ngOnInit() {
  
  try {
    console.log("Initializing MSAL...");
    
    // Ensure MSAL is properly initialized before proceeding
    await this.msalService.instance.initialize();  
    await this.msalService.instance.handleRedirectPromise();

    console.log("MSAL initialized successfully.");
    
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount) {
      console.warn("No active account found. Redirecting to login...");
      this.router.navigate(['/login']);
      return;
    }

    
    this.authService.setActiveAccount();

    this.authService.userDetails$.subscribe(userDetails => {
      // this.userName = userDetails?.displayName || 'Unknown User';
      // this.userEmail = userDetails?.email || 'No Email';
      this.currentUser = userDetails;  
      this.userName = userDetails?.displayName ;
      this.userEmail = userDetails?.email;
      // const loggedInEmail = userDetails?.email || '';
    

      // this.authService.userInfo$.subscribe(userInfo => {
      //   if (userInfo?.email && userInfo?.roleName) {
      //     // console.log("User info received:", userInfo);
      //     this.userName = userInfo?.displayName;
      //     this.userEmail = userInfo.email;
       
      if (this.userEmail) {
        const emailPrefix = this.userEmail.split('@')[0]; // Get the part before '@'
        const nameParts = emailPrefix.split(/[._]/); // Split by dot (.) or underscore (_)
        this.firstName = nameParts[0] || ''; // First part as first name
        this.lastName = nameParts.length > 1 ? nameParts[1] : ''; // Second part as last name (if exists)
      }
    
    });
    this.authService.userDetails$.subscribe(userDetails => {
      if (userDetails) {
        this.userEmail = userDetails.email; // Ensure the email is correctly assigned
        this.GetAllUsers(); // Call this AFTER we get the email
        this.GetAllSkillSessions(); 
        // this.GetEnrolledSessionsSkillsData()
      }
    });   
  }
  
  
   catch (error) {
    console.error("MSAL initialization error in HeaderComponent:", error);
  }
  // this.GetAllUsers();
  
}
 logout(): void {
  this.authService.logout();
}
sortRegisteredUsers(data: any[]): any[] {
  return data.sort((a, b) => (a.enrollmentID > b.enrollmentID ? -1 : a.enrollmentID < b.enrollmentID ? 1 : 0));
}
// GetAllUsers() {
//   this.ielc.GetUsers().subscribe((data) => {
//     const aadEmail = this.userEmail; // Use the retrieved AAD email

//     if (aadEmail) {
//       this.Registeredusers = this.sortRegisteredUsers(
//         data.filter(user => user.mail === aadEmail)
//       );
     
//     } else {
//       this.Registeredusers = []; // No users if email is missing
//     }
//   });
// }
// GetAllUsers() {
//   this.ielc.GetUsers().subscribe((data) => {
//     const aadEmail = this.userEmail; // Get current user's email

//    this.submittedFeedbackIds = this.Registeredusers
//     .filter(user =>
//       user.subjectMatterKnowledge &&
//       user.presentation &&
//       user.communication &&
//       user.handlingDoubts &&
//       user.applicationtowork
//     )
//     .map(user => user.enrollmentID); 

    

//     if (aadEmail) {
//       this.Registeredusers = this.sortRegisteredUsers(
//         data.filter(user => user.mail === aadEmail)
//       ).map(user => ({
//         ...user,
//         testTakenDate: user.testTakenDate ? this.formatCustomDate(user.testTakenDate) : null,
//       }));
      
//     } else {
//       this.Registeredusers = [];
//     }
//   });
  
// }

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

    this.feedbackLoaded = true;
  });
}

hasSubmittedFeedback(enrollmentID: string): boolean {
  return this.submittedFeedbackIds.includes(enrollmentID);
}

// GetEnrolledSessionsSkillsData(){
//   this.ielc.GetEnrolledSessions().subscribe((data) => {
//     this.Enrolledskills=data;
//     // this.Enrolledskills = this.filterSkillsByUserRestriction(data);
//   });
//  }






 onSkillChange(skill: string) {
  if (skill) {
    this.ielc.GetEnrolledSessionsbyvenue(skill).subscribe((venues) => {
      console.log('Venue response:', venues);
      this.venueList = venues; // adjust based on API shape
      this.selectedVenue = '';
      this.showDateTimeDropdowns = false;
      this.availableDates = [];
      this.availableTimes = [];
    });
  }
}

convertToDDMMYYYY(dateStr: string): string {
  const [mm, dd, yyyy] = dateStr.split('-');
  return `${dd}-${mm}-${yyyy}`;
}

onVenueChange(venue: string) {
  this.showDateTimeDropdowns = venue === 'Teams';

  if (this.showDateTimeDropdowns && this.skillname) {
    this.ielc.GetEnrolledSessionsbydate(this.skillname).subscribe({
      next: (res) => {
        console.log('Date response:', res);
        // this.availableDates = Array.isArray(res) ? res : res.map((d: any) => d.date);
        this.availableDates = res.map((range: string) => {
          const [start, end] = range.split(' - ');
          return `${this.convertToDDMMYYYY(start)} - ${this.convertToDDMMYYYY(end)}`;
        });
      },
      error: (err) => {
        console.error('Error fetching dates:', err);
        this.availableDates = [];
      }
    });
    

    this.ielc.GetEnrolledSessionsbytime(this.skillname).subscribe({
      next: (res) => {
        console.log('Time response:', res);
        this.availableTimes = Array.isArray(res) ? res : res.map((t: any) => t.time);
      },
      error: (err) => {
        console.error('Error fetching times:', err);
        this.availableTimes = [];
      }
    });
    if (this.date && this.time) {
      this.checkBatchAvailability();
    }
  } else {
    this.availableDates = [];
    this.availableTimes = [];
    this.date = '';
    this.time = '';
    this.batchMembersCount = 0;
  }
}


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
          alert('Batch is full. Please choose another slot.');
        }
      } else {
        console.warn('⚠️ Invalid count from API:', count);
        this.batchMembersCount = 0;
      }
    },
    error: (err) => {
      if (err.status === 404) {
        // No batch yet, set count to 0
        this.batchMembersCount = 0;
      } else {
        console.error('❌ Error fetching batch count:', err);
        this.batchMembersCount = 0;
        alert('Error checking batch availability.');
      }
    }
  });
}





// allowEnrollment() {
//   const now = new Date();
//   const fullName = `${this.firstName} ${this.lastName}`;
//   const [startDate, endDate] = this.date?.split(' - ') || ['', ''];

//   const skill = this.skillname;
//   const date = this.date;
//   const time = this.time;
//   const mail = this.userEmail?? '';

//   this.ielc.checkIfAlreadyEnrolled(skill, date, time, mail).subscribe({
//     next: (alreadyEnrolled: boolean) => {
//       if (alreadyEnrolled) {
//         alert('You are already enrolled for this batch!');
//         return;
//       }

//       const batchCountToInsert = this.selectedVenue === 'Teams' ? this.batchMembersCount : 0;

//       // ✅ Proceed only if not already enrolled
//       const enrollmentData: EnrollmentData = {
//         enrollmentID: 0,
//         name: fullName,
//         firstName: this.firstName || '',
//         lastName: this.lastName || '',
//         mail: mail || '',
//         mobile: Number(this.mobile) || 0,
//         skillName: skill || '',
//         date: date || '',
//         time: time || '',
//         venue: this.selectedVenue || '',
//         batchmembers: batchCountToInsert,
//         enrollmentDate: now.toISOString(),
//         startDate: this.convertToISODate(startDate.trim()),
//         endDate: this.convertToISODate(endDate.trim()),
//         result: '',
//         percentage: '',
//         testTakenDate: '',
//         subjectMatterKnowledge: '',
//         presentation: '',
//         communication: '',
//         handlingDoubts: '',
//         applicationtowork: '',
//         comments: ''
//       };

//       this.ielc.enrollUser(enrollmentData).subscribe({
//         next: () => {
//           alert('Enrollment successful!');
//           this.resetForm();
//         },
//         error: (err) => {
//           console.error('Enrollment error:', err);
//           alert('Enrollment failed. Please try again.');
//         }
//       });
//     },
//     error: (err) => {
//       console.error('❌ Error checking enrollment status:', err);
//       alert('Failed to verify enrollment status. Please try again.');
//     }
//   });
// }


allowEnrollment() {
  const now = new Date();
  const fullName = `${this.firstName} ${this.lastName}`;
  const [startDate, endDate] = this.date?.split(' - ') || ['', ''];

  const skill = this.skillname;
  const date = this.date;
  const time = this.time;
  const mail = this.userEmail ?? '';

  // If Teams, do the duplicate check
  if (this.selectedVenue === 'Teams') {
    this.ielc.checkIfAlreadyEnrolled(skill, date, time, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
        if (alreadyEnrolled) {
          alert('You are already enrolled for this batch!');
          return;
        }

        const batchCountToInsert = this.batchMembersCount;

        this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedVenue, batchCountToInsert, startDate, endDate, now);
      },
      error: (err) => {
        console.error('❌ Error checking enrollment status:', err);
        alert('Failed to verify enrollment status. Please try again.');
      }
    });
  } else if (this.selectedVenue !== 'Teams') {
    // Duplicate check for self-learning
    this.ielc.checkVenueEnrollment(skill, this.selectedVenue, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
        if (alreadyEnrolled) {
          alert('You are already enrolled for self-learning in this skill!');
          return;
        }

        const batchCountToInsert = 0;
        this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedVenue, batchCountToInsert, startDate, endDate, now);
      },
      error: (err) => {
        console.error('❌ Error checking self-learning enrollment:', err);
        alert('Failed to verify self-learning enrollment. Please try again.');
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
) {
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
    startDate: this.convertToISODate((startDate || '').trim()),
    endDate: this.convertToISODate((endDate || '').trim()),    
    result: '',
    percentage: '',
    testTakenDate: '',
    subjectMatterKnowledge: '',
    presentation: '',
    communication: '',
    handlingDoubts: '',
    applicationtowork: '',
    comments: ''
  };

  this.ielc.enrollUser(enrollmentData).subscribe({
    next: () => {
      alert('Enrollment successful!');
      this.resetForm();
    },
    error: (err) => {
      console.error('Enrollment error:', err);
      alert('Enrollment failed. Please try again.');
    }
  });
}



resetForm(): void {
  // this.firstName = '';
  // this.lastName = '';
  // this.userEmail = '';
  this.mobile = '';
  this.skillname = '';
  this.date = '';
  this.time = '';
  this.selectedVenue = '';
  this.batchMembersCount = 0;
}

allowOnlyDigits(event: KeyboardEvent) {
  const charCode = event.which ? event.which : event.keyCode;

  // Only allow digits (0–9)
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





// hasSubmittedResult(enrollmentID: string): boolean {
//   return this.submittedResultIds.includes(enrollmentID);
// }

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


// getExamPercentage(skillName: string): number {
//   const row = this.Registeredusers.find(exam => exam.skillName === skillName);
//   if (row) {
//     console.log(`Exam Percentage for ${skillName}:`, row.examPercentage); // Debugging log
//     return Number(row.examPercentage); // Ensure it's a number
//   }
//   return 0; // Default to 0 if not found
// }
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
setSelectedSkill(skillName: string, enrollmentID: number) {
  this.router.navigate(['/exampage'], { queryParams: { skill: skillName, enrollment: enrollmentID } });
}

setSelectedSkillandId(skillName: string, enrollmentID: number) {
  this.router.navigate(['/feedback'], { queryParams: { skill: skillName, enrollment: enrollmentID } });
}

sortRegisteredUsersbysession(data: any[]): any[] {
  return data.sort((a, b) => (a.sessionID > b.sessionID ? -1 : a.sessionID < b.sessionID ? 1 : 0));
}

Enrolledusers: any[] = []; 
topSkillName: string = '';
//  GetAllSkillSessions(){
//   this.ielc.GetSkillSessions().subscribe((data) => {
//     this.Enrolledusers=data;
//     this.Enrolledusers = this.sortRegisteredUsersbysession(data);
//     // const filtered = this.filterSkillsByUserRestriction(data);
//     // this.Enrolledusers = this.sortRegisteredUsers(filtered);
    
//     if (this.Enrolledusers.length > 0) {
//       this.topSkillName = this.Enrolledusers[0].skillName;
//     }
//   });
//  }
// visibleSessionIds: number[] = [];
GetAllSkillSessions() {
  const loggedInEmail = (this.userEmail ?? '').toLowerCase();
  console.log('🔐 Logged-in user:', loggedInEmail);

  forkJoin({
    sessions: this.ielc.GetSkillSessions(),
    aadUsers: this.ielc.GetAadUserslist(),
    aadGroups: this.ielc.GetAadUserGroupslist()
  }).subscribe(async ({ sessions, aadUsers, aadGroups }) => {

    const validGroups = aadGroups.map((g: any) => g.displayName?.trim()).filter(Boolean);
    const visibleSessions: any[] = [];
    const visibleSessionDetails: { sessionID: number, skillName: string }[] = [];
    

    for (const session of sessions) {
      const skill = session.skillName;
      
      // Initialize sessionUsers before using it
      const sessionUsers: string[] = (session.aadUsersData || '')
        .split(',')
        .map((u: string) => u.trim().toLowerCase())
        .filter(Boolean);

      console.log('📘 Checking session:', skill);
      console.log('📍 Raw Users field:', session.aadUsersData);  // Check if Users is undefined
      console.log('📍 Processed Users:', sessionUsers);

      // Check if the logged-in user is assigned
      let isUserAssigned = sessionUsers.includes(loggedInEmail);

      // Process session groups
      const sessionGroups: string[] = (session.groups || '')
        .split(',')
        .map((g: string) => g.trim())
        .filter(Boolean);

      let isGroupAssigned = false;
      console.log('📍 Groups:', sessionGroups);

      // Check if user is part of any assigned group
      for (const group of sessionGroups) {
        if (group && validGroups.includes(group)) {
          try {
            const groupMembers = await this.ielc.getUsersOfGroup(group).toPromise();
            const lowerGroupMembers = groupMembers.map((m: any) => m.toLowerCase());

            console.log(`📂 Group "${group}" members:`, lowerGroupMembers);

            if (lowerGroupMembers.includes(loggedInEmail)) {
              isGroupAssigned = true;
              console.log(`✅ User is part of group "${group}"`);
              break;
            }
          } catch (err) {
            console.error(`❌ Failed to fetch members of group "${group}"`, err);
          }
        }
      }

      const isSessionPublic = sessionUsers.length === 0 && sessionGroups.length === 0;
      const hasAccess = isUserAssigned || isGroupAssigned || isSessionPublic;

      console.log('🔎 isUserAssigned:', isUserAssigned);
      console.log('🔎 isGroupAssigned:', isGroupAssigned);
      console.log('🔎 isSessionPublic:', isSessionPublic);
      console.log('🔎 hasAccess:', hasAccess);

      if (hasAccess) {
        visibleSessions.push(session);
        visibleSessionDetails.push({ sessionID: session.sessionID, skillName: skill });
        console.log(`✔️ "${skill}" added to visible sessions`);
      } else {
        console.log(`🚫 "${skill}" hidden from this user`);
      }
    }
    this.visibleSessionIds = visibleSessions
    console.log('✅ Visible session IDs with skills:', visibleSessions);
   
    this.Enrolledusers = this.sortRegisteredUsersbysession(visibleSessions);
    // this.GetEnrolledSessionsSkillsData();
    if (!this.topSkillReady) {
      this.GetEnrolledSessionsSkillsData();
    }

    // if (this.Enrolledusers.length > 0) {
    //   this.topSkillName = this.Enrolledusers[0].skillName;
    //   console.log('🏆 Top visible skill:', this.topSkillName);
    // } else {
    //   console.warn('⚠️ No visible skills for this user');
    // }
  });
}
topSkillReady = false;
GetEnrolledSessionsSkillsData() {
  const loggedInEmail = (this.userEmail ?? '').toLowerCase();
  console.log('🔐 Logged-in user for enrolled sessions:', loggedInEmail);

  this.ielc.GetEnrolledSessions().subscribe((data) => {
    console.log('📦 Enrolled session data:', data);
    console.log('🧩 Visible session IDs:', this.visibleSessionIds);
    if (this.visibleSessionIds && this.visibleSessionIds.length > 0) {
      
      const enrolledSkillNames = data.map((name: string) => name.trim().toLowerCase());

        this.Enrolledskills = this.visibleSessionIds.filter((session: any) => {
          const sessionSkillName = (session.skillName ?? '').trim().toLowerCase();
          const matched = enrolledSkillNames.includes(sessionSkillName);

          console.log(`🔍 Matching visible skill "${session.skillName}" -> Match: ${matched}`);
          return matched;
        });

        const enrolledNames = this.Enrolledskills.map((s: any) => s.skillName);
        console.log('🎯 Enrolled skills visible to user:', enrolledNames);
        if ( enrolledNames.length > 0) {
          this.topSkillName = enrolledNames[0];
          console.log('🏆 Final topSkillName:', this.topSkillName);
        }
      
    } 
    else {
      console.warn('⚠️ No visible sessions stored from GetAllSkillSessions yet.');
      this.Enrolledskills = [];
    }
  });
}
// GetEnrolledSessionsSkillsData() {
//   const loggedInEmail = (this.userEmail ?? '').toLowerCase();
//   this.ielc.GetEnrolledSessions().subscribe((data) => {
//     if (this.visibleSessionIds && this.visibleSessionIds.length > 0) {
//       const enrolledSkillNames = data.map((name: string) => name.trim().toLowerCase());

//       // Filter visible sessions based on enrolled skills
//       this.Enrolledskills = this.visibleSessionIds.filter((session: SkillSession) => {
//         const sessionSkillName = (session.skillName ?? '').trim().toLowerCase();
//         return enrolledSkillNames.includes(sessionSkillName);
//       });

//       const enrolledNames = this.Enrolledskills.map((s: SkillSession) => s.skillName);
//       console.log('🎯 Enrolled skills visible to user:', enrolledNames);

//       // Set topSkillName based on first match from enrolled data
//       const topFromEnrolled = data.find((enrolled: string) => {
//         const enrolledLower = enrolled.trim().toLowerCase();
//         return this.Enrolledskills.some((s: SkillSession) => 
//           (s.skillName ?? '').trim().toLowerCase() === enrolledLower
//         );
//       });

//       if (topFromEnrolled) {
//         this.topSkillName = topFromEnrolled.trim();
//       } else if (this.visibleSessionIds.length > 0) {
//         this.topSkillName = this.visibleSessionIds[0].skillName;
//       } else {
//         this.topSkillName = '';
//       }
//     } else {
//       this.topSkillName = '';
//     }

//     this.topSkillReady = true;
//   });
// }



// GetEnrolledSessionsSkillsData(visibleSessions: any[]) {
//   const loggedInEmail = (this.userEmail ?? '').toLowerCase();

//   this.ielc.GetEnrolledSessions().subscribe((data) => {
//     const enrolledSkillNames = data.map((s: any) => (s.skillName || '').trim().toLowerCase());

//      this.Enrolledskills = this.visibleSessionIds.filter((session: any) => {
//     const sessionSkillName = (session.skillName ?? '').trim().toLowerCase();
//     const matched = enrolledSkillNames.includes(sessionSkillName);

//     console.log(`🔍 Matching visible skill "${session.skillName}" -> Match: ${matched}`);
//     return matched;
//   });

//   const enrolledNames = this.Enrolledskills.map((s: any) => s.skillName);
//   console.log('🎯 Enrolled skills visible to user:', enrolledNames);

//     // ✅ Set topSkillName only after full matching
//     if (this.Enrolledskills.length > 0) {
//       this.topSkillName = this.Enrolledskills[0].skillName;
//       console.log('🏆 Final topSkillName:', this.topSkillName);
//     }
//   });
// }


// GetEnrolledSessionsSkillsData() {
//   const loggedInEmail = (this.userEmail ?? '').toLowerCase();
//   console.log('🔐 Logged-in user for enrolled sessions:', loggedInEmail);

//   this.ielc.GetEnrolledSessions().subscribe((data: string[]) => {
//     console.log('📦 Enrolled session data:', data);
//     console.log('🧩 Visible session IDs:', this.visibleSessionIds);

//     if (this.visibleSessionIds && this.visibleSessionIds.length > 0) {
//       // Normalize enrolled skill names for comparison
//       const enrolledSkillNames = data.map((name: string) =>
//         name?.trim().toLowerCase()
//       );

//       // Filter visible sessions by matching skill names
//       this.Enrolledskills = this.visibleSessionIds.filter((session: any) => {
//         const sessionSkillName = (session.skillName ?? '').trim().toLowerCase();
//         const matched = enrolledSkillNames.includes(sessionSkillName);

//         console.log(`🔍 Matching visible skill "${session.skillName}" -> Match: ${matched}`);
//         return matched;
//       });

//       // Extract just skill names for dropdown or display
//       const enrolledNames = this.Enrolledskills.map((s: any) => s.skillName);
//       console.log('🎯 Enrolled skills visible to user:', enrolledNames);
//       if (this.Enrolledskills.length > 0) {
//         this.topSkillName = this.Enrolledskills[0].skillName;
//         console.log('🏆 Top enrolled skill set from enrolled list:', this.topSkillName);
//       } else {
//         console.warn('⚠️ No matched enrolled skills');
//       }
//     } else {
//       console.warn('⚠️ No visible sessions stored from GetAllSkillSessions yet.');
//       this.Enrolledskills = [];
//     }
//   });
// }






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

//  GetEventsist(){
//   this.ielc.Getevents().subscribe((data) => {
//     this.eventslist=data;
//     // this.eventslist = this.sortlist(data);
//   });
//  }
//  GetExamlist(){
//   this.ielc.Getexaminfo().subscribe((data) => {
//     this.examlist=data;
    
//   });
//  }

// latestEvent: any; // Store the latest event

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
    }
    this.isLoading = false;
  });
  
}



showData(registration:any)
{
 console.log(registration)
}
save()
{
 // this.isTimeInputDisabled = !!this.time1;
  if (this.time1) {
   this.isTimeInputDisabled = true;
   }
  
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
     console.log(this.time2)
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
