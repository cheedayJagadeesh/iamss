import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { UsersInfo } from '../users-info';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { forkJoin, Observable, of  } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-registeredusers',
  templateUrl: './registeredusers.component.html',
  styleUrls: ['./registeredusers.component.css']
 
})
export class RegisteredusersComponent implements OnInit {
 selectedDate:string=''
 formatdate:string=''
 skillname:string=''
 modetype:string='';
 mail:string=''
 isLoading = true;

 //Registeredusers:any
 clear(){
    this.skillname = '';
    this.modetype = '';
    this.selectedDate = '';
    this.mail = '';
    this.fromDate = '';
    this.toDate = '';
    // this.Registeredusers;
   this.GetAllUSers()
 }


 
  Enrolledskills: any[]=[];
  Registeredusers: any[] = []; 
  page: number = 1;  
  itemsPerPage: number = 10; 

  fromDate: string = '';
  toDate: string = '';

  constructor(private ielc:IelcapiService, private datePipe: DatePipe,private cdr: ChangeDetectorRef) {
    for (let i = 1; i <= 100; i++) {
      // this.Registeredusers.push({ id: i, name: `item ${i}` });
      this.Registeredusers.push({ id: i });
    }
    this.GetAllUSers();
  }

 ngOnInit() {
  this.GetAllUSers();
  this.GetAllSkillsData();
 }

 GetAllSkillsData(){
  this.ielc.GetEnrolledSessions().subscribe((data) => {
    this.Enrolledskills=data;
  });
 }

 sortRegisteredUsers(data: any[]): any[] {
  return data.sort((a, b) => (a.enrollmentID > b.enrollmentID ? -1 : a.enrollmentID < b.enrollmentID ? 1 : 0));
}

 GetAllUSers(){
  this.ielc.GetUsers().subscribe((data) => {
    this.Registeredusers=data;
    this.Registeredusers = this.sortRegisteredUsers(data);
    this.isLoading = false;
  });
 }


 searchSkills() {
  this.page = 1; 
//   if (this.skillname.trim()) {
//     this.ielc.GetUsersBySkill(this.skillname).subscribe((data) => {
//       this.Registeredusers = data;
//       this.Registeredusers = this.sortRegisteredUsers(data);
//     });
//   }
//   if (this.selectedDate) {
//     this.ielc.GetUsersByDate(this.selectedDate).subscribe((data) => {
//       this.Registeredusers = data;
//       this.Registeredusers = this.sortRegisteredUsers(data);
//     });
//   }
//  if (this.modetype) {
//     this.ielc.GetUsersByVenue(this.modetype).subscribe((data)=>{
//       this.Registeredusers = data;
//       this.Registeredusers = this.sortRegisteredUsers(data);
//     });
//   }
//  if (this.mail) {
//     this.ielc.GetUsersByEmail(this.mail).subscribe((data) => {
//       this.Registeredusers = data;
//       this.Registeredusers = this.sortRegisteredUsers(data);
//     });
//   }
  
//  if(this.skillname && this.modetype) {
//   forkJoin([
//     this.ielc.GetUsersBySkill(this.skillname),
//     this.ielc.GetUsersByVenue(this.modetype)
//   ]).subscribe({
//     next: ([skillUsers, venueUsers]) => {
//       this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
//         (venueUsers as UsersInfo[]).some((venueUser: UsersInfo) => venueUser.enrollmentID === skillUser.enrollmentID)
//       );
//       this.cdr.detectChanges();
//       // console.log("Filtered Users:", this.Registeredusers);
//     },
    
//     error: (err) => {
//       // console.error("Error fetching data:", err);
//     }
//   });
//  }

//   if (this.skillname && this.mail) {
//     forkJoin([
//       this.ielc.GetUsersBySkill(this.skillname),
//       this.ielc.GetUsersByEmail(this.mail)
//     ]).subscribe({
//       next: ([skillUsers, optedtimes]) => {
//         this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
//           (optedtimes as UsersInfo[]).some((optedtime: UsersInfo) => optedtime.enrollmentID === skillUser.enrollmentID)
//         );
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
      
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
    
//     });
//   }

//   if (this.skillname && this.selectedDate) {
//     forkJoin([
//       this.ielc.GetUsersBySkill(this.skillname),
//       this.ielc.GetUsersByDate(this.selectedDate),
//     ]).subscribe({
//       next: ([skillUsers, opteddates]) => {
//         this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
//           (opteddates as UsersInfo[]).some((opteddate: UsersInfo) => opteddate.enrollmentID === skillUser.enrollmentID)
//         );
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
      
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
    
//     });
//   }

//  if(this.selectedDate && this.modetype) {
//   forkJoin([
//     this.ielc.GetUsersBySkill(this.selectedDate),
//     this.ielc.GetUsersByVenue(this.modetype)
//   ]).subscribe({
//     next: ([opteddates, venueUsers]) => {
//       this.Registeredusers = (opteddates as UsersInfo[]).filter((opteddate: UsersInfo) =>
//         (venueUsers as UsersInfo[]).some((venueUser: UsersInfo) => venueUser.enrollmentID === opteddate.enrollmentID)
//       );
//       // console.log("Filtered Users:", this.Registeredusers);
//     },
    
//     error: (err) => {
//       // console.error("Error fetching data:", err);
//     }
//   });
//  }

//   if (this.modetype && this.mail) {
//     forkJoin([
//       this.ielc.GetUsersByVenue(this.modetype),
//       this.ielc.GetUsersByEmail(this.mail)
//     ]).subscribe({
//       next: ([venueUsers, optedtimes]) => {
//         this.Registeredusers = (venueUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
//           (optedtimes as UsersInfo[]).some((optedtime: UsersInfo) => optedtime.enrollmentID === skillUser.enrollmentID)
//         );
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
      
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
    
//     });
//   }

//   if (this.mail && this.selectedDate) {
//     forkJoin([
//       this.ielc.GetUsersByEmail(this.mail),
//       this.ielc.GetUsersByDate(this.selectedDate),
//     ]).subscribe({
//       next: ([optedtimes, opteddates]) => {
//         this.Registeredusers = (optedtimes as UsersInfo[]).filter((skillUser: UsersInfo) =>
//           (opteddates as UsersInfo[]).some((opteddate: UsersInfo) => opteddate.enrollmentID === skillUser.enrollmentID)
//         );
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
      
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
    
//     });
//   }

//   if(this.skillname && this.modetype && this.mail) {
//     forkJoin([
//       this.ielc.GetUsersBySkill(this.skillname),
//       this.ielc.GetUsersByVenue(this.modetype)
//     ]).subscribe({
//       next: ([skillUsers, venueUsers]) => {
//         this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
//           (venueUsers as UsersInfo[]).some((venueUser: UsersInfo) => venueUser.enrollmentID === skillUser.enrollmentID)
//         && skillUser.time === this.mail
//         );
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
      
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
//     });
//   }

//   if(this.skillname && this.modetype && this.selectedDate) {
//     forkJoin([
//       this.ielc.GetUsersBySkill(this.skillname),
//       this.ielc.GetUsersByVenue(this.modetype)
//     ]).subscribe({
//       next: ([skillUsers, venueUsers]) => {
//         this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
//           (venueUsers as UsersInfo[]).some((venueUser: UsersInfo) => venueUser.enrollmentID === skillUser.enrollmentID)
//         && new Date(skillUser.date).getTime() === new Date(this.selectedDate).getTime() 
//         );
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
      
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
//     });
//   }

//   if(this.mail && this.modetype && this.selectedDate) {
//     forkJoin([
//       this.ielc.GetUsersByEmail(this.mail),
//       this.ielc.GetUsersByVenue(this.modetype)
//     ]).subscribe({
//       next: ([optedtimes, venueUsers]) => {
//         this.Registeredusers = (optedtimes as UsersInfo[]).filter((optedtime: UsersInfo) =>
//           (venueUsers as UsersInfo[]).some((venueUser: UsersInfo) => venueUser.enrollmentID === optedtime.enrollmentID)
//         && new Date(optedtime.date).getTime() === new Date(this.selectedDate).getTime() 
//         );
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
      
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
//     });
//   }

//   if (this.modetype && this.mail && this.skillname && this.selectedDate) {
//     forkJoin([
//       this.ielc.GetUsersByVenue(this.modetype),
//       this.ielc.GetUsersByEmail(this.mail),
//       this.ielc.GetUsersBySkill(this.skillname),
//       this.ielc.GetUsersByDate(this.selectedDate)
//     ]).subscribe({
//       next: ([venueUsers, optedtimes, skillUsers, dateUsers]) => {
//         this.Registeredusers = (venueUsers as UsersInfo[]).filter((user: UsersInfo) =>
//           (optedtimes as UsersInfo[]).some((optedtime: UsersInfo) => optedtime.enrollmentID === user.enrollmentID) &&
//           (skillUsers as UsersInfo[]).some((skillUser: UsersInfo) => skillUser.enrollmentID === user.enrollmentID) &&
//           (dateUsers as UsersInfo[]).some((dateUser: UsersInfo) => dateUser.enrollmentID === user.enrollmentID)
//         );
  
//         // console.log("Filtered Users:", this.Registeredusers);
//       },
  
//       error: (err) => {
//         // console.error("Error fetching data:", err);
//       }
//     });
//   }
  
// if (!this.skillname && !this.modetype && !this.mail) {
//   return;
// }

// const observables = [
//   this.skillname.trim() ? this.ielc.GetUsersBySkill(this.skillname) : of(null),
//   this.modetype ? this.ielc.GetUsersByVenue(this.modetype) : of(null),
//   this.mail ? this.ielc.GetUsersByEmail(this.mail) : of(null)
// ];

// forkJoin(observables).subscribe(([skillUsers, venueUsers, emailUsers]) => {
//   let filtered: UsersInfo[] | null = null;

//   if (skillUsers) {
//     filtered = skillUsers;
//   }
//   if (venueUsers) {
//     filtered = filtered
//       ? filtered.filter((user: UsersInfo) =>
//           venueUsers.some((v: UsersInfo) => v.enrollmentID === user.enrollmentID)
//         )
//       : venueUsers;
//   }
//   if (emailUsers) {
//     filtered = filtered
//       ? filtered.filter((user: UsersInfo) =>
//           emailUsers.some((e: UsersInfo) => e.enrollmentID === user.enrollmentID)
//         )
//       : emailUsers;
//   }
//   if (!this.fromDate || !this.toDate) return;

// this.ielc.GetUsersByDate(this.fromDate).subscribe(startResults => {
//   this.ielc.GetUsersBytoDate(this.toDate).subscribe(endResults => {
//     // Combine both filtered results
//     const combinedResults = startResults.filter((startItem: any) =>
//       endResults.some((endItem: any) => endItem.email === startItem.email)
//     );

//     this.Registeredusers = combinedResults; // You can now show this in UI
//   });
// });


//   this.Registeredusers = this.sortRegisteredUsers(filtered ?? []);
// });


  // Return early if all filters are empty
  // if (!this.skillname && !this.modetype && !this.mail && (!this.fromDate || !this.toDate)) return;

  // const observables = [
  //   this.skillname?.trim() ? this.ielc.GetUsersBySkill(this.skillname.trim()) : of(null),
  //   this.modetype ? this.ielc.GetUsersByVenue(this.modetype) : of(null),
  //   this.mail ? this.ielc.GetUsersByEmail(this.mail) : of(null),
  //   this.fromDate && this.toDate ? this.ielc.GetUsersByDate(this.fromDate) : of(null),
  //   this.fromDate && this.toDate ? this.ielc.GetUsersBytoDate(this.toDate) : of(null)
  // ];

  // forkJoin(observables).subscribe(([skillUsers, venueUsers, emailUsers, startResults, endResults]) => {
  //   let filtered: UsersInfo[] = [];

  //   // Merge initial non-null result
  //   [skillUsers, venueUsers, emailUsers].forEach(source => {
  //     if (source) {
  //       filtered = filtered.length
  //         ? filtered.filter(user =>
  //             source.some((s: UsersInfo) => s.enrollmentID === user.enrollmentID)
  //           )
  //         : source;
  //     }
  //   });

  //   // Apply date range filter if both start and end results exist
  //   if (startResults && endResults) {
  //     const dateFiltered = startResults.filter((startItem: UsersInfo) =>
  //       endResults.some((endItem: UsersInfo) => endItem.enrollmentID === startItem.enrollmentID)
  //     );

  //     filtered = filtered.length
  //       ? filtered.filter(user =>
  //           dateFiltered.some((d: UsersInfo) => d.enrollmentID === user.enrollmentID)
  //         )
  //       : dateFiltered;
  //   }

  //   this.Registeredusers = this.sortRegisteredUsers(filtered);
  // });

  if (!this.skillname && !this.modetype && !this.mail && (!this.fromDate || !this.toDate)) return;

  console.log('🔎 Filters - Skill:', this.skillname, ' | Venue:', this.modetype, ' | Email:', this.mail);
  console.log('📅 Date range - From:', this.fromDate, ' To:', this.toDate);
  
  const observables = [
    this.skillname?.trim() ? this.ielc.GetUsersBySkill(this.skillname.trim()) : of(null),
    this.modetype ? this.ielc.GetUsersByVenue(this.modetype) : of(null),
    this.mail ? this.ielc.GetUsersByEmail(this.mail) : of(null),
    this.fromDate && this.toDate ? this.ielc.GetUsersByDate(this.fromDate) : of(null),
    this.fromDate && this.toDate ? this.ielc.GetUsersBytoDate(this.toDate) : of(null)
  ];
  
  forkJoin(observables).subscribe(([skillUsers, venueUsers, emailUsers, startResults, endResults]) => {
    console.log('✅ Skill Filter Results:', skillUsers);
    console.log('✅ Venue Filter Results:', venueUsers);
    console.log('✅ Email Filter Results:', emailUsers);
    console.log('📤 Start Date Filter Results:', startResults);
    console.log('📤 End Date Filter Results:', endResults);
  
    let filtered: UsersInfo[] = [];
  
    // Merge initial non-null result
    [skillUsers, venueUsers, emailUsers].forEach(source => {
      if (source) {
        filtered = filtered.length
          ? filtered.filter(user =>
              source.some((s: UsersInfo) => s.enrollmentID === user.enrollmentID)
            )
          : source;
      }
    });
  
    // Apply date range filter if both start and end results exist
    if (startResults && endResults) {
      const dateFiltered = startResults.filter((startItem: UsersInfo) =>
        endResults.some((endItem: UsersInfo) => endItem.enrollmentID === startItem.enrollmentID)
      );
  
      console.log('📅 Filtered by Date Range (intersection):', dateFiltered);
  
      filtered = filtered.length
        ? filtered.filter(user =>
            dateFiltered.some((d: UsersInfo) => d.enrollmentID === user.enrollmentID)
          )
        : dateFiltered;
    }
  
    console.log('📦 Final Filtered Registered Users:', filtered);
    this.Registeredusers = this.sortRegisteredUsers(filtered);
  });
  



 }


// deleteItem(id: number) {
//   if (confirm('Are you sure you want to delete this record?')) {
//     this.ielc.DeleteDataById(id).subscribe({
//       next: () => {
//         alert(`Record with ID ${id} deleted successfully!`);
//         this.GetAllUSers(); // Call this only after successful deletion
//       },
//       // error: (err) => console.error('Error deleting item:', err)
//     });
//   }
// }






}
