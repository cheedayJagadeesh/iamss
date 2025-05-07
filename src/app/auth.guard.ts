// import { CanActivateFn } from '@angular/router';


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
  //   const allowedRoles = route.data['roles'] as string[];
  //   const userRole = await this.authService.fetchUserDetails();

  //   if (allowedRoles.includes(userRole)) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/registration']);
  //     return false;
  //   }
  // }
  // async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
  //   const allowedRoles = route.data['roles'] as string[];

  //   // Wait for MSAL to fully initialize
  //   await this.authService.ensureMsalInitialized();

  //   // If no active account, redirect to login
  //   if (!this.authService.hasActiveAccount()) {
  //     await this.authService.login(); // or redirect
  //     return false;
  //   }

  //   const userRole = await this.authService.fetchUserDetails();

  //   if (allowedRoles.includes(userRole)) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/registration']);
  //     return false;
  //   }
  // }
  // async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
  //   const allowedPageNames = route.data['pageNames'] as string[];
  
  //   console.log('Allowed page names:', allowedPageNames); // Debug log
  
  //   // Wait for MSAL to fully initialize
  //   await this.authService.ensureMsalInitialized();
  
  //   // If no active account, redirect to login
  //   if (!this.authService.hasActiveAccount()) {
  //     await this.authService.login(); // or redirect
  //     return false;
  //   }
  
  //   // Get the user's page names
  //   const userPageNames = await this.authService.getUserPageNames();
  
  //   console.log('User page names:', userPageNames); // Debug log
  
  //   // Ensure userPageNames is always an array
  //   if (!userPageNames || !Array.isArray(userPageNames)) {
  //     console.error('User page names are not valid:', userPageNames); // Debug log
  //     return false;
  //   }
  
  //   // Check if the user has access to any of the allowed pages
  //   const hasAccess = allowedPageNames.some(page => userPageNames.includes(page));
  
  //   if (hasAccess) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/registration']);
  //     return false;
  //   }
  // }
  
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedPageNames = route.data['pageNames'] as string[] || [];
  
    await this.authService.ensureMsalInitialized();
  
    if (!this.authService.hasActiveAccount()) {
      await this.authService.login();
      return false;
    }
  
    const userRole = await this.authService.fetchUserDetails(); // This also populates userInfoSubject
    const userPageNames = await this.authService.getUserPageNames();
  
    // console.log('User Role:', userRole);
    // console.log('User page names from backend:', userPageNames);
    // console.log('Route allowed pages:', allowedPageNames);
  
    // Add default allowed pages based on role
    let effectiveAllowedPages: string[] = [];
  
    if (userRole === 'SuperAdmin') {
      // SuperAdmin can access everything
      return true;
    } else if (userRole === 'Admin') {
      effectiveAllowedPages = ['home', 'registration', ...userPageNames];
    } else if (userRole === 'User') {
      effectiveAllowedPages = ['registration'];
    }
  
    // Now check access
    const hasAccess = allowedPageNames.some(page => effectiveAllowedPages.includes(page));
  
   
  if (hasAccess) {
    return true;
  } else {
    // Redirect Admins to home, Users to registration
    if (userRole === 'Admin') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/registration']);
    }
    return false;
  }
  }
  
  
}


// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './authservice.service'; // adjust path as needed

// export const authGuard: CanActivateFn = async (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   try {
//     const userInfo = await authService.getUserInfo(); // Get user info asynchronously

//     // Check if the user has the required role
//     if (userInfo?.roleName === 'SuperAdmin' || userInfo?.roleName === 'Admin') {
//       return true; // Authorized access
//     } else {
//       // If the user is not authorized, redirect to a login or restricted page
//       console.log('User is not authorized.');
//       return router.parseUrl('/login'); // Redirect to login page
//     }
//   } catch (error) {
//     console.error('Error fetching user info:', error);
//     // Handle error and redirect to login page
//     return router.parseUrl('/login');
//   }
// };



// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from './authservice.service';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // // Check if the user is authenticated
//   // if (authService.isAuthenticated()) {
//   //   const user = authService.getUserInfo();
//   //   if (user) {
//   //     const path = route.url[0].path.toLowerCase(); // Normalize the path to lowercase

//   //     // SuperAdmin has access to all pages
//   //     if (user.roleName === 'SuperAdmin') {
//   //       return true; // Allow access to all pages
//   //     }

//   //     // Admin has access based on their specific page access
//   //     if (user.roleName === 'Admin') {
//   //       const allowedPages = user.pageName?.split(',').map(p => p.trim().toLowerCase()) || [];
//   //       if (allowedPages.includes(path)) {
//   //         return true;  // Allow access to the pages Admin has access to
//   //       }
//   //     }

//   //     // For normal users, allow only the registration page
//   //     if (user.roleName !== 'SuperAdmin' && user.roleName !== 'Admin') {
//   //       if (path !== 'registration') {
//   //         // Deny access to all pages except registration for normal users
//   //         router.navigate(['/login'], );
//   //         return false;
//   //       }
//   //       return true; // Allow access to registration page
//   //     }
//   //   }
//   // }
//   return new Observable<boolean>((observer) => {
//     authService.userInfo$.subscribe((user) => {
//       if (authService.isAuthenticated() && user) {
//         const path = route.url[0].path.toLowerCase();
  
//         if (user.roleName === 'SuperAdmin') {
        
//           observer.next(true);
//         } else if (user.roleName === 'Admin') {
//           const allowedPages = user.pageName?.split(',').map(p => p.trim().toLowerCase()) || [];
//           observer.next(allowedPages.includes(path));
//         } else {
//           observer.next(path === 'registration');
//         }
//       } else {
//         router.navigate(['/login']);
//         observer.next(false);
//       }
  
//       observer.complete();
//     });
//   });
  

//   // If not authenticated, redirect to the login page
//   router.navigate(['/login'], );
//   return false;  // Block access
// };





 
