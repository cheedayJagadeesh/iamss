import { EventSchedulerUserModel } from './../event-scheduler-user.model';
import { AuthService } from './../../authservice.service';
import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-eventscheduler',
  templateUrl: './eventscheduler.component.html',
  styleUrls: ['./eventscheduler.component.css']
})
export class EventschedulerComponent implements OnInit{
//departments = ['HR', 'IT', 'Finance', 'Operations', 'Sales'];
AuditeesDept: any[]=[];
Time: string[] = [];          
filteredTimes: string[] = []; 
 //selectedAuditee = '';
 hasPermission: boolean = true;
 selectedStatus: string = '';
selectedDept =  '';
selectedTime =  '';
selectedDate = '';
selectedAuditee: any | null = null;
 eventscheduleradmin: any[]=[];

  userName: string | null = null;
  userEmail: string | null = null;
  isLoading: boolean = true;
  selectedCompliance = '';
  selectedProject: string = ''; 
  showProjectDropdown = false;
  showTable = false;
  selectedTableData: any[] = [];
  ccDisplayNames: string[] = [];
  toDisplayNames: string[] = [];
  ccDisplayNamesqms: string[] = [];
  toDisplayNamesqms: string[] = [];
    matchedSuperOwner: boolean = false;
  matchedOwner: boolean = false;
  matchedSuperOwnerqms: boolean = false;
  matchedOwnerqms: boolean = false;
 projectlist: any[] = [];
userProjects: string[] = [];
  superownerss: any[] = [];
  ownerss: any[] = [];
  event: any | null = null;
  minDate!: string;
maxDate!: string;

 
 constructor(private ielc:IelcapiService, private authService: AuthService) {
  }
      sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }

  // ngOnInit(): void {
  //   this.GetEventscheduleData();
  //   this.GetEventscheduleTime();
  //   this.loadAllTimes();
  //   this.GetEventSchedulerAdmin();
  // }

  //   ngOnInit(): void {
  
  //   this.authService.userDetails$.subscribe(userDetails => {
  //     //this.userName = 'Ramprasad .KP' ;
  //      this.userName = userDetails?.displayName;
  //     this.userEmail = userDetails?.email ;
  //   });
  //   this.GetEventscheduleData();
  //   this.GetEventscheduleTime();
  //   this.loadAllTimes();
  //   this.GetEventSchedulerAdmin();

  // this.GetAllProjectsList();
  // this.GetSuperOwners(this.userName);
  // this.GetOwners();
  //  this.GetUserByProjectsList();
  // this.GetFilteredISMSUserTable();
  //   }

// ngOnInit(): void {
//   this.authService.userDetails$.subscribe(userDetails => {
//     this.userName = userDetails?.displayName;
//     // this.userName = "Ramprasad .KP";
//     this.userEmail = userDetails?.email;

//     if (this.userName) {
//       this.ielc.GetEventsscfilterprojects(this.userName).subscribe({
//         next: (userbyprojectsdata) => {
//           if (!userbyprojectsdata || userbyprojectsdata.length === 0) {
//             this.hasPermission = false;
//             this.showTable = false;
//             this.isLoading = false;
//           } else {
//             this.projectlist = userbyprojectsdata;
//             this.hasPermission = true;

//             // Only load these if user has access:
//             this.GetEventscheduleData();
//             this.GetEventscheduleTime();
//             this.loadAllTimes();
//             this.GetEventSchedulerAdmin();
//             this.GetAllProjectsList();
//             this.GetSuperOwners(this.userName);
//             this.GetOwners();
//             this.GetFilteredISMSUserTable();
//             this.GetUserByProjectsList();
//           }
//         },
//         error: (err) => {
//           //console.error("GetUserByProjects error:", err);
//           this.hasPermission = false;
//           this.showTable = false;
//           this.isLoading = false;
//         }
//       });
//     } else {
//       this.hasPermission = false;
//       this.showTable = false;
//       this.isLoading = false;
//     }
//   });
// }

ngOnInit(): void {

  this.authService.userDetails$.subscribe(userDetails => {
    this.userName = userDetails?.displayName;
    //this.userName = "Venkat Merla";
    // this.userName = "Ramprasad .KP";
    this.userEmail = userDetails?.email;

    if (!this.userName) {
      this.hasPermission = false;
      this.showTable = false;
      this.isLoading = false;
      return;
    }

    this.ielc.GetEventsscfilterprojects(this.userName).subscribe({
      next: (userbyprojectsdata) => {
        if (userbyprojectsdata && userbyprojectsdata.length > 0) {
          this.projectlist = userbyprojectsdata;
          this.hasPermission = true;

          // Only basic setup
          this.GetEventscheduleTime();
          this.loadAllTimes();
          this.GetEventSchedulerAdmin();
          this.GetAllProjectsList();
          this.GetSuperOwners(this.userName);
          this.GetOwners();
          this.GetUserByProjectsList();
          this.GetLatestEvent();
        } else {
          this.checkCCPermission();
        }
      },
      error: (err) => {
        this.checkCCPermission();
      }
    });
  });
}

// ngOnInit(): void {
//   this.authService.userDetails$.subscribe(userDetails => {
//     this.userName = userDetails?.displayName;
//     // For testing:
//     // this.userName = "Venkat Merla";
//     // this.userName = "Ramprasad .KP";
//     this.userEmail = userDetails?.email;

//     if (!this.userName) {
//       this.hasPermission = false;
//       this.showTable = false;
//       this.isLoading = false;
//       return;
//     }

//     this.ielc.GetEventsscfilterprojects(this.userName).subscribe({
//       next: (userbyprojectsdata) => {
//         if (userbyprojectsdata && userbyprojectsdata.length > 0) {
//           this.projectlist = userbyprojectsdata;
//           this.hasPermission = true;

//           // Load other necessary data
//           this.GetEventscheduleTime();
//           this.loadAllTimes();
//           this.GetEventSchedulerAdmin();
//           this.GetAllProjectsList();
//           this.GetSuperOwners(this.userName);
//           this.GetOwners();
//           this.GetUserByProjectsList();
//           this.GetLatestEvent();

//           // ✅ Parse event.organizerDateRange if available
//           if (this.event && this.event.organizerDateRange) {
//             const parts = this.event.organizerDateRange.split("–");
//             if (parts.length === 2) {
//               const parseDatePart = (part: string): string | null => {
//                 const trimmed = part.trim().toUpperCase();
//                 // Ex: "JULY 21TH"
//                 const match = trimmed.match(/^([A-Z]+)\s+(\d{1,2})/);
//                 if (match) {
//                   const monthName = match[1];
//                   const day = match[2].padStart(2, "0");
//                   const monthMap: { [key: string]: string } = {
//                     JANUARY: "01",
//                     FEBRUARY: "02",
//                     MARCH: "03",
//                     APRIL: "04",
//                     MAY: "05",
//                     JUNE: "06",
//                     JULY: "07",
//                     AUGUST: "08",
//                     SEPTEMBER: "09",
//                     OCTOBER: "10",
//                     NOVEMBER: "11",
//                     DECEMBER: "12"
//                   };
//                   const month = monthMap[monthName];
//                   if (month) {
//                     const year = new Date().getFullYear(); // Use current year
//                     return `${year}-${month}-${day}`;
//                   }
//                 }
//                 return null;
//               };

//               const start = parseDatePart(parts[0]);
//               const end = parseDatePart(parts[1]);

//               if (start && end) {
//                 this.minDate = start;
//                 this.maxDate = end;

//                 // Optionally prefill selectedDate if today is in range
//                 const today = new Date().toISOString().substring(0, 10);
//                 if (today >= this.minDate && today <= this.maxDate) {
//                   this.selectedDate = today;
//                 }
//               } else {
//                 console.warn("Could not parse organizerDateRange:", this.event.organizerDateRange);
//               }
//             } else {
//               console.warn("Invalid organizerDateRange format:", this.event.organizerDateRange);
//             }
//           }
//         } else {
//           this.checkCCPermission();
//         }
//       },
//       error: (err) => {
//         this.checkCCPermission();
//       }
//     });
//   });
// }




// This checks if user is a CC
checkCCPermission(): void {
  this.ielc.GetCCDisplayNames().subscribe({
    next: (ccNames) => {
      const lowerUser = this.userName!.toLowerCase();
      const isCC = ccNames.some(name => name.toLowerCase().includes(lowerUser));
      if (isCC) {
        this.hasPermission = true;
        this.GetAllProjectsList();
      } else {
        this.hasPermission = false;
        this.showTable = false;
        this.isLoading = false;
      }
    },
    error: (err) => {
      console.error("GetCCDisplayNames error:", err);
      this.hasPermission = false;
      this.showTable = false;
      this.isLoading = false;
    }
  });
}


  //   GetLatestEvent() {
  //   this.ielc.GetLatestEvent().subscribe({
  //     next: (data) => {
  //       this.event = data;
  //     },
  //     error: (err) => console.error('Failed to load event schedule', err)
  //   });
  // }

   GetLatestEvent() {
  this.ielc.GetLatestEvent().subscribe({
    next: (data) => {
      this.event = data;

      if (this.event.organizerDateRange) {
        this.parseDateRange(this.event.organizerDateRange);
        this.selectedDate = this.minDate;
      }
    },
    error: (err) => console.error('Failed to load event schedule', err)
  });
}

parseDateRange(range: string) {
  const [start, end] = range.toUpperCase().split('–').map(s => s.trim());
  const currentYear = new Date().getFullYear();

  const parseToDate = (str: string) => {
    const clean = str.replace(/(ST|ND|RD|TH)/, ''); // Remove suffix
    return new Date(`${clean} ${currentYear}`);
  };

  const startDate = parseToDate(start);
  const endDate = parseToDate(end);

this.minDate = this.formatDateToInput(startDate);
this.maxDate = this.formatDateToInput(endDate);

}

formatDateToInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  GetEventSchedulerAdmin(){
  this.ielc.GetEventSchedulerAdmin().subscribe((data) => {
    this.eventscheduleradmin=data;
    this.eventscheduleradmin = this.sortlist(data)
    // this.isLoading = false;
   /// console.log(this.eventscheduleradmin);
  });
 }

 GetEventscheduleData(){
  this.ielc.GetEventSchedulerUserAuditeesDept().subscribe((data) => {
    this.projectlist=data;
  });
 }

 GetEventscheduleTime(){
  this.ielc.GetEventSchedulerTime().subscribe((data) => {
    this.Time=data;
  });
 }
loadAllTimes() {
  this.ielc.GetEventSchedulerTime().subscribe((data: string[]) => {
    this.Time = data;
    this.filteredTimes = [...data]; // show all initially
  });
}


onDateChange() {
  if (this.selectedDate) {
    this.ielc.GetBookedTimes(this.selectedDate).subscribe((booked: string[]) => {
      this.filteredTimes = this.Time.filter(t => !booked.includes(t));
    });
  } else {
    this.filteredTimes = [...this.Time]; // reset
  }
}



 onSubmit() {
  if (!this.selectedDept || !this.selectedDate || !this.selectedTime) {
    alert('Please complete all fields.');
    return;
  }

  // Step 1: Check if schedule exists first
  this.ielc.checkScheduleExists(this.selectedDept, this.selectedDate, this.selectedTime).subscribe({
    next: (exists) => {
      if (exists) {
        alert('Schedule already created for this date and time.');
      } else {
        // Step 2: If not exists, create the schedule
        const updateData = {
          ID: 0,
          AUDITEEDEPARTMENT: this.selectedDept,
          STARTING: this.selectedDate,
          TIME: this.selectedTime,
          AUDITEES: null,
          AUDITORS: null
        };

        this.ielc.UpdateEventScheduleByDepartment(updateData).subscribe({
          next: (res) => {
            alert('Schedule created successfully');
            this.onDateChange();
            this.onDepartmentChange();
          },
          error: (err) => {
            console.error(err);
            alert('Failed to update schedule.');
          }
        });
      }
    },
    error: (err) => {
      console.error('Failed to check schedule existence', err);
      alert('Error occurred while checking schedule.');
    }
  });
}

onDepartmentChange() {
  if (this.selectedDept) {
    this.ielc.GetEventSchedulerUserByDept(this.selectedDept).subscribe({
      next: (data) => {
        this.selectedAuditee = data;
      },
      error: (err) => {
        console.error('Failed to fetch auditee details', err);
        this.selectedAuditee = null;
      }
    });
  } else {
    this.selectedAuditee = null;
  }
}



onComplianceChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedCompliance = target.value;

  this.isLoading = true;
  this.hasPermission = false;
  this.showTable = false;
  this.selectedTableData = [];
  this.showProjectDropdown = true;
  this.selectedProject = '';

  forkJoin({
    ccData: this.ielc.GetCCDisplayNames(),
    toData: this.ielc.GetToDisplayNames(),
    ccDataqms: this.ielc.GetCCDisplayNamesQMS(),
    toDataqms: this.ielc.GetToDisplayNamesQMS(),
  }).subscribe(({ ccData, toData, ccDataqms, toDataqms }) => {
    this.ccDisplayNames = ccData;
    this.toDisplayNames = toData;
    this.ccDisplayNamesqms = ccDataqms;
    this.toDisplayNamesqms = toDataqms;

    if (this.userName) {
      const lowerUser = this.userName.toLowerCase();

      this.matchedSuperOwner = this.ccDisplayNames.some(name =>
        name.toLowerCase().includes(lowerUser)
      );

      this.matchedOwner = this.toDisplayNames.some(name =>
        name.toLowerCase().includes(lowerUser)
      );

      this.matchedSuperOwnerqms = this.ccDisplayNamesqms.some(name =>
        name.toLowerCase().includes(lowerUser)
      );

      this.matchedOwnerqms = this.toDisplayNamesqms.some(name =>
        name.toLowerCase().includes(lowerUser)
      );

      let complianceData$: Observable<any[]> | undefined;

  if (this.matchedSuperOwner) {
    this.GetAllProjectsList();
    complianceData$ = this.ielc.GetEventSchedulerUserAuditeesDept();
        this.hasPermission = true;
  } else if (this.matchedOwner) {
    this.GetUserByProjectsList();
    complianceData$ = this.GetFilteredISMSUserTable();
  } else {
    this.hasPermission = false;
    this.showTable = false;
    this.isLoading = false;
    return;
  }

      if (complianceData$) {
        complianceData$.subscribe({
          next: (data) => {
            this.selectedTableData = this.sortlist(data);
            this.hasPermission = this.selectedTableData.length > 0;
            this.showTable = this.selectedTableData.length > 0;
            this.isLoading = false;
          },
          error: () => {
            this.selectedTableData = [];
            this.hasPermission = false;
            this.showTable = false;
            this.isLoading = false;
          }
        });
      }
    }
  });
}


// onComplianceChange(event: Event): void {
//   const target = event.target as HTMLSelectElement;
//   this.selectedCompliance = target.value;

//   this.isLoading = true;
//   this.hasPermission = false;
//   this.showTable = false;
//   this.selectedTableData = [];
//   this.showProjectDropdown = true;
//   this.selectedProject = '';

//   // ✅ Add extraToData observable here
//   forkJoin({
//     ccData: this.ielc.GetCCDisplayNames(),
//     toData: this.ielc.GetToDisplayNames(),
//     extraToData: this.ielc.Getextratouser()   // <--- your extra TO users from API
//   }).subscribe(({ ccData, toData, extraToData }) => {
//     const lowerUser = this.userName!.toLowerCase();

//     // ✅ Combine toData with extraToData
//     const combinedToData = [...toData, ...extraToData];

//     console.log(combinedToData);

//     // ✅ Matching logic
//     this.matchedSuperOwner = ccData.some(name =>
//       name.toLowerCase().includes(lowerUser)
//     );
//     this.matchedOwner = combinedToData.some(name =>
//       name.toLowerCase().includes(lowerUser)
//     );

//     let complianceData$: Observable<any[]> | undefined;

//     if (this.matchedSuperOwner) {
//       complianceData$ = this.ielc.GetEventSchedulerUserAuditeesDept();
//     } else if (this.matchedOwner) {
//       complianceData$ = this.GetFilteredISMSUserTable();
//     } else {
//       this.hasPermission = false;
//       this.showTable = false;
//       this.isLoading = false;
//       return;
//     }

//     if (complianceData$) {
//       complianceData$.subscribe({
//         next: (data) => {
//           this.selectedTableData = this.sortlist(data);
//           this.hasPermission = this.selectedTableData.length > 0;
//           this.showTable = this.selectedTableData.length > 0;
//           this.isLoading = false;
//         },
//         error: () => {
//           this.selectedTableData = [];
//           this.hasPermission = false;
//           this.showTable = false;
//           this.isLoading = false;
//         }
//       });
//     }
//   });
// }




   GetUserByProjectsList(){
    this.ielc.GetEventsscfilterprojects(this.userName!).subscribe((userbyprojectsdata) => {
    this.projectlist=userbyprojectsdata;
    //console.log("l",userbyprojectsdata);
    });
   }

      GetFilteredISMSUserTable(): Observable<any[]> {
       if (!this.userName) return of([]);
     
       return this.ielc.Getcompliancefilterprojects(this.userName).pipe(
         switchMap(() => this.ielc.GetEventsscfilterprojects(this.userName!)),
         switchMap((userProjects: string[]) => {
           this.userProjects = userProjects;
           const requests = userProjects.map(project =>
             this.ielc.GetEventsscfilterprojects(project)
           );
           return forkJoin(requests);
         }),
         map((complianceLists: any[][]) => complianceLists.flat())
       );
     }



     

  // GetUserByProjectsLists(): void {
  // if (!this.userName) {
  //   // If no username, block access immediately
  //   this.hasPermission = false;
  //   this.showTable = false;
  //   this.isLoading = false;
  //   return;
  // }
//   this.ielc.GetUserByProjects(this.userName).subscribe({
//     next: (userbyprojectsdata) => {
//       if (!userbyprojectsdata || userbyprojectsdata.length === 0) {
//         // User has no projects, restrict access
//         this.hasPermission = false;
//         this.showTable = false;
//         this.isLoading = false;
//       } else {
//         // User has projects, proceed
//         this.projectlist = userbyprojectsdata;
//         this.hasPermission = true;
//       }
//     },
//     error: (err) => {
//       console.error("GetUserByProjects error:", err);
//       // If 404 or any error, restrict access
//       this.hasPermission = false;
//       this.showTable = false;
//       this.isLoading = false;
//     }
//   });
// }


    GetSuperOwners(userName: string | null){
    this.ielc.GetCCDisplayNames().subscribe((superowners) => {
    this.superownerss=superowners;
    //console.log("l",superowners);
    });
   }

   GetOwners(){
    this.ielc.GetToDisplayNames().subscribe((owners) => {
    this.ownerss=owners;
    });
   }
     GetAllProjectsList(){
    this.ielc.GetByProjectsevents().subscribe((Teamsdata) => {
    this.projectlist=Teamsdata;
    });
   }

   logout(): void {
  this.authService.logout();
}
}