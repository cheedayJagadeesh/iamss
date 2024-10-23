import { Component,inject,OnInit } from '@angular/core';
import { NgbDatepickerModule,NgbCalendar,NgbDateStruct,NgbDateAdapter,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe, Time } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { __values } from 'tslib';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})


export class AttendanceComponent implements OnInit {

  // currentDate:Date=new Date()
  selectedDate:string=''
  leave='';
  // month=''
  // year=''
  work='';
  
 constructor(){
    // this.selectedDate= new Date().toString()
    this.selectedDate= new Date().toISOString().split('T')[0]
  }
 showData(item:any){
 console.log(item)
 }

ngOnInit(): void {
  this.checkingtime()
}
 isTimeInputDisabled:boolean=true
 time1=''
 firsttimeentered:Date |null=null
  
checkingtime(){
 const currenttime = new Date().getHours();
 if(currenttime >= 13)
 {
 this.isTimeInputDisabled=false
 }


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
    name: 'WFO'
  },
  {
    name: 'WFH'
  },
  {
    name: 'WFH/WFO'
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
  }

 


}













