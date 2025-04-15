import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy  {

  // constructor(private authService: AuthService) {}
 
  
  // userName: string | null = null;
  // userEmail: string | null = null;
  userRole: string | null = null;
  allowedPages: string[] = [];
  userInfoSubscription: Subscription;
  userInfoInitialized = false;
  isLoading = true;
  
  constructor(public authService: AuthService, private router: Router) {
    // Subscribe to user info and update role and allowed pages
    this.userInfoSubscription = this.authService.userInfo$.subscribe(userInfo => {
      if (userInfo && userInfo.email && userInfo.roleName) {
        this.userInfoInitialized = true;
        this.isLoading=false
        this.userRole = userInfo.roleName;
        if (typeof userInfo.pageName === 'string') {
          this.allowedPages = userInfo.pageName.split(',').map(p => p.trim());
        } else if (Array.isArray(userInfo.pageName)) {
          this.allowedPages = userInfo.pageName;
        } else {
          this.allowedPages = [];
        }
        // this.allowedPages = userInfo.pageName || []; // Assuming pageName is an array already
        const currentPage = this.router.url.replace('/', '').toLowerCase();
        // Redirect unauthorized users
        if (
          !this.canAccess(currentPage) &&
          this.userRole !== 'SuperAdmin' &&
          this.userRole !== 'Admin'
        ) {
          this.router.navigate(['/registration']);
        }
        
      }
    });
  
  }
  
 
  
  
 

  // Method to check if a user has access to a specific page
  // canAccess(page: string): boolean {
  //   if (!this.userInfoInitialized) return true; // ✅ Prevent flicker before role is set

  //   const pageLower = page.toLowerCase();
  //   if (this.userRole === 'SuperAdmin') return true;

  //   if (this.userRole === 'Admin') {
  //     return ['home', 'registration', ...this.allowedPages].includes(pageLower);
  //   }

  //   return this.allowedPages.includes(pageLower);
  // }
  canAccess(page: string): boolean {
    const pageLower = page.toLowerCase();
  
    if (this.userRole === 'SuperAdmin') return true;
  
    if (this.userRole === 'Admin') {
      return ['home', 'registration', ...(this.allowedPages || [])].includes(pageLower);
    }
  
    return (this.allowedPages || []).includes(pageLower);
  }
  
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('userRole');
  }

  // Unsubscribe to prevent memory leaks
  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
  }


  // userRole: string | null = null;
  // allowedPages: string[] = [];
  // userInfoSubscription: Subscription;
  // userInfoInitialized = false;
  // isLoading = true;

  // constructor(public authService: AuthService, private router: Router) {}

  // ngOnInit() {
  //   // Try to retrieve user info from localStorage
  //   const userInfo = localStorage.getItem('userInfo');
  //   if (userInfo) {
  //     const parsedUserInfo = JSON.parse(userInfo);
  //     this.setUserInfo(parsedUserInfo);
  //   }
  //   // Optionally, subscribe to userInfo$ from AuthService if dynamic changes are needed
  //   this.userInfoSubscription = this.authService.userInfo$.subscribe(userInfo => {
  //     if (userInfo) {
  //       this.setUserInfo(userInfo);
  //     }
  //   });
  // }

  // setUserInfo(userInfo: any) {
  //   this.userInfoInitialized = true;
  //   this.userRole = userInfo.roleName;
  //   this.allowedPages = Array.isArray(userInfo.pageName)
  //     ? userInfo.pageName
  //     : userInfo.pageName.split(',').map((p: string) => p.trim());
  //   this.isLoading = false;

  //   // Redirect if not authorized
  //   if (
  //     !this.canAccess('home') &&
  //     this.userRole !== 'SuperAdmin' &&
  //     this.userRole !== 'Admin'
  //   ) {
  //     this.router.navigate(['/registration']);
  //   }
  // }

  // // Check if the user has access to a specific page
  // canAccess(page: string): boolean {
  //   const pageLower = page.toLowerCase();
  //   if (this.userRole === 'SuperAdmin') return true;
  //   if (this.userRole === 'Admin') {
  //     return ['home', 'registration', ...(this.allowedPages || [])].includes(pageLower);
  //   }
  //   return (this.allowedPages || []).includes(pageLower);
  // }

  // logout(): void {
  //   this.authService.logout();
  //   localStorage.removeItem('userInfo'); // Clear user info from storage on logout
  // }

  // ngOnDestroy(): void {
  //   this.userInfoSubscription?.unsubscribe();
  // }
  

  // async ngOnInit() {
  //   try {
  //     await this.msalService.instance.handleRedirectPromise(); // Ensure MSAL is initialized
  //     this.authService.setActiveAccount(); // Ensure an account is set

  //     // this.authService.userName$.subscribe(username => {
  //     //   if (username) {
          
  //     //     this.userName = username;
  //     //   } else {
  //     //     this.authService.fetchUserDetails(); // Fetch from Microsoft Graph API if missing
  //     //   }
  //     // });
  //     this.authService.userDetails$.subscribe(userDetails => {
  //       this.userName = userDetails.displayName;
  //       this.userEmail = userDetails.email;
  //     });

  //     if (!this.authService.isAuthenticated()) {
  //       this.router.navigate(['/login']); // Redirect if not authenticated
  //     }
  //   } catch (error) {
  //     console.error('MSAL initialization error in HomeComponent:', error);
  //   }
  // }

  // async ngOnInit() {
  //   try {
  //     console.log("Initializing MSAL...");
      
  //     // Ensure MSAL is properly initialized before proceeding
  //     await this.msalService.instance.initialize();  
  //     await this.msalService.instance.handleRedirectPromise();
  
  //     console.log("MSAL initialized successfully.");
      
  //     const activeAccount = this.msalService.instance.getActiveAccount();
  //     if (!activeAccount) {
  //       console.warn("No active account found. Redirecting to login...");
  //       this.router.navigate(['/login']);
  //       return;
  //     }
  
  //     this.authService.setActiveAccount();
  
  //     this.authService.userDetails$.subscribe(userDetails => {
  //       this.userName = userDetails?.displayName 
  //       this.userEmail = userDetails?.email 
  //     });
  
  //   } catch (error) {
  //     console.error("MSAL initialization error in HeaderComponent:", error);
  //   }
  // }
  

  // logout(): void {
  //   this.authService.logout();
  // }

}
