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
import { SkillqaComponent } from './IELC/skillqa/skillqa.component';
import { ExaminfoComponent } from './IELC/examinfo/examinfo.component';
import { ResultinfoComponent } from './IELC/resultinfo/resultinfo.component';
import { IsmstaskComponent } from './IELC/ismstask/ismstask.component';
import { IsmshistoryComponent } from './IELC/ismshistory/ismshistory.component';
import { IsmsmailsComponent } from './IELC/ismsmails/ismsmails.component';
import { QmstaskComponent } from './IELC/qmstask/qmstask.component';
import { QmshistoryComponent } from './IELC/qmshistory/qmshistory.component';
import { QmsmailsComponent } from './IELC/qmsmails/qmsmails.component';
import { Soc2taskComponent } from './IELC/soc2task/soc2task.component';
import { Soc2historyComponent } from './IELC/soc2history/soc2history.component';
import { Soc2mailsComponent } from './IELC/soc2mails/soc2mails.component';
import { ComplianceformComponent } from './IELC/complianceform/complianceform.component';
import { AdminusersComponent } from './IELC/adminusers/adminusers.component';
import { IthelpsprtComponent } from './IELC/ithelpsprt/ithelpsprt.component';
import { AdminsprtComponent } from './IELC/adminsprt/adminsprt.component';
import { HrsprtComponent } from './IELC/hrsprt/hrsprt.component';
import { EmercntctlstComponent } from './IELC/emercntctlst/emercntctlst.component';
import { VarcmtsComponent } from './IELC/varcmts/varcmts.component';
import { PrjsprtComponent } from './IELC/prjsprt/prjsprt.component';
import { Iso27001Component } from './IELC/iso27001/iso27001.component';
import { Iso9001Component } from './IELC/iso9001/iso9001.component';

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
  {path:'addskill',component:AddnewskillComponent},
  {path:'skillqa',component:SkillqaComponent},
  {path:'examinfo',component:ExaminfoComponent},
  {path:'resultinfo',component:ResultinfoComponent},
  {path:'ismstask',component:IsmstaskComponent},
  {path:'ismshistory',component:IsmshistoryComponent},
  {path:'ismsmails',component:IsmsmailsComponent},
  {path:'qmstask',component:QmstaskComponent},
  {path:'qmshistory',component:QmshistoryComponent},
  {path:'qmsmails',component:QmsmailsComponent},
  {path:'soc2task',component:Soc2taskComponent},
  {path:'soc2history',component:Soc2historyComponent},
  {path:'soc2mails',component:Soc2mailsComponent},
  {path:'complianceform',component:ComplianceformComponent},
  {path:'adminusers',component:AdminusersComponent},
  {path:'ithelpsprt',component:IthelpsprtComponent},
  {path:'adminsprt',component:AdminsprtComponent},
  {path:'hrsprt',component:HrsprtComponent},
  {path:'emercntctlst',component:EmercntctlstComponent},
  {path:'varcmts',component:VarcmtsComponent},
  {path:'prjsprt',component:PrjsprtComponent},
  {path:'iso27001',component:Iso27001Component},
  {path:'iso9001',component:Iso9001Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
