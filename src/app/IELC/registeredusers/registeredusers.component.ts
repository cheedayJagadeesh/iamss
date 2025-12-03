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

  // Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }

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

if (!this.skillname && !this.modetype && !this.mail && (!this.fromDate || !this.toDate)) return;
const observables = [
  this.skillname?.trim() ? this.ielc.GetUsersBySkill(this.skillname.trim()) : of(null),
  this.modetype ? this.ielc.GetUsersByVenue(this.modetype) : of(null),
  this.mail ? this.ielc.GetUsersByEmail(this.mail) : of(null),
  this.fromDate && this.toDate ? this.ielc.GetUsersByDate(this.fromDate) : of(null),
  this.fromDate && this.toDate ? this.ielc.GetUsersBytoDate(this.toDate) : of(null)
];

forkJoin(observables).subscribe(
  ([skillUsers, venueUsers, emailUsers, startResults, endResults]) => {
    let filtered: UsersInfo[] = [];
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

      // console.log('📅 Filtered by Date Range (intersection):', dateFiltered);

      filtered = filtered.length
        ? filtered.filter(user =>
            dateFiltered.some((d: UsersInfo) => d.enrollmentID === user.enrollmentID)
          )
        : dateFiltered;
    }

    // Log and set filtered data
    // console.log('📦 Final Filtered Registered Users:', filtered);

    // Check if no data was found
    if (filtered.length === 0) {
      // console.log('🔍 No users found for the given filters');
    }

    this.Registeredusers = this.sortRegisteredUsers(filtered);
  },
  error => {
    // Handle HTTP errors here
    if (error.status === 404) {
      // console.log('🚫 Error: No data found for the given date range (404 Not Found)');
      this.Registeredusers = []; // Empty the table when data is not found
    } else {
      // console.error('❌ Error occurred:', error);
      this.Registeredusers = []; // Empty the table in case of other errors
    }
  }
);
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
