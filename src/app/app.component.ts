import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './authservice.service';
import { Router } from '@angular/router';
import { AuthenticationResult, InteractionRequiredAuthError  } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {

  title = 'IAMS';
  constructor(private msalService: MsalService,private authService: AuthService, private router: Router) {}

  // async ngOnInit() {
  //   // this.authService.startInactivityTimer();
  //   // this.router.events.subscribe(() => {
  //   //   this.authService.startInactivityTimer();
  //   // });
  //   try {
      
  //     await this.msalService.instance.initialize(); // Ensure MSAL is initialized
  //     console.log('MSAL initialized successfully');
  //   } catch (error) {
  //     console.error('MSAL initialization error:', error);
  //   }
  //   //    if (this.authService.isAuthenticated()) {
  //   //   this.router.navigate(['/home']);
  //   // }
  //   // if (!this.authService.isAuthenticated()) {
  //   //   this.authService.login();
  //   // }
  //   if (this.authService.isAuthenticated()) {
  //     this.authService.setActiveAccount();
  //     this.authService.fetchUserDetails();
   
  //   } else {
  //     this.router.navigate(['/login']); // Redirect to login only if not authenticated
  //   }
  

   

  // }
  isLoading: boolean = true;
  currentRoute: string = '';
  // async ngOnInit() {
    
  //   try {
  //     await this.msalService.instance.initialize();
  //     console.log('MSAL initialized');
  //     this.router.events.subscribe(() => {
  //       this.currentRoute = this.router.url;
  //     });
  //     if (this.authService.isAuthenticated()) {
  //       console.log('User is authenticated');
  //       this.authService.setActiveAccount();
  
  //       const role = await this.authService.fetchUserDetails();
  //       const currentRoute = this.router.url;
  
  //       if (role === 'SuperAdmin' || role === 'Admin') {
  //         // if (currentRoute === '/' || currentRoute === '/registration') {
  //         if (currentRoute === '/' ) {
  //           this.router.navigate(['/home']);
  //         }
  //       } else {
  //         if (currentRoute !== '/registration') {
  //           this.router.navigate(['/registration']);
  //         }
  //       }
  
  //     } else {
  //       console.log('User is not authenticated, starting login...');
  //       await this.authService.login(); 
  //     }
  //   } catch (error) {
  //     console.error('App init error:', error);
  //     this.router.navigate(['/login']);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

  async ngOnInit() {
    this.isLoading = true;
    try {
      // Step 1: Handle MSAL redirect (if using redirect login)
      await this.msalService.instance.initialize();
      const redirectResult = await this.msalService.instance.handleRedirectPromise();
  
      if (redirectResult !== null && redirectResult.account) {
        console.log('Redirect login successful. Setting active account.');
        this.msalService.instance.setActiveAccount(redirectResult.account);
      }
  
      // Step 2: Set current route watcher
      this.router.events.subscribe(() => {
        this.currentRoute = this.router.url;
      });
  
      // Step 3: Check if the user is authenticated
      if (this.authService.isAuthenticated()) {
        console.log('User is authenticated');
        this.authService.setActiveAccount();
  
        const role = await this.authService.fetchUserDetails();
        const currentRoute = this.router.url;
  
        if (role === 'SuperAdmin' || role === 'Admin') {
          if (currentRoute === '/') {
            this.router.navigate(['/home']);
          }
        } else {
          if (currentRoute !== '/registration') {
            this.router.navigate(['/registration']);
          }
        }
      } else {
        console.log('User is not authenticated. Starting login...');
        await this.authService.login(); // Will trigger popup or redirect login
      }
  
    } catch (error: any) {
      console.error('App init error:', error);
  
      // Optional: Handle MSAL-specific interaction error
      if (error instanceof InteractionRequiredAuthError) {
        console.warn('Interaction required. Starting login popup...');
        await this.authService.login(); // fallback to interactive login
      } else {
        this.router.navigate(['/login']);
      }
  
    } finally {
      this.isLoading = false;
    }
  }
  
  
  

  
  // async ngOnInit() {
  //   await this.msalService.instance.initialize();
  //   const accounts = this.msalService.instance.getAllAccounts();
  
  //   if (accounts.length > 0) {
  //     this.msalService.instance.setActiveAccount(accounts[0]);
  //   }
  
  //   const activeAccount = this.msalService.instance.getActiveAccount();
  
  //   if (activeAccount) {
  //     try {
  //       const result = await this.msalService.acquireTokenSilent({
  //         account: activeAccount,
  //         scopes: ['user.read'],
  //       }).toPromise();
  
  //       if (result && result.accessToken) {
  //         this.authService.setActiveAccount();
  //         return; // All good
  //       }
  //     } catch (error) {
  //       console.warn('Silent token acquisition failed:', error);
  
  //       if (error instanceof InteractionRequiredAuthError) {
  //         console.log('No session found. Starting login...');
  //         this.authService.login(); // 🔥 Trigger interactive login
  //         return;
  //       }
  //     }
  //   } else {
  //     console.log('No active account found. Starting login...');
  //     this.authService.login(); // 🔥 Trigger login if no account is active
  //   }
  
  //   // Save redirect URL if needed
  //   const currentUrl = this.router.url;
  //   localStorage.setItem('redirectUrl', currentUrl);
  // }
  
  
  
  
  
  
  

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
