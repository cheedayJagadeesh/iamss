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
    this.GetAllUSers();
  }

 ngOnInit() {
  this.GetAllUSers();
 }

 sortRegisteredUsers(data: any[]): any[] {
  return data.sort((a, b) => (a.enrollmentID > b.enrollmentID ? -1 : a.enrollmentID < b.enrollmentID ? 1 : 0));
}

 GetAllUSers(){
  this.ielc.GetUsers().subscribe((data) => {
    this.Registeredusers=data;
    this.Registeredusers = this.sortRegisteredUsers(data);
  });
 }


 searchSkills() {
  
  if (this.skillname.trim()) {
    this.ielc.GetUsersBySkill(this.skillname).subscribe((data) => {
      this.Registeredusers = data;
      this.Registeredusers = this.sortRegisteredUsers(data);
    });
  }
  if (this.selectedDate) {
    this.ielc.getEnrollmentData(this.selectedDate).subscribe((data) => {
      this.Registeredusers = data;
      this.Registeredusers = this.sortRegisteredUsers(data);
    });
  }
 if (this.modetype) {
    this.ielc.GetUsersByVenue(this.modetype).subscribe((data)=>{
      this.Registeredusers = data;
      this.Registeredusers = this.sortRegisteredUsers(data);
    });
  }
 if (this.time) {
    this.ielc.GetUsersByTime(this.time).subscribe((data) => {
      this.Registeredusers = data;
      this.Registeredusers = this.sortRegisteredUsers(data);
    });
  }
  
 if(this.skillname && this.modetype) {
  forkJoin([
    this.ielc.GetUsersBySkill(this.skillname),
    this.ielc.GetUsersByVenue(this.modetype)
  ]).subscribe({
    next: ([skillUsers, venueUsers]) => {
      this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
        (venueUsers as UsersInfo[]).some((venueUser: UsersInfo) => venueUser.enrollmentID === skillUser.enrollmentID)
      );
      console.log("Filtered Users:", this.Registeredusers);
    },
    
    error: (err) => {
      console.error("Error fetching data:", err);
    }
  });
 }

  if (this.skillname && this.time) {
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.GetUsersByTime(this.time)
    ]).subscribe({
      next: ([skillUsers, optedtime]) => {
        this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
          (optedtime as UsersInfo[]).some((optedtime: UsersInfo) => optedtime.enrollmentID === skillUser.enrollmentID)
        );
        console.log("Filtered Users:", this.Registeredusers);
      },
      
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    
    });
  }

  if (this.skillname && this.selectedDate) {
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.getEnrollmentData(this.selectedDate),
    ]).subscribe({
      next: ([skillUsers, opteddate]) => {
        this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
          (opteddate as UsersInfo[]).some((opteddate: UsersInfo) => opteddate.enrollmentID === skillUser.enrollmentID)
        );
        console.log("Filtered Users:", this.Registeredusers);
      },
      
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    
    });
  }

  if(this.skillname && this.modetype && this.time) {
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.GetUsersByVenue(this.modetype)
    ]).subscribe({
      next: ([skillUsers, venueUsers]) => {
        this.Registeredusers = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
          (venueUsers as UsersInfo[]).some((venueUser: UsersInfo) => venueUser.enrollmentID === skillUser.enrollmentID)
        && skillUser.time === this.time
        );
        console.log("Filtered Users:", this.Registeredusers);
      },
      
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
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
