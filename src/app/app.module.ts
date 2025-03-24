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
import { LoginComponent } from './IAMS/login/login.component';
import { AttendanceComponent } from './IAMS/attendance/attendance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminuserComponent } from './IAMS/adminuser/adminuser.component';
import { PmadminuserComponent } from './IAMS/pmadminuser/pmadminuser.component';
import { AdminreportsComponent } from './IAMS/adminreports/adminreports.component';
import { MonthlyempreportComponent } from './IAMS/monthlyempreport/monthlyempreport.component';
import { ProjectreportsComponent } from './IAMS/projectreports/projectreports.component';
import { ConfigurationsComponent } from './IAMS/configurations/configurations.component';
import { DashboardComponent } from './IAMS/dashboard/dashboard.component';
import { RegistrationComponent } from './IELC/registration/registration.component';
import { RegisteredusersComponent } from './IELC/registeredusers/registeredusers.component';
import { HomeComponent } from './IELC/home/home.component';
import { HeaderComponent } from './IELC/header/header.component';
import { AddnewskillComponent } from './IELC/addnewskill/addnewskill.component';
import { SkillqaComponent } from './IELC/skillqa/skillqa.component';
import { ExaminfoComponent } from './IELC/examinfo/examinfo.component';
import { ResultinfoComponent } from './IELC/resultinfo/resultinfo.component';
import { IsmstaskComponent } from './IELC/ismstask/ismstask.component';
import { IsmshistoryComponent } from './IELC/ismshistory/ismshistory.component';
import { IsmsmailsComponent } from './IELC/ismsmails/ismsmails.component';
import { QmsheaderComponent } from './IELC/qmsheader/qmsheader.component';
import { QmstaskComponent } from './IELC/qmstask/qmstask.component';
import { QmshistoryComponent } from './IELC/qmshistory/qmshistory.component';
import { QmsmailsComponent } from './IELC/qmsmails/qmsmails.component';
import { IsmsheaderComponent } from './IELC/ismsheader/ismsheader.component';
import { Soc2headerComponent } from './IELC/soc2header/soc2header.component';
import { Soc2taskComponent } from './IELC/soc2task/soc2task.component';
import { Soc2historyComponent } from './IELC/soc2history/soc2history.component';
import { Soc2mailsComponent } from './IELC/soc2mails/soc2mails.component';
import { AttendanceheaderComponent } from './IELC/attendanceheader/attendanceheader.component';
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
import { IelcapiService } from './IELC/ielcapi.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalRedirectComponent, MsalInterceptor, MsalGuardConfiguration,MsalInterceptorConfiguration, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { MsalGuard, MsalService, MsalBroadcastService  } from '@azure/msal-angular';
import { AuthService } from './authservice.service';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {  MSAL_INSTANCE } from '@azure/msal-angular';
// import { IPublicClientApplication } from '@azure/msal-browser'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { PublicClientApplication, IPublicClientApplication } from '@azure/msal-browser';
import { DatePipe } from '@angular/common';
import { ExcelExportService } from './excel-export.service';
import { FeedbackComponent } from './IELC/feedback/feedback.component';
import { ExampageComponent } from './IELC/exampage/exampage.component';
import { BrowserCacheLocation } from '@azure/msal-browser';
import {  MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { AdmindeptComponent } from './IELC/admindept/admindept.component';
import { HrdeptComponent } from './IELC/hrdept/hrdept.component';
import { ItdeptComponent } from './IELC/itdept/itdept.component';
import { SprtheaderComponent } from './IELC/sprtheader/sprtheader.component'; 
import { environment } from './IELC/environment';
// import { environment } from './IELC/environment.prod';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;



// const isIE = window.navigator.userAgent.includes('MSIE') || window.navigator.userAgent.includes('Trident');

// export function MSALInstanceFactory(): PublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: '17af1879-bbe9-4a73-8284-1f007a330453', // From Azure AD registration
//       authority: 'https://login.microsoftonline.com/d0ae250e-943b-431f-be00-cc1a2f3f59d9', // Replace with your tenant ID
//       redirectUri: 'http://localhost:4200/',
//     },
//     cache: {
//       cacheLocation: 'localStorage',
//       storeAuthStateInCookie: isIE, // For IE compatibility
//     }
//   });
// }

// function MSALConfigFactory() {
//   return {
//     auth: {
//       clientId: '{YOUR_CLIENT_ID}',
//       authority: 'https://login.microsoftonline.com/{YOUR_TENANT_ID}/',
//       validateAuthority: true,
//       redirectUri: 'http://localhost:4200',
//       postLogoutRedirectUri: 'http://localhost:4200',
//       navigateToLoginRequestUrl: true
//     },
//     cache: {
//       storeAuthStateInCookie: false,
//     }
//   };
// }
// export function MSALInstanceFactory(): PublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: '{YOUR_CLIENT_ID}',
//       authority: 'https://login.microsoftonline.com/{YOUR_TENANT_ID}/',
//       redirectUri: 'http://localhost:4200',
//       postLogoutRedirectUri: 'http://localhost:4200',
//       navigateToLoginRequestUrl: true
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//       storeAuthStateInCookie: false,
//     }
//   });
// }
// export function MSALInstanceFactory() {
//   return new PublicClientApplication({
//     auth: {
//       clientId: "17af1879-bbe9-4a73-8284-1f007a330453", // Replace with your Azure AD App's Client ID
//       authority: "https://login.microsoftonline.com/d0ae250e-943b-431f-be00-cc1a2f3f59d9", // Replace with your Tenant ID
//       redirectUri: "http://localhost:4200", // Must match your Azure AD App's Redirect URI
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//       storeAuthStateInCookie: true,
//     },
//     system: {
//       loggerOptions: {
//         loggerCallback: (level, message, containsPii) => {
//           console.log(`MSAL Logging: ${message}`);
//         },
      
//         piiLoggingEnabled: false,
//       },
//     },
//   });
// }
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
      clientId: "17af1879-bbe9-4a73-8284-1f007a330453",
      authority: "https://login.microsoftonline.com/d0ae250e-943b-431f-be00-cc1a2f3f59d9",
      // redirectUri: "http://localhost:4200",
      // postLogoutRedirectUri: 'http://localhost:4200/login'
      //   redirectUri: environment.redirectUri,
      // postLogoutRedirectUri: environment.postLogoutRedirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false
    }
    
  });
  
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}
// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect, // or 'popup'
//     authRequest: {
//       scopes: ['User.Read']
//     }
//   };
// }
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup, // Change to Popup if needed
    authRequest: {
      scopes: ['User.Read'], // Check API Permissions in Azure
    }
  };
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AttendanceComponent,
    AdminuserComponent,
    PmadminuserComponent,
    AdminreportsComponent,
    MonthlyempreportComponent,
    ProjectreportsComponent,
    ConfigurationsComponent,
    DashboardComponent,
    RegistrationComponent,
    RegisteredusersComponent,
    HomeComponent,
    HeaderComponent,
    AddnewskillComponent,
    SkillqaComponent,
    ExaminfoComponent,
    ResultinfoComponent,
    IsmstaskComponent,
    IsmshistoryComponent,
    IsmsmailsComponent,
    QmsheaderComponent,
    QmstaskComponent,
    QmshistoryComponent,
    QmsmailsComponent,
    IsmsheaderComponent,
    Soc2headerComponent,
    Soc2taskComponent,
    Soc2historyComponent,
    Soc2mailsComponent,
    AttendanceheaderComponent,
    ComplianceformComponent,
    AdminusersComponent,
    IthelpsprtComponent,
    AdminsprtComponent,
    HrsprtComponent,
    EmercntctlstComponent,
    VarcmtsComponent,
    PrjsprtComponent,
    Iso27001Component,
    Iso9001Component,
    HippaComponent,
    GdprComponent,
    SocComponent,
    DpdpComponent,
    FeedbackComponent,
    ExampageComponent,
    AdmindeptComponent,
    HrdeptComponent,
    ItdeptComponent,
    SprtheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbDatepickerModule,FormsModule,MatDatepickerModule,MatNativeDateModule,MatCardModule,FullCalendarModule,MatInputModule,
    MatFormFieldModule,MatButtonModule,MatIconModule,HttpClientModule,NgxPaginationModule
    
  ],
  providers: [IelcapiService,HttpClient,AuthService,MsalModule,MsalGuard,MsalService,DatePipe,ExcelExportService,MsalBroadcastService, 
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    // { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    // { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    // MsalGuard,
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
