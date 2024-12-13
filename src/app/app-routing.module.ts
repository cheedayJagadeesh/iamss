import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminuserComponent } from './IAMS/adminuser/adminuser.component';
import { DashboardComponent } from './IAMS/dashboard/dashboard.component';
import { PmadminuserComponent } from './IAMS/pmadminuser/pmadminuser.component';
import { AdminreportsComponent } from './IAMS/adminreports/adminreports.component';
import { MonthlyempreportComponent } from './IAMS/monthlyempreport/monthlyempreport.component';
import { ProjectreportsComponent } from './IAMS/projectreports/projectreports.component';
import { ConfigurationsComponent } from './IAMS/configurations/configurations.component';
import { RegisteredusersComponent } from './IELC/registeredusers/registeredusers.component';
import { HomeComponent } from './IELC/home/home.component';
import { AttendanceComponent } from './IAMS/attendance/attendance.component';
import { RegistrationComponent } from './IELC/registration/registration.component';
import { AddnewskillComponent } from './IELC/addnewskill/addnewskill.component';

const routes: Routes = [
  {path:'adminuser',component:AdminuserComponent},
  {path:'pmadminuser',component:PmadminuserComponent},
  {path:'adminreports',component:AdminreportsComponent},
  {path:'monthlyempreport',component:MonthlyempreportComponent},
  {path:'projectreports',component:ProjectreportsComponent},
  {path:'configuration',component:ConfigurationsComponent},
  {path:'attendance',component:AttendanceComponent},
  {path:'registered',component:RegisteredusersComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'registration',component:RegistrationComponent},
  {path:'addskill',component:AddnewskillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
