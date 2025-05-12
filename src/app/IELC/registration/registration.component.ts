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
currentUser: any = {};
allSkillSessions: any[] = [];
constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute,private emailService: EmailService){
   // this.selectedDate= new Date().toString()
   this.selectedDate= new Date().toISOString().split('T')[0]
   this.isTimeInputDisabled=true;
   this.GetHolidayslist();
   this.GetEventsList();
   this.GetExamlist();
  //  this.GetAllUsers();
  this.GetCourseist();
  
  // this.GetAllSkillSessions();
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




//  convertToISODate(dateStr: string): string {
//   const [dd, mm, yyyy] = dateStr.split('-');
//   return `${yyyy}-${mm}-${dd}`;
// }

convertToISODate(dateStr: string): string {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;  // Adding time part for consistency
}

// convertToISODate(dateStr: string): string {
//   if (!dateStr) {
//     console.warn('Invalid date string:', dateStr);
//     return ''; // or return null based on backend requirements
//   }
//   const [day, month, year] = dateStr.split('-');
//   if (day && month && year) {
//     const formattedDate = `${year}-${month}-${day}`;
//     console.log('Formatted Date:', formattedDate);
//     return formattedDate;
//   }
//   console.error('Invalid date format:', dateStr);
//   return ''; // or null if backend expects null for invalid dates
// }






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
    // console.log("Initializing MSAL...");
    
    // Ensure MSAL is properly initialized before proceeding
    await this.msalService.instance.initialize();  
    await this.msalService.instance.handleRedirectPromise();

    // console.log("MSAL initialized successfully.");
    
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount) {
      // console.warn("No active account found. Redirecting to login...");
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
        this.checkUserExists();
       
        // this.GetEnrolledSessionsSkillsData()
      }
    });   
  }
  
  
   catch (error) {
    // console.error("MSAL initialization error in HeaderComponent:", error);
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
    // console.log("✅ Final Registered Users:", this.Registeredusers);
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






//  onSkillChange(skill: string) {
//   if (skill) {
//     this.ielc.GetEnrolledSessionsbyvenue(skill).subscribe((venues) => {
//       // console.log('Venue response:', venues);
//       this.venueList = venues; // adjust based on API shape
//       this.selectedVenue = '';
//       this.showDateTimeDropdowns = false;
//       this.availableDates = [];
//       this.availableTimes = [];
//     });
//   }
// }

// onSkillChange(skill: string) {
//   if (skill) {
//     this.ielc.GetEnrolledSessionsbyvenue(skill).subscribe((venues: any[]) => {
//       const today = new Date();
//       console.log("🎯 Raw venue response:", venues);

//       // Filter out expired venues
//       // const validVenues = venues.filter(venue => new Date(venue.toDate) >= today);

      
//         // Filter out expired venues
//         const validVenues = venues.filter(venue => {
//           console.log('🔍 Venue:', venue); // Debug log to check the structure of each venue
//           if (!venue.toDate) {
//             console.warn('⚠️ Missing toDate for venue:', venue);
//             return true; // Treat missing toDate as valid
//           }
  
//           const toDate = new Date(venue.toDate);
//           console.log('🔍 Parsed toDate:', toDate);
  
//           return toDate >= today;  // Filter only venues that are valid
//         });

//       // Map to venue names and remove duplicates
//       this.venueList = validVenues
//         .map(v => v.venueName)
//         .filter((value, index, self) => self.indexOf(value) === index);

//         console.log("✅ Filtered venue list:", this.venueList);

//       this.selectedVenue = '';
//       this.showDateTimeDropdowns = false;
//       this.availableDates = [];
//       this.availableTimes = [];
//     });
//   }
// }

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


        if (skill.toLowerCase() === skillKey && isActive) {
          // Add active sessions to the map for this skill
          if (!skillSessionMap.has(skillKey)) {
            skillSessionMap.set(skillKey, []);
          }
          skillSessionMap.get(skillKey)!.push(session);
        }
      });

      // Now filter out the sessions based on the selected skill and only active ones
      const activeSkillSessions = skillSessionMap.get(skill.toLowerCase()) || [];

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

// onVenueChange(venue: string) {
//   this.showDateTimeDropdowns = venue === 'Teams';

//   if (this.showDateTimeDropdowns && this.skillname) {
//     this.ielc.GetEnrolledSessionsbydate(this.skillname).subscribe({
//       next: (res) => {
//         console.log('Date response:', res);
//         // this.availableDates = Array.isArray(res) ? res : res.map((d: any) => d.date);
//         this.availableDates = res.map((range: string) => {
//           const [start, end] = range.split(' - ');
//           return `${this.convertToDDMMYYYY(start)} - ${this.convertToDDMMYYYY(end)}`;
//         });
//         console.log('Available Dates:', this.availableDates);

//       },
//       error: (err) => {
//         console.error('Error fetching dates:', err);
//         this.availableDates = [];
//       }
//     });
    

//     // this.ielc.GetEnrolledSessionsbytime(this.skillname).subscribe({
//     //   next: (res) => {
//     //     console.log('Time response:', res);
//     //     this.availableTimes = Array.isArray(res) ? res : res.map((t: any) => t.time);
//     //   },
//     //   error: (err) => {
//     //     console.error('Error fetching times:', err);
//     //     this.availableTimes = [];
//     //   }
//     // });
//     // if (this.date) {
//     //   const correctedDateRange = this.convertToDDMMYYYY(this.date);
//     //   const encodedRange = encodeURIComponent(correctedDateRange);
//       if (this.date) {
//         // Now that you have a selected date, fetch time slots for that date range
//         const selectedDateRange = this.date; // This should be a selected date from availableDates (e.g., '11-04-2025 - 24-04-2025')
//         const correctedDateRange = selectedDateRange.split(' - ').map(date => this.convertToDDMMYYYY(date)).join(' - '); // Convert to YYYY-MM-DD for the API
    
//       this.ielc.getEnrollmentSessionsBySkillAndDateRange(this.skillname, encodeURIComponent(correctedDateRange)).subscribe({
//         next: (res) => {
//           console.log('✅ Time slots for selected range:', res);
//           this.availableTimes = Array.isArray(res) ? res : res.map((t: any) => t.time);
//         },
//         error: (err) => {
//           console.error('❌ Error fetching time slots:', err);
//           this.availableTimes = [];
//         }
//       });
//     } else {
//       console.warn('⚠️ Date range not selected before time fetch!');
//     }
    

//     // if (this.date && this.time) {
//     //   this.checkBatchAvailability();
//     // }
//   } else {
//     this.availableDates = [];
//     this.availableTimes = [];
//     this.date = '';
//     this.time = '';
//     this.batchMembersCount = 0;
//   }
// }

onVenueChange(venue: string) {
  // this.showDateTimeDropdowns = venue === 'Teams';
  this.showDateTimeDropdowns = ['Teams', 'Offline'].includes(venue);

  if (this.showDateTimeDropdowns && this.skillname) {
    // Fetch available dates first
    const trimmedSkillname = this.skillname.trim();
    this.ielc.GetEnrolledSessionsbydate(trimmedSkillname,venue).subscribe({
      next: (res) => {
        // console.log('Date response:', res);
        // Process the date range data (Convert to DD-MM-YYYY)
        // this.availableDates = res.map((range: string) => {
        //   const [start, end] = range.split(' - ');
        //   return `${this.convertToDDMMYYYY(start)} - ${this.convertToDDMMYYYY(end)}`;
        // });
        this.availableDates=res;
        // Print available dates
        // console.log('Available Dates:', this.availableDates);
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

// Method to fetch time slots based on selected date range
onDateChange() {
  // If a valid date is selected from the available dates
  if (this.date) {
    
    this.ielc.getEnrollmentSessionsBySkillAndDateRange(this.skillname, this.date).subscribe({
      next: (res) => {
        // console.log('✅ Time slots for selected range:', res);
        // Map response to available time slots
        this.availableTimes = Array.isArray(res) ? res : res.map((t: any) => t.time);
      },
      error: (err) => {
        // console.error('❌ Error fetching time slots:', err);
        this.availableTimes = [];
      }
    });
  } else {
    // console.warn('⚠️ No date selected for fetching time slots!');
  }
}


// convertToYYYYMMDD(date: string): string {
//   const [day, month, year] = date.split('-');
//   return `${year}-${month}-${day}`;
// }

// convertToYYYYMMDD(dateStr: string): string {
//   const [dd, mm, yyyy] = dateStr.split('-');
//   return `${yyyy}-${mm}-${dd}`; // correct ISO format
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
  // console.log('📅 Original date range:', this.date);
  // console.log('➡️ Parsed startDate:', startDate);
  // console.log('➡️ Parsed endDate:', endDate);

  const skill = this.skillname;
  const date = this.date;
  const time = this.time;
  const mail = this.userEmail ?? '';

  // If Teams, do the duplicate check
  if (this.selectedVenue === 'Teams' || this.selectedVenue === 'Offline') {
    this.ielc.checkIfAlreadyEnrolled(skill, date, time, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
        if (alreadyEnrolled) {
          alert('You are already enrolled for this batch!');
          return;
        }

        const batchCountToInsert = this.batchMembersCount;

        this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedVenue, batchCountToInsert, startDate, endDate, now);
        // window.location.reload();
      },
      error: (err) => {
        // console.error('❌ Error checking enrollment status:', err);
        alert('Failed to verify enrollment status. Please try again.');
      }
    });
  } else if (this.selectedVenue !== 'Teams') {
    // Duplicate check for self-learning
    this.ielc.checkVenueEnrollment(skill, this.selectedVenue, mail).subscribe({
      next: (alreadyEnrolled: boolean) => {
        if (alreadyEnrolled) {
          alert('You are already enrolled for this skill!');
          return;
        }

        const batchCountToInsert = 0;
        this.proceedToEnroll(fullName, mail, skill, date, time, this.selectedVenue, batchCountToInsert, startDate, endDate, now);
        // window.location.reload();
      },
      error: (err) => {
        // console.error('❌ Error checking  enrollment:', err);
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
  const convertedStart = this.convertToISODate((startDate || '').trim()) || new Date().toISOString();
const convertedEnd = this.convertToISODate((endDate || '').trim()) || new Date().toISOString();

  // console.log('✅ Converted Start Date:', convertedStart);
  // console.log('✅ Converted End Date:', convertedEnd);

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
    comments: ''
  };
  // console.log('📤 Final enrollment payload:', enrollmentData);

  this.ielc.enrollUser(enrollmentData).subscribe({
    next: () => {
      // Immediately show alert and reset form
      alert('Enrollment successful! A confirmation email will be sent shortly.');
      this.resetForm();
      this.GetAllUsers();

      // Proceed with email sending (non-blocking)
      const sessionDescription = this.getSessionDescription(skill, venue, date, time);
      // console.log('📘 Session Description:', sessionDescription); 
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

      this.emailService.sendEmail(mail,'', subject, body);
    },
    error: (err) => {
      // console.error('Enrollment error:', err);
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

// getSessionDescription(skill: string, venue: string, date: string, time: string): string {
//   console.log('🔍 Searching for session description using:', { skill, venue, date, time });

//   // const matchedSession = this.allSkillSessions.find((session: any) =>
//   //   session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
//   //   session.venue?.trim().toLowerCase() === venue.trim().toLowerCase() 
    
//   // );
//     // Convert the selected date to the format (YYYY-MM-DD)
//     const [selectedStartDate, selectedEndDate] = date.split(' - ').map(this.convertToYYYYMMDD);

//     // Loop through allSkillSessions and find the matching session
//     const matchedSession = this.allSkillSessions.find((session: any) => {
//       // Convert session dates to the same format (YYYY-MM-DD)
//       const sessionStartDate = this.convertToYYYYMMDD(session.fromDate);
//       const sessionEndDate = this.convertToYYYYMMDD(session.toDate);
  
//       // Format the session time range
//       const sessionTime = `${this.convertTo12HourFormat(session.skillStartTime)} - ${this.convertTo12HourFormat(session.skillEndTime)}`;
  
//       // Compare skill, venue, date range, and time
//       return session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
//              session.venue?.trim().toLowerCase() === venue.trim().toLowerCase() &&
//              (selectedStartDate >= sessionStartDate && selectedEndDate <= sessionEndDate) &&
//              time === sessionTime;
//     });

//   console.log('📘 Matched session:', matchedSession);

//   return matchedSession?.skillDescription ?? 'No description available';
// }

// convertTo12HourFormat(time: string): string {
//   const [hour, minute] = time.split(':');
//   const period = +hour >= 12 ? 'PM' : 'AM';
//   const hour12 = +hour % 12 || 12; // convert hour to 12-hour format, 0 becomes 12
//   return `${hour12}:${minute} ${period}`;
// }

getSessionDescription(skill: string, venue: string, date: string, time: string): string {
  // console.log('🔍 Searching for session description using:', { skill, venue, date, time });

  // Convert the selected date to the format (YYYY-MM-DD)
  const [selectedStartDate, selectedEndDate] = date.split(' - ').map(this.convertDDMMYYYYToYYYYMMDD);

  // // Loop through allSkillSessions and find the matching session
  const matchedSession = this.allSkillSessions.find((session: any) => {
    // Convert session dates to the same format (YYYY-MM-DD)
    const sessionStartDate = this.convertToYYYYMMDD(session.fromDate);
    const sessionEndDate = this.convertToYYYYMMDD(session.toDate);

    // Format the session time range (if necessary)
    const sessionTime = `${this.convertTo12HourFormat(session.skillStartTime)} - ${this.convertTo12HourFormat(session.skillEndTime)}`;

    // console.log('🧪 Comparing:', {
    //   skillSessionName: session.skillName,
    //   skillParam: skill,
    //   venueSession: session.venue,
    //   venueParam: venue,
    //   sessionDateRange: [sessionStartDate, sessionEndDate],
    //   selectedDateRange: [selectedStartDate, selectedEndDate],
    //   sessionTime,
    //   paramTime: time
    // });
    


    if (venue === 'Teams') {
      // Compare skill, venue, date range, and time for "Teams" venue
      return session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
             session.venue?.trim().toLowerCase() === venue.trim().toLowerCase() &&
             (selectedStartDate >= sessionStartDate && selectedEndDate <= sessionEndDate) &&
             time === sessionTime;
             
    } else {
      // Compare only skill and venue for non-"Teams" venue
      return session.skillName?.trim().toLowerCase() === skill.trim().toLowerCase() &&
             session.venue?.trim().toLowerCase() === venue.trim().toLowerCase();
    }
  });

  
  // console.log('📘 Matched session:', matchedSession);

  return matchedSession?.skillDescription ?? 'No description available';
}

// Helper method to convert time from 24-hour to 12-hour format
convertTo12HourFormat(time: string): string {
  const [hour, minute] = time.split(':');
  const period = +hour >= 12 ? 'PM' : 'AM';
  const hour12 = +hour % 12 || 12; // convert hour to 12-hour format, 0 becomes 12
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
  // console.log('🔐 Logged-in user:', loggedInEmail);

  // forkJoin({
  //   sessions: this.ielc.GetSkillSessions(),
  //   aadUsers: this.ielc.GetAadUserslist(),
  //   aadGroups: this.ielc.GetAadUserGroupslist()
  // }).subscribe(async ({ sessions, aadUsers, aadGroups }) => {

  //   const validGroups = aadGroups.map((g: any) => g.displayName?.trim()).filter(Boolean);
  //   const visibleSessions: any[] = [];
  //   const visibleSessionDetails: { sessionID: number, skillName: string }[] = [];
    

  //   for (const session of sessions) {
  //     const skill = session.skillName;
      
  //     // Initialize sessionUsers before using it
  //     const sessionUsers: string[] = (session.aadUsersData || '')
  //       .split(',')
  //       .map((u: string) => u.trim().toLowerCase())
  //       .filter(Boolean);

  //     console.log('📘 Checking session:', skill);
  //     console.log('📍 Raw Users field:', session.aadUsersData);  // Check if Users is undefined
  //     console.log('📍 Processed Users:', sessionUsers);

  //     // Check if the logged-in user is assigned
  //     let isUserAssigned = sessionUsers.includes(loggedInEmail);

  //     // Process session groups
  //     const sessionGroups: string[] = (session.groups || '')
  //       .split(',')
  //       .map((g: string) => g.trim())
  //       .filter(Boolean);

  //     let isGroupAssigned = false;
  //     console.log('📍 Groups:', sessionGroups);

  //     // Check if user is part of any assigned group
  //     for (const group of sessionGroups) {
  //       if (group && validGroups.includes(group)) {
  //         try {
  //           const groupMembers = await this.ielc.getUsersOfGroup(group).toPromise();
  //           const lowerGroupMembers = groupMembers.map((m: any) => m.toLowerCase());

  //           console.log(`📂 Group "${group}" members:`, lowerGroupMembers);

  //           if (lowerGroupMembers.includes(loggedInEmail)) {
  //             isGroupAssigned = true;
  //             console.log(`✅ User is part of group "${group}"`);
  //             break;
  //           }
  //         } catch (err) {
  //           console.error(`❌ Failed to fetch members of group "${group}"`, err);
  //         }
  //       }
  //     }


  //   console.log('🔍 Initial visibleSessions length:', visibleSessions.length);


  //         // Access checks
  //         const isSessionPublic = sessionUsers.length === 0 && sessionGroups.length === 0;
  //         const hasAccess = isUserAssigned || isGroupAssigned || isSessionPublic;

  //         // Log access details
  //         console.log(`Session "${session.skillName}" -> Access: ${hasAccess}`);
          
  //         if (hasAccess) {
  //           visibleSessions.push(session);
  //           visibleSessionDetails.push({ sessionID: session.sessionID, skillName: skill });
  //           console.log(`✔️ "${session.skillName}" added to visible sessions`);
  //         } else {
  //           console.log(`🚫 "${session.skillName}" hidden from this user`);
  //         }
  //       }
  

  //       console.log('✅ Final visible session IDs with skills:', visibleSessions);
  //       this.visibleSessionIds = visibleSessions;

  //   console.log('✅ Visible session IDs with skills:', visibleSessions);
   
  //   this.Enrolledusers = this.sortRegisteredUsersbysession(visibleSessions);
  //   // this.GetEnrolledSessionsSkillsData();
  //   if (!this.topSkillReady) {
  //     this.GetEnrolledSessionsSkillsData();
  //   }

  //   // if (this.Enrolledusers.length > 0) {
  //   //   this.topSkillName = this.Enrolledusers[0].skillName;
  //   //   console.log('🏆 Top visible skill:', this.topSkillName);
  //   // } else {
  //   //   console.warn('⚠️ No visible skills for this user');
  //   // }
  // });

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
//-previous working code
// GetEnrolledSessionsSkillsData() {
//   const loggedInEmail = (this.userEmail ?? '').toLowerCase();
//   // console.log('🔐 Logged-in user for enrolled sessions:', loggedInEmail);

//   this.ielc.GetEnrolledSessions().subscribe((data) => {
//     console.log('📦 Enrolled session data:', data);
//     console.log('🧩 Visible session IDs:', this.visibleSessionIds);
//     if (this.visibleSessionIds && this.visibleSessionIds.length > 0) {
      
//       const enrolledSkillNames = data.map((name: string) => name.trim().toLowerCase());

//         this.Enrolledskills = this.visibleSessionIds.filter((session: any) => {
//           const sessionSkillName = (session.skillName ?? '').trim().toLowerCase();
//           const matched = enrolledSkillNames.includes(sessionSkillName);

//           console.log(`🔍 Matching visible skill "${session.skillName}" -> Match: ${matched}`);
//           return matched;
//         });
      

//         const enrolledNames = this.Enrolledskills.map((s: any) => s.skillName);
//         console.log('🎯 Enrolled skills visible to user:', enrolledNames);


        

//         if ( enrolledNames.length > 0) {
//           this.topSkillName = enrolledNames[0];
//           // this.topSkillReady = true;
//           // console.log('🏆 Final topSkillName:', this.topSkillName);
//         }
      
//     } 
//     else {
//       console.warn('⚠️ No visible sessions stored from GetAllSkillSessions yet.');
//       this.Enrolledskills = [];
//     }
//   });
  
// }

// GetEnrolledSessionsSkillsData() {
//   const loggedInEmail = (this.userEmail ?? '').toLowerCase();

//   this.ielc.GetEnrolledSessions().subscribe((data) => {
//     console.log('📦 Enrolled session data:', data);
//     console.log('🧩 Visible session IDs:', this.visibleSessionIds);

//     if (this.visibleSessionIds && this.visibleSessionIds.length > 0) {
//       const enrolledSkillNames = data.map((name: string) => name.trim().toLowerCase());

//       const today = new Date(); 
//       // Filter by match
//       let filtered = this.visibleSessionIds.filter((session: any) => {
//         const sessionSkillName = (session.skillName ?? '').trim().toLowerCase();
//         const matched = enrolledSkillNames.includes(sessionSkillName);

//         const sessionEndDate = new Date(session.toDate);
//         const isActiveSession = sessionEndDate >= today;

//         console.log(`🔍 Matching visible skill "${session.skillName}" -> Match: ${matched}`);
//         return matched && isActiveSession;
//       });

//       // Remove duplicates by skillName (case-insensitive)
//       const uniqueSkillsMap = new Map<string, any>();
//       filtered.forEach((session: any) => {
//         const skillNameKey = (session.skillName ?? '').trim().toLowerCase();
//         if (!uniqueSkillsMap.has(skillNameKey)) {
//           uniqueSkillsMap.set(skillNameKey, session);
//         }
//       });

//       this.Enrolledskills = Array.from(uniqueSkillsMap.values());
//       const enrolledNames = this.Enrolledskills.map((s: any) => s.skillName);
//       console.log('🎯 Enrolled skills visible to user (unique):', enrolledNames);

//       if (enrolledNames.length > 0) {
//         this.topSkillName = enrolledNames[0];
//       }
//     } else {
//       console.warn('⚠️ No visible sessions stored from GetAllSkillSessions yet.');
//       this.Enrolledskills = [];
//     }
//   });
// }

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
        // const sessionEndDate = new Date(session.toDate);
        // const isActive = sessionEndDate >= today;

      //   const sessionEndDate = new Date(session.toDate);
      //    // Normalize session end date to midnight (00:00:00)
      // const sessionDateOnly = new Date(sessionEndDate.setHours(0, 0, 0, 0)); // Sets time to 00:00:00

      // const sessionSkillEndTime = session.skillEndTime;

      // // // Convert session skill end time to minutes from midnight
      // // const [sessionEndHour, sessionEndMinute] = sessionSkillEndTime.split(':').map((x: string) => parseInt(x, 10));
      // // const sessionTimeInMinutes = sessionEndHour * 60 + sessionEndMinute;

      // // Check if the session end date is valid
      // const isDateValid = sessionDateOnly >= currentDateOnly;

      // // Log the comparison details for date
      // console.log(`🗓️ Comparing session end date with current date: ${sessionDateOnly} >= ${currentDateOnly} -> ${isDateValid}`);

      // // Check if the session end time is valid (only if date is valid)
      // let isTimeValid = false;
      // if (isDateValid) {
      //   isTimeValid = sessionSkillEndTime >= currentTime;
      // }

      // // Log the comparison details for time
      // console.log(`⏰ Comparing session skill end time with current time: ${sessionSkillEndTime}  >= ${currentTime}  -> ${isTimeValid}`);

      // const isActive = isDateValid && isTimeValid;

      
  // Combine session.toDate and session.skillEndTime into full DateTime
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

checkUserExists() {

  this.GetAllUniqueNames().subscribe((usernames: string[]) => {

    // Ensure showButton is always a boolean value

    this.showButton = !!(this.userName && usernames.includes(this.userName));

    if (this.showButton) {

      // console.log('Your username exists in the list.');

    } else {

      // console.log('Your username is NOT in the list.');

    }

  });

}
 
 
GetAllUniqueNames(): Observable<string[]> {

  // Directly return the Observable from GetUniqueName() instead of subscribing inside

  return this.ielc.GetUniqueName();

}
 
showButton: boolean = false;
 

// smtplist: any[] = []; 
// GetSmtplist(){
//   this.ielc.Getsmtp().subscribe((data) => {
//     this.smtplist=data;
//     this.smtplist = this.sortlist(data)
//     this.isLoading = false;
//   });
//  }

//  decryptPassword(encodedPassword: string): string {
//   return atob(encodedPassword); // Base64 decode
// }

// // sendEmail(){
// // const smtp = this.smtplist[0];
// // const decryptedPassword = this.decryptPassword(smtp.password);

// // const payload = {
// //   username: smtp.username,
// //   password: decryptedPassword,
// //   to: 'akhilpasha.m@inteqsolutions.com', // or dynamic email
// //   cc: '',
// //   subject: 'Register Enrollment',
// //   body: 'You have successfully enrolled for the skill session.'
// // };

// // this.ielc.sendEmailFromBackend(payload).subscribe({
// //   next: () => {
// //     console.log('✅ Email sent from backend.');
// //     alert('📧 Confirmation email sent!');
// //   },
// //   error: (err) => {
// //     console.error('❌ Email error:', err);
// //     alert('❌ Failed to send email.');
// //   }
// // });
// // }

// sendEmail(to: string, cc: string, subject: string, body: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const smtp = this.smtplist[0];
//     const decryptedPassword = this.decryptPassword(smtp.password);
    
//     const EmailPayload = {
//       smtpUserName: smtp.userName,
//       smtpPassword: decryptedPassword,
//       to: to,
//       cc: 'jagadeesh.c@inteqsolutions.com',
//       // cc: 'akhilpasha.m@inteqsolutions.com',
//       subject,
//       body
//     };

//     console.log("🚀 Payload to backend:", EmailPayload);
    
//     this.ielc.sendEmailFromBackend(EmailPayload).subscribe({
//       next: () => {
//         console.log('✅ Email sent from backend.');
//         resolve(); // Resolve when the email is successfully sent
//       },
//       error: (err) => {
//         console.error('❌ Email error:', err);
//         reject(err); // Reject if there's an error in sending email
//       }
//     });
//   });
// }







showData(registration:any)
{
//  console.log(registration)
}
save()
{
//  // this.isTimeInputDisabled = !!this.time1;
//  if (this.time1) {
//   this.isTimeInputDisabled = true;
//   }

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
