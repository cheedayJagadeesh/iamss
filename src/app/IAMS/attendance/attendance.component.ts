import { Component,inject,OnInit,ViewChild } from '@angular/core';
import { NgbDatepickerModule,NgbCalendar,NgbDateStruct,NgbDateAdapter,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,NgForm } from '@angular/forms';
import { JsonPipe, Time } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { __values } from 'tslib';
import { diffDates } from '@fullcalendar/core/internal';
import { start } from '@popperjs/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})


export class AttendanceComponent  {
// Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }
  @ViewChild('attendanceform') attendanceform!: NgForm;
  // currentDate:Date=new Date()
  selectedDate:string=''
  leave='';
  // month=''
  // year=''
  work='';
  taskslist=''
  
 constructor(){
    // this.selectedDate= new Date().toString()
    this.selectedDate= new Date().toISOString().split('T')[0]
    this.isTimeInputDisabled=true
  }
 showData(attendanceform:any)
 {
  // console.log(attendanceform)
 }
 save()
 {
  // this.isTimeInputDisabled = !!this.time1;
   if (this.time1) {
    this.isTimeInputDisabled = true;
    }
   
 }

 modaldatasave(){
  // console.log(this.attendanceform.value);
  this.attendanceform.resetForm();
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
      // console.log(this.time2)
    }else{
      this.showEaxtraHoursLabel=false;
    }
    // this.calculatetime()
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
    

    // if(this.isSecondSelectDisabled){
    //   this.leave=''
    // }
    if(this.leave==='Half Day')
      {
       this.isSecondSelectDisabled=false
      this.isTimeInputDisabled=false
    } 
    
    // else(this.leave==='Full Day' || this.leave==='OH(Optional Holiday)')
    // {
    //   this.isSecondSelectDisabled=true
    // }
  }
  onSelect2Change() {
    this.isfirstSelectDisabled = !!this.work;
    // if(this.isfirstSelectDisabled){
    //   this.work=''
    // }

    if(this.work)
    {
      this.isTimeInputDisabled=false
    }
    
  }
  // calculatetime()
  // {
  //   if(this.time1 && this.time2)
  //   {
  //    const starttime =new Date('${this.time1}');
  //    const endtime=new Date('${this.time2}') 
  //    const diff=(endtime.getTime()-starttime.getTime())/ (1000 * 60 * 60);

  //    if(diff < 4)
  //    {
  //     this.leave='Half Day'
  //    }else
  //    {
  //     this.leave='Full Day'
  //    }
  //   }
  // }

}