import { EventSchedulerUserModel } from './../event-scheduler-user.model';
import { AuthService } from './../../authservice.service';
import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

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

 constructor(private ielc:IelcapiService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.GetEventscheduleData();
    this.GetEventscheduleTime();
    this.loadAllTimes();
  }

 GetEventscheduleData(){
  this.ielc.GetEventSchedulerUserAuditeesDept().subscribe((data) => {
    this.AuditeesDept=data;
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
}