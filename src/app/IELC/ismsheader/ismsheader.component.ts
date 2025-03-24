import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ismsheader',
  templateUrl: './ismsheader.component.html',
  styleUrls: ['./ismsheader.component.css']
})
export class IsmsheaderComponent {
  // constructor(private authService: AuthService) {}
  
  userName: string | null = null;
  userEmail: string | null = null;

  constructor(private msalService: MsalService, private authService: AuthService, private router: Router) {}
 
   async ngOnInit() {
    try {
      await this.msalService.instance.handleRedirectPromise(); // Ensure MSAL is initialized
      this.authService.setActiveAccount(); // Ensure an account is set

      // this.authService.userName$.subscribe(username => {
      //   if (username) {
      //     this.userName = username;
      //   } else {
      //     this.authService.fetchUserDetails(); // Fetch from Microsoft Graph API if missing
      //   }
      // });
      this.authService.userDetails$.subscribe(userDetails => {
        this.userName = userDetails.displayName;
        this.userEmail = userDetails.email;
      });

      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']); // Redirect if not authenticated
      }
    } catch (error) {
      console.error('MSAL initialization error in HomeComponent:', error);
    }
  }
  logout(): void {
    this.authService.logout();
  }
}
