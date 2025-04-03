import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './authservice.service';
import { Router } from '@angular/router';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IAMS';
  constructor(private msalService: MsalService,private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    // this.authService.startInactivityTimer();
    // this.router.events.subscribe(() => {
    //   this.authService.startInactivityTimer();
    // });
    try {
      await this.msalService.instance.initialize(); // Ensure MSAL is initialized
      console.log('MSAL initialized successfully');
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }
    //    if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/home']);
    // }
    if (this.authService.isAuthenticated()) {
      this.authService.setActiveAccount();
    } else {
      this.router.navigate(['/login']); // Redirect to login only if not authenticated
    }

  }
  

  // async ngOnInit() {
  //   try {
  //     console.log('Checking MSAL authentication state...');
  
  //     // 1️⃣ Handle authentication response first (redirect-based login)
  //     const authResponse = await this.msalService.instance.handleRedirectPromise();
      
  //     if (authResponse !== null && authResponse.account) {
  //       this.msalService.instance.setActiveAccount(authResponse.account);
  //       console.log("MSAL authentication successful", authResponse);
  //     } else {
  //       console.log("No authentication response found");
  //     }
  
  //     // 2️⃣ Now check if user is authenticated
  //     if (this.authService.isAuthenticated()) {
  //       console.log("User is authenticated, setting active account...");
  //       this.authService.setActiveAccount();
  //     } else {
  //       console.log("User is NOT authenticated, redirecting to login...");
  //       this.router.navigate(['/login']); // Redirect to login only if not authenticated
  //     }
  
  //   } catch (error) {
  //     console.error('Error during MSAL authentication:', error);
  //   }
  // }
  

  // async ngOnInit() {
  //   try {
  //     // Wait for redirect authentication response
  //     const result = await this.msalService.instance.handleRedirectPromise();
  
  //     if (result !== null && result.account) {
  //       this.msalService.instance.setActiveAccount(result.account);
  //       console.log('User authenticated:', result.account);
  //     } else {
  //       console.log('No authentication detected.');
  //     }
  
  //     // Redirect to home if already authenticated
  //     if (this.authService.isAuthenticated()) {
  //       this.router.navigate(['/home']);
  //     }
  //   } catch (error) {
  //     console.error('MSAL initialization error:', error);
  //   }
  // }


  // async ngOnInit() {
  //   try {
  //     await this.msalService.instance.handleRedirectPromise(); // Wait for MSAL to initialize
  //     this.authService.setActiveAccount();

  //     if (this.authService.isAuthenticated()) {
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.router.navigate(['/login']);
  //     }
  //   } catch (error) {
  //     console.error('MSAL initialization error:', error);
  //   }
  // }
  
  // constructor(private authService: AuthService, private router: Router, private msalService: MsalService) {}

  // ngOnInit(): void {
  //   this.msalService.instance.handleRedirectPromise().then(result => {
  //     if (result !== null && result.account) {
  //       this.msalService.instance.setActiveAccount(result.account);
  //       console.log('User authenticated:', result.account);
  //       this.router.navigate(['/home']);
  //     } else {
  //       console.log('No authentication detected.');
  //     }
  //   }).catch(error => {
  //     console.error('MSAL Redirect Error:', error);
  //   });

  //   // Check authentication status on page load
  //   if (this.authService.isAuthenticated()) {
  //     this.router.navigate(['/home']);
  //   }
  // }
}
