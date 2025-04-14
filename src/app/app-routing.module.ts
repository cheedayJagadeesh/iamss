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
import { HippaComponent } from './IELC/hippa/hippa.component';
import { GdprComponent } from './IELC/gdpr/gdpr.component';
import { SocComponent } from './IELC/soc/soc.component';
import { DpdpComponent } from './IELC/dpdp/dpdp.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './IAMS/login/login.component';
import { FeedbackComponent } from './IELC/feedback/feedback.component';
import { ExampageComponent } from './IELC/exampage/exampage.component';
import { AdmindeptComponent } from './IELC/admindept/admindept.component';
import { HrdeptComponent } from './IELC/hrdept/hrdept.component';
import { ItdeptComponent } from './IELC/itdept/itdept.component';
import { authGuard } from './auth.guard';
import { AuthcallbackComponent } from './IELC/authcallback/authcallback.component';


const routes: Routes = [
  {path:'adminuser',component:AdminuserComponent,canActivate: [MsalGuard, authGuard]},
  {path:'pmadminuser',component:PmadminuserComponent,canActivate: [MsalGuard, authGuard]},
  {path:'adminreports',component:AdminreportsComponent,canActivate: [MsalGuard, authGuard]},
  {path:'monthlyempreport',component:MonthlyempreportComponent,canActivate: [MsalGuard, authGuard]},
  {path:'projectreports',component:ProjectreportsComponent,canActivate: [MsalGuard, authGuard]},
  {path:'configuration',component:ConfigurationsComponent,canActivate: [MsalGuard, authGuard]},
  {path:'attendance',component:AttendanceComponent,canActivate: [MsalGuard, authGuard]},
  {path:'registered',component:RegisteredusersComponent,canActivate: [MsalGuard, authGuard]},
  // {path:'home',component:HomeComponent,canActivate:[MsalGuard]},
  // {path:'',redirectTo:'login', pathMatch:'full'},
  // {path:'login',component:LoginComponent},
  // {path: '**', redirectTo: '/login'},

  { path: 'home', component: HomeComponent, canActivate: [MsalGuard, authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' },


  {path:'registration',component:RegistrationComponent, canActivate: [MsalGuard, authGuard]},
  {path:'addskill',component:AddnewskillComponent,canActivate: [MsalGuard, authGuard]},
  {path:'skillqa',component:SkillqaComponent,canActivate: [MsalGuard, authGuard]},
  {path:'examinfo',component:ExaminfoComponent,canActivate: [MsalGuard, authGuard]},
  {path:'resultinfo',component:ResultinfoComponent,canActivate: [MsalGuard, authGuard]},
  {path:'ismstask',component:IsmstaskComponent,canActivate: [MsalGuard, authGuard]},
  {path:'ismshistory',component:IsmshistoryComponent,canActivate: [MsalGuard, authGuard]},
  {path:'ismsmails',component:IsmsmailsComponent,canActivate: [MsalGuard, authGuard]},
  {path:'qmstask',component:QmstaskComponent,canActivate: [MsalGuard, authGuard]},
  {path:'qmshistory',component:QmshistoryComponent,canActivate: [MsalGuard, authGuard]},
  {path:'qmsmails',component:QmsmailsComponent,canActivate: [MsalGuard, authGuard]},
  {path:'soc2task',component:Soc2taskComponent,canActivate: [MsalGuard, authGuard]},
  {path:'soc2history',component:Soc2historyComponent,canActivate: [MsalGuard, authGuard]},
  {path:'soc2mails',component:Soc2mailsComponent,canActivate: [MsalGuard, authGuard]},
  {path:'complianceform',component:ComplianceformComponent,canActivate: [MsalGuard, authGuard]},
  {path:'adminusers',component:AdminusersComponent,canActivate: [MsalGuard, authGuard]},
  {path:'ithelpsprt',component:IthelpsprtComponent,canActivate: [MsalGuard, authGuard]},
  {path:'adminsprt',component:AdminsprtComponent,canActivate: [MsalGuard, authGuard]},
  {path:'hrsprt',component:HrsprtComponent,canActivate: [MsalGuard, authGuard]},
  {path:'emercntctlst',component:EmercntctlstComponent,canActivate: [MsalGuard, authGuard]},
  {path:'varcmts',component:VarcmtsComponent,canActivate: [MsalGuard, authGuard]},
  {path:'prjsprt',component:PrjsprtComponent,canActivate: [MsalGuard, authGuard]},
  {path:'iso27001',component:Iso27001Component,canActivate: [MsalGuard, authGuard]},
  {path:'iso9001',component:Iso9001Component,canActivate: [MsalGuard, authGuard]},
  {path:'hippa',component:HippaComponent,canActivate: [MsalGuard, authGuard]},
  {path:'gdpr',component:GdprComponent,canActivate: [MsalGuard, authGuard]},
  {path:'soc',component:SocComponent,canActivate: [MsalGuard, authGuard]},
  {path:'dpdp',component:DpdpComponent,canActivate: [MsalGuard, authGuard]},
  {path:'feedback',component:FeedbackComponent,canActivate: [MsalGuard, authGuard]},
  {path:'exampage',component:ExampageComponent,canActivate: [MsalGuard, authGuard]},
  {path:'admindept',component:AdmindeptComponent,canActivate: [MsalGuard, authGuard]},
  {path:'hrdept',component:HrdeptComponent,canActivate: [MsalGuard, authGuard]},
  {path:'itdept',component:ItdeptComponent,canActivate: [MsalGuard, authGuard]},
  {path:'authcallback', component:AuthcallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
