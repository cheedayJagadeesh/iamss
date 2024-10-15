import { Component,inject } from '@angular/core';
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


export class AttendanceComponent {
  selectedDate:Date=new Date()
//selectedDate: string;
// constructor(){
//   this.selectedDate='';
// }
   calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
 
  inputtime:string=''
  showEaxtraHoursLabel:boolean=false
  checktime(){
    if(this.inputtime='23:59'){
      this.showEaxtraHoursLabel=true;
    }else{
      this.showEaxtraHoursLabel=false;
    }
  }

}













