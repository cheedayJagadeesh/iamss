import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { PmadminuserComponent } from './pmadminuser/pmadminuser.component';
import { AdminreportsComponent } from './adminreports/adminreports.component';
import { MonthlyempreportComponent } from './monthlyempreport/monthlyempreport.component';
import { ProjectreportsComponent } from './projectreports/projectreports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AttendanceComponent,
    AdminuserComponent,
    PmadminuserComponent,
    AdminreportsComponent,
    MonthlyempreportComponent,
    ProjectreportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbDatepickerModule,FormsModule,MatDatepickerModule,MatNativeDateModule,MatCardModule,FullCalendarModule,MatInputModule,
    MatFormFieldModule,MatButtonModule,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
