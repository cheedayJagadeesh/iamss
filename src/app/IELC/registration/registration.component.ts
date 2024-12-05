import { Component,ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { __values } from 'tslib';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  @ViewChild('registration') registration!: NgForm;
 // currentDate:Date=new Date()
 selectedDate:string=''
 leave='';
 // month=''
 // year=''
 work='';
 taskslist=''
 email='incidents@inteqsolutions.com'
constructor(){
   // this.selectedDate= new Date().toString()
   this.selectedDate= new Date().toISOString().split('T')[0]
   this.isTimeInputDisabled=true
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
