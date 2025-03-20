import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './authservice.service';
import { Router } from '@angular/router';

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
    try {
      await this.msalService.instance.initialize(); // Ensure MSAL is initialized
      console.log('MSAL initialized successfully');
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }
       if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

  }
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
