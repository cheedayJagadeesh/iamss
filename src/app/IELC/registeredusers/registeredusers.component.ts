import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { UsersInfo } from '../users-info';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';


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
 time:string=''

 //Registeredusers:any
 clear(){
    this.skillname = '';
    this.modetype = '';
    this.selectedDate = '';
    this.time = '';
    // this.Registeredusers;
   this.GetAllUSers()
 }

  Registeredusers: any[] = []; 
  page: number = 1;  
  itemsPerPage: number = 10; 

  constructor(private ielc:IelcapiService, private datePipe: DatePipe) {
    for (let i = 1; i <= 100; i++) {
      this.Registeredusers.push({ id: i, name: `Item ${i}` });
    }
    
  }


 ngOnInit() {
  // this.ielc.GetUsers().subscribe((data) => {
  //   this.Registeredusers=data;
  //   this.Registeredusers = data.sort((a, b) => {
  //     if (a.enrollmentID > b.enrollmentID) {
  //       return -1; // a comes before b
  //     }
  //     if (a.enrollmentID < b.enrollmentID)  {
  //       return 1; // b comes before a
  //     }
  //     return 0; // a and b are equal
  //   });

  // });

  this.GetAllUSers();
 }

 GetAllUSers(){
  this.ielc.GetUsers().subscribe((data) => {
    this.Registeredusers=data;
    this.Registeredusers = data.sort((a, b) => {
      if (a.enrollmentID > b.enrollmentID) {
        return -1; // a comes before b
      }
      if (a.enrollmentID < b.enrollmentID)  {
        return 1; // b comes before a
      }
      return 0; // a and b are equal
    });

  });
 }
//  filteredData: any[] = []; 
  noResults: boolean = false; 

 searchSkills() {
  
  if (this.skillname.trim()) {
    this.ielc.GetUsersBySkill(this.skillname).subscribe((data) => {
      this.Registeredusers = data;
    });
  }
  if (this.selectedDate) {
    this.ielc.getEnrollmentData(this.selectedDate).subscribe((data) => {
      this.Registeredusers = data;
    });
  }
 
  if (this.modetype) {
    this.ielc.GetUsersByVenue(this.modetype).subscribe({
      next: (data) => (this.Registeredusers = data),
      error: (err) => console.error('Error fetching mode selection:', err),
    });
  }
  if (this.time) {
    this.ielc.GetUsersByTime(this.time).subscribe((data) => {
      this.Registeredusers = data;
    });
  }
  

  if (this.skillname.trim() && this.modetype) {
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.GetUsersByVenue(this.modetype)
    ]).subscribe({
      next: ([skillUsers, venueUsers]) => {
        this.Registeredusers = [...skillUsers, ...venueUsers]; // Just merge both lists
      }
      
      // next: ([skillUsers, venueUsers]) => {
      //   // Merge the results while avoiding duplicates
      //   const mergedUsers = [...skillUsers, ...venueUsers];
  
      //   // Optionally, remove duplicate users if they appear in both lists
      //   this.Registeredusers = mergedUsers.filter(
      //     (user, index, self) => index === self.findIndex((u) => u.id === user.id)
      //   );
      // },
      // error: (err) => console.error('Error fetching users:', err),
    });
  }

  if (this.skillname.trim() && this.time) {
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.GetUsersByTime(this.time)
    ]).subscribe({
      next: ([skillUsers, optedtime]) => {
        this.Registeredusers = [...skillUsers, ...optedtime]; // Just merge both lists
      },
      error: (err) => console.error('Error fetching users:', err),
      
      // next: ([skillUsers, venueUsers]) => {
      //   // Merge the results while avoiding duplicates
      //   const mergedUsers = [...skillUsers, ...venueUsers];
  
      //   // Optionally, remove duplicate users if they appear in both lists
      //   this.Registeredusers = mergedUsers.filter(
      //     (user, index, self) => index === self.findIndex((u) => u.id === user.id)
      //   );
      // },
      // error: (err) => console.error('Error fetching users:', err),
    });
  }


 }



applyFilters() {
  if (this.skillname.trim() && this.modetype) {
    // Both filters are applied, call both APIs in parallel
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.GetUsersByVenue(this.modetype)
    ]).subscribe({
      next: ([skillUsers, venueUsers]) => {
        this.Registeredusers = [...skillUsers, ...venueUsers].filter(
          (user, index, self) => index === self.findIndex((u) => u.id === user.id)
        ); // Remove duplicates if needed
      },
      error: (err) => console.error('Error fetching users:', err),
    });
    this.GetAllUSers();
  } else if (this.skillname.trim()) {
    // Filter by skill only
    this.ielc.GetUsersBySkill(this.skillname).subscribe({
      next: (data) => (this.Registeredusers = data),
      error: (err) => console.error('Error fetching users by skill:', err),
    });
    this.GetAllUSers();
  } else if (this.modetype) {
    // Filter by venue only
    this.ielc.GetUsersByVenue(this.modetype).subscribe({
      next: (data) => (this.Registeredusers = data),
      error: (err) => console.error('Error fetching users by venue:', err),
    });
    this.GetAllUSers();
  } else {
    // No filters applied, fetch all users
    this.ielc.GetUsers().subscribe({
      next: (data) => (this.Registeredusers = data),
      error: (err) => console.error('Error fetching all users:', err),
    });
    this.GetAllUSers();
  }
}

deleteItem(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteDataById(id).subscribe({
      next: () => alert(`Record with  EnrollmentID ${id} deleted successfully!`),
      error: (err) => console.error('Error deleting item:', err)
    });
  }
  this.GetAllUSers();
}





}
