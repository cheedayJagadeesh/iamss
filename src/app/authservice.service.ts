import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './IELC/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inactivityTimeout: any;
  private countdownInterval: any;
  private readonly TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutes
  private remainingTime = this.TIMEOUT_DURATION / 1000; 

  // private userNameSubject = new BehaviorSubject<string | null>(null);
  // userName$ = this.userNameSubject.asObservable();

  // constructor(private msalService: MsalService, private router: Router) {
  //   this.initializeUser();
  //   this.setupActivityListeners();
  // }


  // private initializeUser() {
  //   const account = this.msalService.instance.getActiveAccount();
  //   if (account) {
  //     this.userNameSubject.next(account.username);
  //   }
  // }

  // login(): void {
  //   this.msalService.loginPopup().subscribe({
  //     next: (response: AuthenticationResult) => {
  //       this.msalService.instance.setActiveAccount(response.account);
  //       this.userNameSubject.next(response.account?.username || null);
  //       this.router.navigate(['/home']);
  //     },
  //     error: (error) => {
  //       console.error('Login Error:', error);
  //     }
  //   });
  // }

  // logout() {
  //   const accounts = this.msalService.instance.getAllAccounts();
  //   const logoutOptions = {
  //     account: accounts.length > 0 ? accounts[0] : undefined,
  //     postLogoutRedirectUri: 'http://localhost:4200/login'
  //   };

  //   this.msalService.instance.logoutRedirect(logoutOptions);
  //   this.userNameSubject.next(null); // Clear username after logout
  // }

  // // isAuthenticated(): boolean {
  // //   return this.msalService.instance.getAllAccounts().length > 0;
  // // }
  // setActiveAccount() {
  //   const accounts = this.msalService.instance.getAllAccounts();
  //   if (accounts.length > 0) {
  //     this.msalService.instance.setActiveAccount(accounts[0]);
  //   }
  // }
  
  // isAuthenticated(): boolean {
  //   return this.msalService.instance.getActiveAccount() !== null;
  // }
  // private userNameSubject = new BehaviorSubject<string | null>(null);
  // userName$ = this.userNameSubject.asObservable();

  // constructor(private msalService: MsalService, private router: Router) {
  //   this.initializeUser();
  // }

  // private initializeUser() {
  //   setTimeout(() => {
  //     const account = this.msalService.instance.getActiveAccount();
  //     if (account) {
  //       this.userNameSubject.next(account.username);
  //     }
  //   }, 1000); // Ensure MSAL has initialized before accessing accounts
  // }

  // login(): void {
  //   this.msalService.loginPopup().subscribe({
  //     next: (response: AuthenticationResult) => {
  //       this.msalService.instance.setActiveAccount(response.account);
  //       this.userNameSubject.next(response.account?.username || null);
  //       this.router.navigate(['/home']);
  //     },
  //     error: (error) => {
  //       console.error('Login Error:', error);
  //     }
  //   });
  // }

  // logout() {
  //   this.msalService.instance.logoutRedirect({
  //     postLogoutRedirectUri: 'http://localhost:4200/login'
  //   });
  //   this.userNameSubject.next(null); // Clear username after logout
  // }

  // setActiveAccount() {
  //   setTimeout(() => {
  //     const accounts = this.msalService.instance.getAllAccounts();
  //     if (accounts.length > 0) {
  //       this.msalService.instance.setActiveAccount(accounts[0]);
  //       this.userNameSubject.next(accounts[0].username);
  //     }
  //   }, 1000); // Delay to ensure MSAL is initialized
  // }

  // isAuthenticated(): boolean {
  //   return this.msalService.instance.getActiveAccount() !== null;
  // }

//   private userNameSubject = new BehaviorSubject<string | null>(null);
//   userName$ = this.userNameSubject.asObservable();
  

//   constructor(private msalService: MsalService, private router: Router, private http: HttpClient) {
//     this.initializeUser();
//   }

//   // private initializeUser() {
//   //   setTimeout(() => {
//   //     const account = this.msalService.instance.getActiveAccount();
//   //     if (account) {
//   //       this.fetchUserDetails(); // 🔹 Fetch name from Graph API
//   //     }
//   //   }, 1000); // Ensure MSAL initializes first
//   // }

//   login(): void {
//     this.msalService.loginPopup().subscribe({
//       next: (response: AuthenticationResult) => {
//         this.msalService.instance.setActiveAccount(response.account);
//         this.fetchUserDetails(); // 🔹 Fetch name after login
//         this.router.navigate(['/home']);
//       },
//       error: (error) => {
//         console.error('Login Error:', error);
//       }
//     });
//   }

//   logout() {
//     this.msalService.instance.logoutRedirect({
//       postLogoutRedirectUri: 'http://localhost:4200/login'
//     });
//     this.userNameSubject.next(null); // Clear username after logout
//   }

//   isAuthenticated(): boolean {
//     return this.msalService.instance.getActiveAccount() !== null;
//   }

//   private initializeUser() {
//     setTimeout(() => {
//       const account = this.msalService.instance.getActiveAccount();
//       if (account) {
//         this.userNameSubject.next(account.name || account.username); // Use name first, fallback to email
//       }
//     }, 1000); // Delay to ensure MSAL initializes
//   }
  
//   setActiveAccount() {
//     setTimeout(() => {
//       const accounts = this.msalService.instance.getAllAccounts();
//       if (accounts.length > 0) {
//         this.msalService.instance.setActiveAccount(accounts[0]);
//         this.userNameSubject.next(accounts[0].name || accounts[0].username); // Prefer name over email
//       }
//     }, 1000);
//   }
  
//  // 🔹 Fetch user details from Microsoft Graph API
//   public fetchUserDetails() {
//     const accessTokenRequest = {
//       scopes: ['user.read'] // Ensure 'user.read' permission is granted in Azure
//     };

//     this.msalService.instance.acquireTokenSilent(accessTokenRequest).then((tokenResponse) => {
//       if (tokenResponse) {
//         this.http.get<any>('https://graph.microsoft.com/v1.0/me', {
//           headers: { Authorization: `Bearer ${tokenResponse.accessToken}` }
//         }).subscribe({
//           next: (user) => {
//             this.userNameSubject.next(user.displayName); // ✅ Set display name
//             this.userNameSubject.next(user.mail); 
//           },
//           error: (err) => console.error('Error fetching user details:', err)
//         });
//       }
//     }).catch(error => {
//       console.error('Token acquisition failed:', error);
//     });
//   }


//   handleRedirectCallback() {
//     this.msalService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
//       if (result) {
//         this.msalService.instance.setActiveAccount(result.account);
//         this.userNameSubject.next(result.account?.username || null);
//         this.router.navigate(['/home']);
//       }
//     }).catch(error => {
//       console.error("Redirect Authentication Error:", error);
//     });
//   }

//   // ---------------- Inactivity Timer ----------------
//   startInactivityTimer() {
//     if (this.router.url === '/login') {
//       console.log('Skipping inactivity timer on login page');
//       return; // Do not start timer on login page
//     }
//     console.log('Inactivity timer started.');
//     this.resetInactivityTimer();
//   }

//   private resetInactivityTimer() {
//     clearTimeout(this.inactivityTimeout);
//     clearInterval(this.countdownInterval);
//     this.remainingTime = this.TIMEOUT_DURATION / 1000; // Reset countdown

//     this.countdownInterval = setInterval(() => {
//       this.remainingTime--;
//       console.log(`Time left before auto-logout: ${this.remainingTime} seconds`);

//       if (this.remainingTime <= 0) {
//         clearInterval(this.countdownInterval);
//       }
//     }, 1000);

//     this.inactivityTimeout = setTimeout(() => {
//       console.log("User inactive. Logging out...");
//       this.logout();
//     }, this.TIMEOUT_DURATION);
//   }

//   private setupActivityListeners() {
//     ['mousemove', 'keydown', 'click'].forEach(event => {
//       window.addEventListener(event, () => this.resetInactivityTimer());
//     });
//   }

private userDetailsSubject = new BehaviorSubject<{ displayName: string | null, email: string | null }>({ displayName: null, email: null });
userDetails$ = this.userDetailsSubject.asObservable();

constructor(private msalService: MsalService, private router: Router, private http: HttpClient) {
  this.initializeUser();
  // this.setupActivityListeners();
}

// private initializeUser() {
//   setTimeout(() => {
//     const account = this.msalService.instance.getActiveAccount();
//     if (account) {
//       this.fetchUserDetails(); // Fetch details from Microsoft Graph API
//     }
//   }, 1000);
// }
private initializeUser() {
  setTimeout(() => {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]); // Ensure active account is set
      this.fetchUserDetails();
    }
  }, 1000);
}

login(): void {
  this.msalService.loginPopup().subscribe({
    next: (response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
      this.fetchUserDetails(); // Fetch user details after login
      this.router.navigate(['/home']);
    },
    error: (error) => {
      console.error('Login Error:', error);
    }
  });
}

logout() {
  this.msalService.instance.logoutRedirect({
    // postLogoutRedirectUri: 'http://localhost:4200/login'
    postLogoutRedirectUri: environment.postLogoutRedirectUri
  });
  this.userDetailsSubject.next({ displayName: null, email: null }); // Clear user details on logout
}

isAuthenticated(): boolean {
  return this.msalService.instance.getActiveAccount() !== null;
}

setActiveAccount() {
  setTimeout(() => {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      this.fetchUserDetails(); // Fetch latest user details
    }
  }, 1000);
}

// 🔹 Fetch user details from Microsoft Graph API
public fetchUserDetails() {
  const accessTokenRequest = {
    scopes: ['user.read'] // Ensure 'user.read' permission is granted in Azure
  };

  this.msalService.instance.acquireTokenSilent(accessTokenRequest).then((tokenResponse) => {
    if (tokenResponse) {
      this.http.get<any>('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${tokenResponse.accessToken}` }
      }).subscribe({
        next: (user) => {
          this.userDetailsSubject.next({ 
            displayName: user.displayName, 
            email: user.mail || user.userPrincipalName // Use `mail`, fallback to `userPrincipalName`
          });
        },
        error: (err) => console.error('Error fetching user details:', err)
      });
    }
  }).catch(error => {
    console.error('Token acquisition failed:', error);
  });
}

handleRedirectCallback() {
  this.msalService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
    if (result) {
      this.msalService.instance.setActiveAccount(result.account);
      this.fetchUserDetails();
      if (this.router.url === '/login') {
        this.router.navigate(['/home']);
      }
    }
  }).catch(error => {
    console.error("Redirect Authentication Error:", error);
  });
}

// ---------------- Inactivity Timer ----------------
// startInactivityTimer() {
//   if (this.router.url === '/login') {
//     console.log('Skipping inactivity timer on login page');
//     return;
//   }
//   console.log('Inactivity timer started.');
//   this.resetInactivityTimer();
// }

// private resetInactivityTimer() {
//   clearTimeout(this.inactivityTimeout);
//   clearInterval(this.countdownInterval);
//   this.remainingTime = this.TIMEOUT_DURATION / 1000;

//   this.countdownInterval = setInterval(() => {
//     this.remainingTime--;
//     console.log(`Time left before auto-logout: ${this.remainingTime} seconds`);

//     if (this.remainingTime <= 0) {
//       clearInterval(this.countdownInterval);
//     }
//   }, 1000);

//   this.inactivityTimeout = setTimeout(() => {
//     console.log("User inactive. Logging out...");
//     this.logout();
//   }, this.TIMEOUT_DURATION);
// }

// private setupActivityListeners() {
//   ['mousemove', 'keydown', 'click'].forEach(event => {
//     window.addEventListener(event, () => this.resetInactivityTimer());
//   });
// }




}
