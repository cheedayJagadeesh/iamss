import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  return true;
};



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





 
