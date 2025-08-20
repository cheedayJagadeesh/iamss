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
isSidebarClosed = false;
hoveredMenu: string = '';
openDropdown: string | null = null;
userRole: string | null = null;
  allowedPages: string[] = [];
  userInfoSubscription: Subscription;
  userInfoInitialized = false;
  isLoading = true;

  // Sidebar + submenu states
  //isSidebarClosed = false;
  openMenu: string | null = null;
  msalService: any;


  
  constructor(public authService: AuthService, private router: Router) {

    this.userInfoSubscription = this.authService.userInfo$.subscribe(userInfo => {
      if (!userInfo || !userInfo.email ) return;
    
      this.userRole = userInfo.roleName || 'User';
      this.isLoading = false;
    
      // Store role for redirect tracking
      const lastRole = localStorage.getItem('userRole');
      if (lastRole !== this.userRole) {
        localStorage.setItem('userRole', this.userRole);
       
        if (this.userRole === 'SuperAdmin' || this.userRole === 'Admin') {
          if (this.router.url === '/' || this.router.url === '/registration') {
            this.router.navigate(['/home']);
          }
        } else {
          if (this.router.url !== '/registration') {
            this.router.navigate(['/registration']);
          }
        }
       
       
        // if ((this.userRole === 'SuperAdmin' || this.userRole === 'Admin') && this.router.url !== '/home') {
        //   this.router.navigate(['/home']);
        // } else if ( this.userRole === 'User' && this.router.url !== '/registration') {
        //   this.router.navigate(['/registration']);
        // }
      }
    
      // Set allowed pages
      if (typeof userInfo.pageName === 'string') {
        this.allowedPages = userInfo.pageName.split(',').map(p => p.trim());
      } else if (Array.isArray(userInfo.pageName)) {
        this.allowedPages = userInfo.pageName;
      } else {
        this.allowedPages = [];
      }
      const currentPage = this.router.url.replace('/', '').toLowerCase();
      if (
        !this.canAccess(currentPage) &&
        this.userRole !== 'SuperAdmin' &&
        this.userRole !== 'Admin'
      ) {
        this.router.navigate(['/registration']);
      }
    
     
    
      this.userInfoInitialized = true;
    });
    
  
  }
  
 
  toggleSidebar() {
  this.isSidebarClosed = !this.isSidebarClosed;
}

toggleDropdown(menu: string) {
  this.openDropdown = this.openDropdown === menu ? null : menu;
}

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

}
