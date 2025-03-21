import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprtheader',
  templateUrl: './sprtheader.component.html',
  styleUrls: ['./sprtheader.component.css']
})
export class SprtheaderComponent implements OnInit {

  userName: string | null = null;

  constructor(private msalService: MsalService, private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    try {
      await this.msalService.instance.handleRedirectPromise(); // Ensure MSAL is initialized
      this.authService.setActiveAccount(); // Ensure an account is set

      this.authService.userName$.subscribe(username => {
        if (username) {
          this.userName = username;
        } else {
          this.authService.fetchUserDetails(); // Fetch from Microsoft Graph API if missing
        }
      });

      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']); // Redirect if not authenticated
      }
    } catch (error) {
      console.error('MSAL initialization error in HomeComponent:', error);
    }
  }
}
