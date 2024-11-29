import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PmadminuserComponent } from './pmadminuser/pmadminuser.component';
import { AdminreportsComponent } from './adminreports/adminreports.component';
import { MonthlyempreportComponent } from './monthlyempreport/monthlyempreport.component';
import { ProjectreportsComponent } from './projectreports/projectreports.component';
import { ConfigurationsComponent } from './configurations/configurations.component';

const routes: Routes = [
  {path:'adminuser',component:AdminuserComponent},
  {path:'pmadminuser',component:PmadminuserComponent},
  {path:'adminreports',component:AdminreportsComponent},
  {path:'monthlyempreport',component:MonthlyempreportComponent},
  {path:'projectreports',component:ProjectreportsComponent},
  {path:'configuration',component:ConfigurationsComponent},
  {path:'dashboard',component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
