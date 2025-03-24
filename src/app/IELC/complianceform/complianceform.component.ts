import { Component } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complianceform',
  templateUrl: './complianceform.component.html',
  styleUrls: ['./complianceform.component.css']
})
export class ComplianceformComponent {

  
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
}
