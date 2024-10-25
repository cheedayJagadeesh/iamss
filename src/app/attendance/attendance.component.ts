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


export class AttendanceComponent  {

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
  }
 showData(item:any){
  if (this.time1) {
  this.isTimeInputDisabled = false;
  }
 console.log(item)
 }

// ngOnInit(): void {
//   this.checkiftimepassed()
// }
 isTimeInputDisabled:boolean=true
 time1=''
 firsttimeentered:Date |null=null
  
// checkingtime(){
//  const currenttime = new Date().getHours();
//  if(currenttime >= 13)
//  {
//  this.isTimeInputDisabled=false
//  }
// }

 onFirsttimechange()
 {
this.isTimeInputDisabled=!!this.time1
  // if(this.time1)
  // {  
  //   const timeparts =this.time1.split(':')
  //   const currentDate = new Date()
  //   this.firsttimeentered= new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),+timeparts[0],+timeparts[1])
  //  this.isTimeInputDisabled=true
  //    this.checkiftimepassed();
  // }
 }

//  checkiftimepassed()
//  {
//   const interval=setInterval(()=>{
//     if (this.firsttimeentered) {
//       const currentTime = new Date();

//       const timeDifference = (currentTime.getTime() - this.firsttimeentered.getTime()) / (1000 * 60 * 60); // Convert to hours

      
//       if (timeDifference >= 4) {
//         this.isTimeInputDisabled = false;
//         clearInterval(interval); 
//       }
//     }
//  },2000);

// }
// enableSecondInputAfterfewHours() {
//   if (this.firsttimeentered) {
//     const HoursInMs = 1 * 60 * 60 * 1000; 

//     setTimeout(() => {
//       this.isTimeInputDisabled = false;
//     }, HoursInMs);
//   }
// }

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
    

    // if(this.isSecondSelectDisabled){
    //   this.leave=''
    // }
    if(this.leave==='Half Day')
      {
      
      this.isSecondSelectDisabled=false
      
        
    } 
    if(this.work)
      {
      this.isTimeInputDisabled = true;
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













