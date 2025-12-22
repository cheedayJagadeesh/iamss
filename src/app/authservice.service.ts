import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { Router, NavigationEnd  } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './IELC/environment';
import { IelcapiService } from './IELC/ielcapi.service';

interface User {
  roleName: string;
  pageName: string | string[];
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inactivityTimeout: any;
  private countdownInterval: any;
  private readonly TIMEOUT_DURATION = 30 * 60 * 1000; // 5 minutes
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
  startInactivityTimer() {
    // if (this.router.url === '/login') {
    //   console.log('Skipping inactivity timer on login page');
    //   return; // Do not start timer on login page
    // }
    // console.log('Inactivity timer started.');
    this.resetInactivityTimer();
  }

  // startInactivityTimer() {
  //   const excludedRoutes = ['/login', '/exampage'];
  
  //   // Normalize route by removing hash and query parameters
  //   const currentPath = this.router.url.replace(/^#/, '').split('?')[0];
  
  //   if (excludedRoutes.includes(currentPath)) {
  //     console.log('Skipping inactivity timer on', currentPath);
  //     return;
  //   }
  
  //   console.log('Inactivity timer started.');
  //   this.resetInactivityTimer();
  // }

  private resetInactivityTimer() {
    const excludedRoutes = ['/login', '/exampage'];
    const currentPath = this.router.url.replace(/^#/, '').split('?')[0];
  
    if (excludedRoutes.includes(currentPath)) {
      // console.log('Skipping reset of inactivity timer on', currentPath);
      return;
    }
  
    clearTimeout(this.inactivityTimeout);
    clearInterval(this.countdownInterval);
    this.remainingTime = this.TIMEOUT_DURATION / 1000;
  
    this.countdownInterval = setInterval(() => {
      this.remainingTime--;
      // console.log(`Time left before auto-logout: ${this.remainingTime} seconds`);
  
      if (this.remainingTime <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  
    this.inactivityTimeout = setTimeout(() => {
      // console.log("User inactive. Logging out...");
      this.logout();
    }, this.TIMEOUT_DURATION);
  }
  
  
  

  // private resetInactivityTimer() {
  //   clearTimeout(this.inactivityTimeout);
  //   clearInterval(this.countdownInterval);
  //   this.remainingTime = this.TIMEOUT_DURATION / 1000; // Reset countdown

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
  private handleRouteChanges() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const excludedRoutes = ['/login', '/exampage'];
  
        // Remove the hash and query parameters
        const currentPath = event.urlAfterRedirects.replace(/^#?\/?/, '/').split('?')[0];
  
        if (excludedRoutes.includes(currentPath)) {
          // console.log('Clearing timers on excluded route:', currentPath);
          clearTimeout(this.inactivityTimeout);
          clearInterval(this.countdownInterval);
        }
      }
    });
  }
  
  

  private setupActivityListeners() {
    ['mousemove', 'keydown', 'click'].forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

private userDetailsSubject = new BehaviorSubject<{ displayName: string | null, email: string | null }>({ displayName: null, email: null });
userDetails$ = this.userDetailsSubject.asObservable();

constructor(private msalService: MsalService, private router: Router, private http: HttpClient,private ielc: IelcapiService) {
  this.initializeUser();
  this.setupActivityListeners();
  this.handleRouteChanges();
}

// private initializeUser() {
//   setTimeout(() => {
//     const account = this.msalService.instance.getActiveAccount();
//     if (account) {
//       this.fetchUserDetails(); // Fetch details from Microsoft Graph API
//     }
//   }, 1000);
// }
// private initializeUser() {
//   setTimeout(() => {
//     const accounts = this.msalService.instance.getAllAccounts();
//     if (accounts.length > 0) {
//       this.msalService.instance.setActiveAccount(accounts[0]); // Ensure active account is set
//       this.fetchUserDetails();
//     }
//   }, 1000);
// }

private initializeUser() {
  setTimeout(() => {
    const accounts = this.msalService.instance.getAllAccounts();

    // ❌ Do NOT auto-login on login page
    if (this.router.url === '/login') {
      return;
    }

    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      this.fetchUserDetails();
    }
  }, 1000);
}


// login(): void {
//   this.msalService.loginPopup().subscribe({
//     next: (response: AuthenticationResult) => {
//       this.msalService.instance.setActiveAccount(response.account);
//       this.fetchUserDetails(); // Fetch user details after login
//       this.router.navigate(['/home']);
//     },
//     error: (error) => {
//       // console.error('Login Error:', error);
//     }
//   });
// }



// login(): void {
//   this.msalService.loginPopup().subscribe({
//     next: (response: AuthenticationResult) => {
//       this.msalService.instance.setActiveAccount(response.account);
//       this.fetchUserDetails();

//       const redirectUrl = localStorage.getItem('redirectUrl') || '/home';
//       localStorage.removeItem('redirectUrl');
//       this.router.navigateByUrl(redirectUrl);
//     },
//     error: (error) => {
//       console.error('Login Error:', error);
//     }
//   });
// }


// logout() {
//   this.msalService.instance.logoutRedirect({
//     // postLogoutRedirectUri: 'http://localhost:4200/login'
//     postLogoutRedirectUri: environment.postLogoutRedirectUri
//   });
//   this.userDetailsSubject.next({ displayName: null, email: null }); // Clear user details on logout
// }
logout(): void {
  this.msalService.logoutPopup().subscribe({
    next: () => {
      this.userDetailsSubject.next({ displayName: null, email: null }); // Clear user details

      // Manually redirect to the post-logout URL
      window.location.href = environment.postLogoutRedirectUri;
    },
    error: (error) => {
      // console.error('Logout Error:', error);
    }
  });
}


// isAuthenticated(): boolean {
//   return this.msalService.instance.getActiveAccount() !== null;
// }

isAuthenticated(): boolean {
  const active = this.msalService.instance.getActiveAccount();

  if (!active) {
    // Try to recover from all available accounts
    const allAccounts = this.msalService.instance.getAllAccounts();
    if (allAccounts.length > 0) {
      this.msalService.instance.setActiveAccount(allAccounts[0]);
      return true;
    }
    return false;
  }

  return true;
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
// public fetchUserDetails() {
//   const accessTokenRequest = {
//     scopes: ['user.read'] // Ensure 'user.read' permission is granted in Azure
//   };

//   this.msalService.instance.acquireTokenSilent(accessTokenRequest).then((tokenResponse) => {
//     if (tokenResponse) {
//       this.http.get<any>('https://graph.microsoft.com/v1.0/me', {
//         headers: { Authorization: `Bearer ${tokenResponse.accessToken}` }
//       }).subscribe({
//         next: (user) => {
//           this.userDetailsSubject.next({ 
//             displayName: user.displayName, 
//             email: user.mail || user.userPrincipalName // Use `mail`, fallback to `userPrincipalName`
//           });
//         },
//         error: (err) => console.error('Error fetching user details:', err)
//       });
//     }
//   }).catch(error => {
//     console.error('Token acquisition failed:', error);
//   });
// }

public userInfo: User | null = null;
userInfoInitialized = false;
// private userInfoSubject = new BehaviorSubject<User | null>(null);
// userInfo$ = this.userInfoSubject.asObservable();
private userRole: string = '';
private allowedPages: string[] = [];
private userInfoSubject = new BehaviorSubject<User>({
  email: '',
  roleName: '',
  pageName: [], // Default value is an array of strings
});
public userInfo$ = this.userInfoSubject.asObservable();
// public fetchUserDetails(): void {
//   const accessTokenRequest = {
//     scopes: ['user.read']  // Ensure 'user.read' permission is granted in Azure
//   };

//   this.msalService.instance.acquireTokenSilent(accessTokenRequest).then((tokenResponse) => {
//     if (tokenResponse) {
//       this.http.get<any>('https://graph.microsoft.com/v1.0/me', {
//         headers: { Authorization: `Bearer ${tokenResponse.accessToken}` }
//       }).subscribe({
//         next: (user) => {
//           this.userDetailsSubject.next({ 
//             displayName: user.displayName, 
//             email: user.mail || user.userPrincipalName // Use `mail`, fallback to `userPrincipalName`
   
//           });

//           // Fetch admin users and match the logged-in user
//           this.ielc.Getadminusers().subscribe({
//             next: (users: User[]) => {
//               const graphEmail = user.mail || user.userPrincipalName;
          
//               console.log("Logged-in Graph Email:", graphEmail);
//               console.log("Admin Users List:", users.map(u => u.email));
          
//               const currentUser = users.find((u: User) => 
//                 u.email?.toLowerCase() === graphEmail?.toLowerCase()
//               );
          
//               if (currentUser) {
//                 this.userRole = user.role;
//                 if (user.role === 'SuperAdmin') {
//                   this.allowedPages = user.pages || [];
//                   this.router.navigate(['/home']); // Redirect to Home
//                 } else if (user.role === 'Admin') {
//                   this.allowedPages = ['home', 'registration', ...(user.pages || [])];
//                   this.router.navigate(['/home']);
//                 } else {
//                   this.allowedPages = ['registration'];
//                   this.router.navigate(['/registration']);
//                 }
//               } else {
//                 // User not found in admin list
//                 this.userRole = 'User';
//                 this.allowedPages = ['registration'];
//                 this.router.navigate(['/registration']);
//               }
//             },
//             error: (err) => console.error('API error:', err),
//           });
          
//         },
//         error: (err) => console.error('Error fetching user details:', err)
//       });
//     }
//   }).catch((error) => {
//     console.error('Token acquisition failed:', error);
//   });
  
// }
private hasRedirected = false; 
// public fetchUserDetails(): void {
//   const accessTokenRequest = {
//     scopes: ['user.read']  // Ensure 'user.read' permission is granted in Azure
//   };

//   this.msalService.instance.acquireTokenSilent(accessTokenRequest).then((tokenResponse) => {
//     // if (tokenResponse) {
//     //   this.http.get<any>('https://graph.microsoft.com/v1.0/me', {
//     //     headers: { Authorization: `Bearer ${tokenResponse.accessToken}` }
//     //   }).subscribe({
//     //     next: (user) => {
//     //       // Emit basic user details
//     //       this.userInfoSubject.next({ 
//     //         email: user.mail || user.userPrincipalName, 
//     //         roleName: '',  // Placeholder for roleName, to be populated later
//     //         pageName: []   // Placeholder for pageName, to be populated later
//     //       });
//         if (tokenResponse) {
//       this.http.get<any>('https://graph.microsoft.com/v1.0/me', {
//         headers: { Authorization: `Bearer ${tokenResponse.accessToken}` }
//       }).subscribe({
//         next: (user) => {
//           this.userDetailsSubject.next({ 
//             displayName: user.displayName, 
//             email: user.mail || user.userPrincipalName // Use `mail`, fallback to `userPrincipalName`
   
//           });
          

//           // Fetch admin users and match the logged-in user
//           this.ielc.Getadminusers().subscribe({
//             next: (users: User[]) => {
//               const graphEmail = user.mail || user.userPrincipalName;
          
//               console.log("Logged-in Graph Email:", graphEmail);
//               console.log("Admin Users List:", users.map(u => u.email));
          
//               const currentUser = users.find((u: User) => 
//                 u.email?.toLowerCase() === graphEmail?.toLowerCase()
//               );
          
//               if (currentUser) {
//                 let pageNames: string[] = [];

//                 if (Array.isArray(currentUser.pageName)) {
//                   pageNames = currentUser.pageName;
//                 } else if (typeof currentUser.pageName === 'string') {
//                   pageNames = currentUser.pageName.split(',').map(p => p.trim());
//                 }
              
//                 // If user found in the admin list, update the roleName and pageName
//                 this.userInfoSubject.next({
//                   email: graphEmail,
//                   roleName: currentUser.roleName,  // Set the user's roleName
//                   pageName: pageNames   // Set the user's pageName (default to empty array)
//                 });
//                 this.userInfoInitialized = true;
//                 // Perform redirection based on the roleName
//                 if (!this.hasRedirected) {
//                   this.hasRedirected = true;
                
//                   // if (currentUser.roleName === 'SuperAdmin') {
//                   //   if (this.router.url !== '/home') {
//                   //     this.router.navigate(['/home']);
//                   //   }
//                   // } else if (currentUser.roleName === 'Admin') {
//                   //   if (this.router.url !== '/home') {
//                   //     this.router.navigate(['/home']);
//                   //   }
//                   // } else {
//                   //   if (this.router.url !== '/registration') {
//                   //     this.router.navigate(['/registration']);
//                   //   }
//                   // }
//                   const lastRole = localStorage.getItem('userRole');
//                   const currentRole = currentUser.roleName;

//                   if (lastRole !== currentRole) {
//                     // Role changed or first login — perform redirection
//                     localStorage.setItem('userRole', currentRole);

//                     if (currentRole === 'SuperAdmin' || currentRole === 'Admin') {
//                       if (this.router.url === '/' || this.router.url === '/registration') {
//                         this.router.navigate(['/home']);
//                       }
//                     } else {
//                       if (this.router.url !== '/registration') {
//                         this.router.navigate(['/registration']);
//                       }
//                     }
//                   }

//                   // const currentRole = currentUser.roleName;
//                   // const currentUrl = this.router.url;

//                   // localStorage.setItem('userRole', currentRole);

//                   // if ((currentRole === 'SuperAdmin' || currentRole === 'Admin') && currentUrl === '/registration') {
//                   //   // Admins currently on /registration should go to home
//                   //   this.router.navigate(['/home']);
//                   // } else if (currentRole === 'User' && currentUrl !== '/registration') {
//                   //   // Users should never stay on /home or anywhere else
//                   //   this.router.navigate(['/registration']);
//                   // }
                  
//                 }
                
//               } else {
//                 // If user is not found in the admin list, set default role and pageName
//                 this.userInfoSubject.next({
//                   email: graphEmail,
//                   roleName: 'User',  // Default role for non-admin users
//                   pageName: ['registration']
//                     // Default page for non-admin users
//                 });
//                 this.userInfoInitialized = true;
//                 // Redirect to registration for non-admin users
//                 this.router.navigate(['/registration']);
//               }
//             },
//             error: (err) => console.error('API error:', err),
//           });
          
//         },
//         error: (err) => console.error('Error fetching user details:', err)
//       });
//     }
//   }).catch((error) => {
//     console.error('Token acquisition failed:', error);
//   });
// }
// private userInfoSubject = new BehaviorSubject<User | null>(null);
async getUserInfo(): Promise<User | null> {
  if (this.userInfoSubject.value) {
    return this.userInfoSubject.value;
  }
  
  try {
    // Ensure user info is fetched (e.g., check localStorage or fetch from API)
    await this.fetchUserDetails();
    return this.userInfoSubject.value;
  } catch (error) {
    // console.error('Error fetching user info:', error);
    return null;
  }
}

public fetchUserDetails(): Promise<'SuperAdmin' | 'Admin' | 'User'> {
  return new Promise((resolve, reject) => {
    const accessTokenRequest = { scopes: ['user.read'] };

    this.msalService.instance.acquireTokenSilent(accessTokenRequest).then((tokenResponse) => {
      if (!tokenResponse) return;

      this.http.get<any>('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${tokenResponse.accessToken}` }
      }).subscribe({
        next: (user) => {
          const graphEmail = user.mail || user.userPrincipalName;
          this.userDetailsSubject.next({
            displayName: user.displayName,
            email: graphEmail
          });

          this.ielc.Getadminusers().subscribe({
            next: (users: User[]) => {
              const currentUser = users.find((u: User) =>
                u.email?.toLowerCase() === graphEmail?.toLowerCase()
              );

              let roleName: string = 'User';
              let pageNames: string[] = ['registration'];

              if (currentUser) {
                roleName = currentUser.roleName || 'User';
                pageNames = Array.isArray(currentUser.pageName)
                  ? currentUser.pageName
                  : typeof currentUser.pageName === 'string'
                  ? currentUser.pageName.split(',').map(p => p.trim())
                  : [];
              }

              this.userInfoSubject.next({
                email: graphEmail,
                roleName,
                pageName: pageNames
              });

              this.userInfoInitialized = true;
              // console.log('[fetchUserDetails] userInfoInitialized set to:', this.userInfoInitialized);
              // console.log('[fetchUserDetails] Resolved with role:', roleName);
              // console.log('[fetchUserDetails] pages:', pageNames);
              resolve(roleName as 'SuperAdmin' | 'Admin' | 'User');
            },
            error: (err) => {
              // console.error('API error:', err);
              reject(err);
            }
          });
        },
        error: (err) => {
          // console.error('Graph fetch error:', err);
          reject(err);
        }
      });
    }).catch((error) => {
      // console.error('Token acquisition failed:', error);
      reject(error);
    });
  });
}

async hasAccess(allowedRoles: string[]): Promise<boolean> {
  const role = await this.fetchUserDetails();
  return allowedRoles.includes(role);
}


loginSuccess(userInfo: any): void {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}



setUserInfo(user: User) {
  this.userInfoSubject.next(user);
}

// getUserInfo(): User | null {
//   return this.userInfoSubject.value;
// }
getUserRole(): string {
  return this.userRole;
}
getAllowedPages(): string[] {
  return this.allowedPages;
}


getUserPageNames(): string[] {
  const pageName = this.userInfoSubject.value?.pageName;
  
  // console.log('userInfoSubject value:', this.userInfoSubject.value); // Debug log

  // Ensure that we always return an array
  if (Array.isArray(pageName)) {
    return pageName;
  }

  if (typeof pageName === 'string') {
    return pageName.split(',').map(p => p.trim());
  }

  // Log the situation where the pageName is neither a string nor an array
  // console.warn('Page name is not defined or not a string/array. Returning an empty array.');

  return []; // Return an empty array if pageName is undefined or any other unexpected type
}




public hasActiveAccount(): boolean {
  return !!this.msalService.instance.getActiveAccount();
}

public async ensureMsalInitialized(): Promise<void> {
  await this.msalService.instance.initialize();
  const result = await this.msalService.instance.handleRedirectPromise();
  if (result && result.account) {
    this.msalService.instance.setActiveAccount(result.account);
  }
}


// Get user information from the service
// public getUserInfo(): User | null {
//   return this.userInfo; // Return the stored user info
  
// }

// Check if the user is authenticated
// public isAuthenticated(): boolean {
//   return !!this.userInfo; 
// }

// Check if the user has a specific page access based on their role
// public hasPageAccess(page: string): boolean {
//   return this.userInfo?.pageName === page || this.userInfo?.roleName === 'SuperAdmin';
// }
// public hasPageAccess(page: string): boolean {
//   const allowedPages = this.userInfo?.pageName?.split(',').map(p => p.trim()) || [];
//   return this.userInfo?.roleName === 'SuperAdmin' || allowedPages.includes(page);
// }

// public hasPageAccess(page: string): boolean {
//   const roleName = this.userInfo?.roleName;
//   const pageList = this.userInfo?.pageName?.split(',').map(p => p.trim().toLowerCase()) || [];

//   if (roleName === 'SuperAdmin') {
//     return true; // Full access
//   } else if (roleName === 'Admin') {
//     return pageList.includes(page.toLowerCase());
//   }

//   return page === 'registration';
// }





// handleRedirectCallback() {
//   this.msalService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
//     if (result) {
//       this.msalService.instance.setActiveAccount(result.account);
//       this.fetchUserDetails();
//       if (this.router.url === '/login') {
//         this.router.navigate(['/home']);
//       }
//     }
//   }).catch(error => {
//     console.error("Redirect Authentication Error:", error);
//   });
// }
handleRedirectCallback() {
  this.msalService.instance.handleRedirectPromise()
    .then((result: AuthenticationResult | null) => {
      // console.log("handleRedirectPromise result:", result);
      if (result) {
        this.msalService.instance.setActiveAccount(result.account);
        this.fetchUserDetails();
        if (this.router.url === '/login') {
          this.router.navigate(['/home']);
        }
      }
    })
    .catch(error => {
      // console.error("Redirect Authentication Error:", error);
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

isLoginInProgress = false;
login(): void {
  if (this.isLoginInProgress) {
    return; // Prevent multiple simultaneous login attempts
  }
  this.isLoginInProgress = true;
  // this.msalService.loginPopup().subscribe({
    this.msalService.loginPopup({
      prompt: 'login',
      scopes: []
    }).subscribe({
    next: (response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
      this.fetchUserDetails(); // optional, for registration checks
      this.router.navigate(['/home']);
      this.isLoginInProgress = false;
    },
    error: (error) => {
      console.error('Login Error:', error);
      this.isLoginInProgress = false; // Reset flag even on error
    }
  });
}


}
