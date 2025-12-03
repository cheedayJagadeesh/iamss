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
import { EmpattendanceComponent } from './IAMS/empattendance/empattendance.component';
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
import { AuthGuard } from './auth.guard';
import { AuthcallbackComponent } from './IELC/authcallback/authcallback.component';
import { EventschedulerComponent } from './IELC/eventscheduler/eventscheduler.component';
import { ISMSMasterComponent } from './ISMS/ismsmaster/ismsmaster.component';



const routes: Routes = [
  {path:'adminuser',component:AdminuserComponent,canActivate: [MsalGuard]},
  {path:'pmadminuser',component:PmadminuserComponent,canActivate: [MsalGuard]},
  {path:'adminreports',component:AdminreportsComponent,canActivate: [MsalGuard]},
  {path:'monthlyempreport',component:MonthlyempreportComponent,canActivate: [MsalGuard]},
  {path:'projectreports',component:ProjectreportsComponent,canActivate: [MsalGuard]},
  {path:'configuration',component:ConfigurationsComponent,canActivate: [MsalGuard]},
  // {path:'attendance',component:AttendanceComponent,canActivate: [MsalGuard]},
  {path:'empattendance',component:EmpattendanceComponent,canActivate: [MsalGuard]},
  {path:'registered',component:RegisteredusersComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['registered'], roles: ['Admin', 'SuperAdmin'] }},
  // {path:'home',component:HomeComponent,canActivate:[MsalGuard]},
  // {path:'',redirectTo:'login', pathMatch:'full'},
  // {path:'login',component:LoginComponent},
  // {path: '**', redirectTo: '/login'},

  { path: 'home', component: HomeComponent, canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['home'], roles: ['Admin', 'SuperAdmin'] }},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' },


  {path:'registration',component:RegistrationComponent, canActivate: [MsalGuard]},
  {path:'addskill',component:AddnewskillComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['addskill'], roles: ['Admin', 'SuperAdmin'] }},
  {path:'skillqa',component:SkillqaComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['skillqa'], roles: ['Admin', 'SuperAdmin'] }},
  // {path:'examinfo',component:ExaminfoComponent,canActivate: [MsalGuard, AuthGuard],data: { pageNames: ['examinfo'], roles: ['Admin', 'SuperAdmin'] }},
  {path:'resultinfo',component:ResultinfoComponent,canActivate: [MsalGuard, AuthGuard],data: { pageNames: ['resultinfo'], roles: ['Admin', 'SuperAdmin'] }},
  {path:'ismstask',component:IsmstaskComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['ismstask'], roles: ['Admin', 'SuperAdmin'] }},
  {path:'ismshistory',component:IsmshistoryComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['ismshistory'], roles: ['Admin', 'SuperAdmin'] }},
  {path:'ismsmails',component:IsmsmailsComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['ismsmails'], roles: ['Admin', 'SuperAdmin'] }},
  {path:'qmstask',component:QmstaskComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['qmstask'], roles: ['Admin', 'SuperAdmin'] }},
  {path:'qmshistory',component:QmshistoryComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['qmshistory'], roles: ['Admin', 'SuperAdmin']}},
  {path:'qmsmails',component:QmsmailsComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['qmsmails'], roles: ['Admin', 'SuperAdmin']}},
  {path:'soc2task',component:Soc2taskComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['soc2task'], roles: ['Admin', 'SuperAdmin']}},
  {path:'soc2history',component:Soc2historyComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['soc2history'], roles: ['Admin', 'SuperAdmin']}},
  {path:'soc2mails',component:Soc2mailsComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['soc2mails'], roles: ['Admin', 'SuperAdmin']}},
  {path:'complianceform',component:ComplianceformComponent,canActivate: [MsalGuard],data: { pageNames: ['complianceform'], roles: ['Admin', 'SuperAdmin']}},
  {path:'adminusers',component:AdminusersComponent,canActivate: [MsalGuard,AuthGuard],data: { pageNames: ['adminusers'], roles: ['Admin', 'SuperAdmin']}},
  {path:'eventscheduler',component:EventschedulerComponent,canActivate: [MsalGuard],data: { pageNames: ['adminusers'], roles: ['Admin', 'SuperAdmin']}},
  {path:'ithelpsprt',component:IthelpsprtComponent,canActivate: [MsalGuard]},
  {path:'adminsprt',component:AdminsprtComponent,canActivate: [MsalGuard]},
  {path:'hrsprt',component:HrsprtComponent,canActivate: [MsalGuard]},
  {path:'emercntctlst',component:EmercntctlstComponent,canActivate: [MsalGuard]},
  {path:'varcmts',component:VarcmtsComponent,canActivate: [MsalGuard]},
  {path:'prjsprt',component:PrjsprtComponent,canActivate: [MsalGuard]},
  {path:'iso27001',component:Iso27001Component,canActivate: [MsalGuard]},
  {path:'iso9001',component:Iso9001Component,canActivate: [MsalGuard]},
  {path:'hippa',component:HippaComponent,canActivate: [MsalGuard]},
  {path:'gdpr',component:GdprComponent,canActivate: [MsalGuard]},
  {path:'soc',component:SocComponent,canActivate: [MsalGuard]},
  {path:'dpdp',component:DpdpComponent,canActivate: [MsalGuard]},
  {path:'feedback',component:FeedbackComponent,canActivate: [MsalGuard]},
  {path:'exampage',component:ExampageComponent,canActivate: [MsalGuard]},
  {path:'admindept',component:AdmindeptComponent,canActivate: [MsalGuard]},
  {path:'hrdept',component:HrdeptComponent,canActivate: [MsalGuard]},
  {path:'itdept',component:ItdeptComponent,canActivate: [MsalGuard]},
  {path:'authcallback', component:AuthcallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
