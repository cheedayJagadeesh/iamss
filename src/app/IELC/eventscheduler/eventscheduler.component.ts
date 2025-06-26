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
Time: any[]=[];
 selectedAuditee = '';
 hasPermission: boolean = true;
 selectedStatus: string = '';
selectedDept =  '';
selectedTime =  '';
selectedDate = '';

 constructor(private ielc:IelcapiService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.GetEventscheduleData();
    this.GetEventscheduleTime();
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

}