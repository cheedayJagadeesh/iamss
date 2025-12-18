import { ActiveUsersService } from './IELC/active-users.service';
import { IelcapiService } from 'src/app/IELC/ielcapi.service';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './authservice.service';
import { Router } from '@angular/router';
import { AuthenticationResult, InteractionRequiredAuthError  } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {

  title = 'IAMS';
  constructor(private msalService: MsalService,private authService: AuthService, private router: Router, private activeUsersService: ActiveUsersService) {}

  isLoading: boolean = true;
  currentRoute: string = '';
  // track left-menu collapsed state
  isSidebarClosed: boolean = false;

  // handler for leftmenu toggle events
  onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }

  async ngOnInit() {

    const userName = localStorage.getItem("email") || "Guest";
  this.activeUsersService.startConnection(userName);

    this.isLoading = true;
      //  this.authService.startInactivityTimer();
    this.router.events.subscribe(() => {
      // this.authService.startInactivityTimer();
    });
    try {
      // Step 1: Handle MSAL redirect (if using redirect login)
      await this.msalService.instance.initialize();
      const redirectResult = await this.msalService.instance.handleRedirectPromise();
  
      if (redirectResult !== null && redirectResult.account) {
        // console.log('Redirect login successful. Setting active account.');
        this.msalService.instance.setActiveAccount(redirectResult.account);
      }
  
      // Step 2: Set current route watcher
      this.router.events.subscribe(() => {
        this.currentRoute = this.router.url;
      });
  
      // Step 3: Check if the user is authenticated
      if (this.authService.isAuthenticated()) {
        // console.log('User is authenticated');
        this.authService.setActiveAccount();
  
        const role = await this.authService.fetchUserDetails();
        const currentRoute = this.router.url;
        
      } else {
        // console.log('User is not authenticated. Starting login...');
        await this.authService.login(); // Will trigger popup or redirect login
      }
  
    } catch (error: any) {
      // console.error('App init error:', error);
  
      // Optional: Handle MSAL-specific interaction error
      if (error instanceof InteractionRequiredAuthError) {
        // console.warn('Interaction required. Starting login popup...');
        await this.authService.login(); // fallback to interactive login
      } else {
        this.router.navigate(['/login']);
      }
  
    } finally {
      this.isLoading = false;
    }
  }

  get shouldHideSidebar(): boolean {
  const path = this.currentRoute.split('?')[0]; // Remove query params

  return this.hiddenSidebarRoutes.some(route => path.startsWith(route));
}

  hiddenSidebarRoutes: string[] = [
  '/login',
  '/registration',
  '/exampage',
  '/feedback',
  '/ithelpsprt',
  '/adminsprt',
  '/hrsprt',
  '/prjsprt',
  '/varcmts',
  '/emercntctlst',
  '/iso27001',
  '/iso9001',
  '/hippa',
  '/gdpr',
  '/soc',
  '/dpdp',
  '/eventscheduler',
  '/complianceform'
];

 
}
