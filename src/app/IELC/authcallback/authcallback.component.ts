import { Component, OnInit  } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authcallback',
  templateUrl: './authcallback.component.html',
  styleUrls: ['./authcallback.component.css']
})
export class AuthcallbackComponent implements OnInit {
  constructor(private msalService: MsalService, private router: Router) {}

  ngOnInit() {
    this.msalService.instance.handleRedirectPromise().then((response: AuthenticationResult | null) => {
      if (response !== null && response.account) {
        this.msalService.instance.setActiveAccount(response.account);
        this.router.navigate(['/home']); // Redirect after successful login
      } else {
        // console.error('MSAL Redirect Error: No response found');
        this.router.navigate(['/login']); // Redirect to login if there's an issue
      }
    }).catch(error => {
      // console.error('MSAL Redirect Error:', error);
      this.router.navigate(['/login']);
    });
  }
}
