import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private inactivityTimeout: any;
  private countdownInterval: any;
  private readonly TIMEOUT_DURATION = 1 * 60 * 1000; // 5 minutes in milliseconds
  private remainingTime = this.TIMEOUT_DURATION / 1000; 
  
  constructor(private msalService: MsalService, private router: Router) {}

  ngOnInit() {
    this.handleRedirectCallback();
    this.resetInactivityTimer();
    this.setupActivityListeners();
  }

  // login() {
  //   this.msalService.loginRedirect();
  // }
  login(): void {
    this.msalService.loginPopup().subscribe({
      next: (response: AuthenticationResult) => {
        // console.log('Login Successful:', response);
        this.msalService.instance.setActiveAccount(response.account);
        this.router.navigate(['/home']); // Navigate after login
      },
      error: (error) => {
        console.error('Login Error:', error);
      }
    });
  }
 
  // logout() {
  //   this.msalService.logoutRedirect();
  // }
  // logout() {
  //   this.msalService.instance.logoutRedirect({
  //     account: this.msalService.instance.getActiveAccount() // Logs out the active account
  //   });
  // }
  // logout() {
  //   const logoutUrl = "https://login.microsoftonline.com/common/oauth2/v2.0/logout" +
  //                     "?post_logout_redirect_uri=http://localhost:4200/login";
  
  //   window.location.href = logoutUrl; // Redirects directly to the logout screen
  // }
  
  logout() {
    const accounts = this.msalService.instance.getAllAccounts();
  
    if (accounts.length > 0) {
      this.msalService.instance.logoutRedirect({
        account: accounts[0], // Logs out the first available account
        postLogoutRedirectUri: 'http://localhost:4200/login' // Redirects after logout
      });
    } else {
      this.msalService.instance.logoutRedirect({
        postLogoutRedirectUri: 'http://localhost:4200/login'
      });
    }
  }
  

  isAuthenticated(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  handleRedirectCallback() {
    this.msalService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
      if (result !== null) {
        this.msalService.instance.setActiveAccount(result.account);
        this.router.navigate(['/home']);
      }
    }).catch(error => {
      console.error("Redirect Authentication Error:", error);
    });
  }

 
  public startInactivityTimer() {
    console.log('Inactivity timer started.');
    this.resetInactivityTimer();
    this.setupActivityListeners();
  }

  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimeout);
    clearInterval(this.countdownInterval);
    this.remainingTime = this.TIMEOUT_DURATION / 1000; // Reset countdown to 5 minutes

    // Start countdown timer in console
    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      console.log(`Time left before auto-logout: ${this.remainingTime} seconds`);

      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);

    this.inactivityTimeout = setTimeout(() => {
      this.logout();
    }, this.TIMEOUT_DURATION);
  }

  private setupActivityListeners() {
    window.addEventListener('mousemove', () => this.resetInactivityTimer());
    window.addEventListener('keydown', () => this.resetInactivityTimer());
    window.addEventListener('click', () => this.resetInactivityTimer());
  }

  // logout() {
  //   this.msalService.logoutRedirect().then(() => {
  //     this.router.navigate(['/login']); // Manually navigate after logout
  //   }).catch(error => {
  //     console.error('Logout Error:', error);
  //   });
  // }

  // logout(): void {
  //   this.msalService.logoutPopup();
  // }

  // isAuthenticated(): boolean {
  //   return this.msalService.instance.getActiveAccount() != null;
  // }
}
