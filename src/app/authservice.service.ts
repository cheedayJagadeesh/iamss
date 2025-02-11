import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private msalService: MsalService, private router: Router) {}

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  isAuthenticated(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  handleRedirectCallback() {
    this.msalService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
      if (result !== null) {
        this.msalService.instance.setActiveAccount(result.account);
        this.router.navigate(['/home']); // Redirect to dashboard after login
      }
    });
  }
}
