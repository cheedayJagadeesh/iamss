import { Component,OnInit,ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { __values } from 'tslib';
import { NgForm } from '@angular/forms';
import { IelcapiService } from '../ielcapi.service';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import * as moment from 'moment';


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

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('registration') registration!: NgForm;
 // currentDate:Date=new Date()
 selectedDate:string=''
 examlist: any[] = []; 
 Registeredusers: any[] = []; 
 isLoading = true;
 skillname='';
 mode='';
 date='';
 time='';
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

constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router){
   // this.selectedDate= new Date().toString()
   this.selectedDate= new Date().toISOString().split('T')[0]
   this.isTimeInputDisabled=true;
   this.GetHolidayslist();
   this.GetEventsist();
   this.GetExamlist();
   this.GetAllUsers();
   if (this.eventslist && this.eventslist.length > 0) {
    this.eventslist = this.eventslist.sort((a, b) => Number(b.id) - Number(a.id));
  }
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
      this.userName = userDetails?.displayName ;
      this.userEmail = userDetails?.email;
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
GetAllUsers() {
  this.ielc.GetUsers().subscribe((data) => {
    const aadEmail = this.userEmail; // Use the retrieved AAD email

    if (aadEmail) {
      this.Registeredusers = this.sortRegisteredUsers(
        data.filter(user => user.mail === aadEmail)
      );
     
    } else {
      this.Registeredusers = []; // No users if email is missing
    }
  });
}
// getExamPercentage(skillName: string): number {
//   const row = this.Registeredusers.find(exam => exam.skillName === skillName);
//   if (row) {
//     console.log(`Exam Percentage for ${skillName}:`, row.examPercentage); // Debugging log
//     return Number(row.examPercentage); // Ensure it's a number
//   }
//   return 0; // Default to 0 if not found
// }
getExamPercentage(skillName: string): number {
  console.log("Searching for skill:", skillName);
  console.log("Exam List:", this.Registeredusers);

  const exam = this.Registeredusers.find(exam => exam.skillName === skillName);
  if (exam && exam.examPercentage !== undefined) {
    console.log(`Exam Percentage for ${skillName}:`, exam.examPercentage);
    return exam.examPercentage; // Always returns a number
  } 

  console.log(`Exam Percentage for ${skillName} not found, returning default value 0`);
  return 0; // Ensures function always returns a number
}
selectedSkill: string = '';
setSelectedSkill(skillName: string) {
  this.router.navigate(['/exampage'], { queryParams: { skill: skillName } });
}

setSelectedSkillandId(skillName: string, enrollmentID: number) {
  this.router.navigate(['/feedback'], { queryParams: { skill: skillName, enrollment: enrollmentID } });
}








 GetHolidayslist(){
  this.ielc.Getholidays().subscribe((data) => {
    this.holidayslist=data;
  });
 }
 sortlist(data: any[]): any[] {
  return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

 GetEventsist(){
  this.ielc.Getevents().subscribe((data) => {
    this.eventslist=data;
    // this.eventslist = this.sortlist(data);
  });
 }
//  GetExamlist(){
//   this.ielc.Getexaminfo().subscribe((data) => {
//     this.examlist=data;
    
//   });
//  }

GetExamlist() {
  this.ielc.Getexaminfo().subscribe((data: any[]) => {
    if (data) {
      this.examlist = data.map((item: any) => ({
        ...item,
        testTakenDate: item.testTakenDate
          ? moment(item.testTakenDate, 'MMM D YYYY hh:mmA').toDate()  // Convert to Date
          : null,
      }));
    }
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
