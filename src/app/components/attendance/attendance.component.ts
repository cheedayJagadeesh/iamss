import { Component,inject } from '@angular/core';
import { NgbDatepickerModule,NgbCalendar,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
currentdate:Date=new Date()
today = inject(NgbCalendar).getToday();
model:any
// model: NgbDateStruct;
// date: { year: number; month: number; };
}










