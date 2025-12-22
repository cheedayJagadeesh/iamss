import { Component, ElementRef, EventEmitter, HostListener, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../environment.prod';
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent {
@Output() sidebarToggled = new EventEmitter<boolean>();
  isSidebarClosed = false;
  activeDropdown: string | null = null;
  isOpen: { [key: string]: boolean } = {};
  floatingTop: number = 0;
  hoveredDropdown: string | null = null;
  activeRoute: string = ''; // ✅ track active route
  hoveredMenuLabel: string | null = null;
  userDetailsSubject: any;
  userInfoSubject: any;
  constructor(private router: Router, private renderer: Renderer2, private msalService: MsalService) {

    
    // Detect route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.urlAfterRedirects;

        // Auto-expand sidebar when navigating
        this.isSidebarClosed = false;
        this.sidebarToggled.emit(this.isSidebarClosed);

        // Auto-open parent dropdown based on route
        this.autoOpenDropdown(this.activeRoute);
      });
  }
  // Toggles sidebar collapse
  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.sidebarToggled.emit(this.isSidebarClosed);
  }


  // Handles main dropdowns (like Compliance, Registered User, Departments)
  toggleDropdown(menu: string) {
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  // Handles sub-dropdowns (like ISMS, QMS, SOC2)
  toggleSubDropdown(menu: string) {
    this.isOpen[menu] = !this.isOpen[menu];
  }

  // Simulated permission check — replace with your real logic
  canAccess(module: string): boolean {
    return true;
  }

  // Logout function — adjust per your project’s authentication flow
  // logout() {
  //   // Clear session or token
  //   localStorage.clear();
  //   sessionStorage.clear();

  //   // Navigate to login page
  //   this.router.navigate(['/login']);
  // }

  // onMouseEnter(menu: string) {
  //   if (this.isSidebarClosed) {
  //     this.hoveredDropdown = menu;
  //   }
  // }

  onMouseLeave() {
    this.hoveredDropdown = null;
  }
  @ViewChildren('dropdownToggle', { read: ElementRef }) dropdownToggles!: QueryList<ElementRef>;


  onMouseEnter(menu: string, event: MouseEvent) {
    if (this.isSidebarClosed) {
      this.hoveredDropdown = menu;

      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();

      // Adjust top relative to viewport + scroll
      this.floatingTop = rect.top + window.scrollY;
    }
  }
  showFloatingDropdown(event: MouseEvent, menuName: string) {
    this.hoveredDropdown = menuName;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    // Calculate top relative to viewport
    this.floatingTop = rect.top;
  }
  hideFloatingDropdown() {
    this.hoveredDropdown = null;
  }

  showFloatingLabel(event: MouseEvent, label: string) {
    if (this.isSidebarClosed) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.floatingTop = rect.top + window.scrollY;
      this.hoveredMenuLabel = label;
    }
  }
  hideFloatingLabel() {
    this.hoveredMenuLabel = null;
  }
  /** Auto-open dropdowns when landing on specific routes */
  private autoOpenDropdown(route: string) {
    // Compliance (ISMS / QMS / SOC2)
    if (route.startsWith('/ismstask') || route.startsWith('/ismshistory') || route.startsWith('/ismsmails')) {
      this.activeDropdown = 'compliance';
      this.isOpen['isms'] = true;
    } else if (route.startsWith('/qmstask') || route.startsWith('/qmshistory') || route.startsWith('/qmsmails')) {
      this.activeDropdown = 'compliance';
      this.isOpen['qms'] = true;
    } else if (route.startsWith('/soc2task') || route.startsWith('/soc2history') || route.startsWith('/soc2mails')) {
      this.activeDropdown = 'compliance';
      this.isOpen['soc2'] = true;
    }

    // Departments (Admin / HR / IT)
    else if (route.startsWith('/admindept') || route.startsWith('/hrdept') || route.startsWith('/itdept')) {
      this.activeDropdown = 'departments';
    }

    // Attendance-related modules
    else if (
  route.startsWith('/empattendance') ||
  route.startsWith('/adminuser') ||
  route.startsWith('/pmadminuser') ||
  route.startsWith('/adminreports') ||
  route.startsWith('/projectreports') ||
  route.startsWith('/monthlyempreport') ||
  route.startsWith('/configuration')
) {
  this.activeDropdown = 'iams'; // FIXED
}

    // Registered User
    else if (route.startsWith('/registered') || route.startsWith('/resultinfo')) {
      this.activeDropdown = 'registered';
    } else {
      this.activeDropdown = null;
    }
  }

  /** Check if submenu route is active */
  isSubMenuActive(route: string): boolean {
    return this.activeRoute === route;
  }




showUserMenu = false;
showLogoutModal = false;

userName = localStorage.getItem('userName');

toggleUserMenu(event: MouseEvent) {
  event.stopPropagation();
  this.showUserMenu = !this.showUserMenu;
}

goToProfile(event: MouseEvent) {
  event.stopPropagation();
  this.showUserMenu = false;
  this.router.navigate(['/profile']);
}

/* ✅ Clear Cache */
clearCache(event: MouseEvent) {
  event.stopPropagation();

  // Keep login-related data if needed
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');

  localStorage.clear();

  if (userName) localStorage.setItem('userName', userName);
  if (token) localStorage.setItem('token', token);

  alert('Cache cleared successfully!');
  this.showUserMenu = false;
}

/* ✅ Logout modal handling */
openLogoutModal(event: MouseEvent) {
  event.stopPropagation();
  this.showUserMenu = false;
  this.showLogoutModal = true;
}

closeLogoutModal() {
  this.showLogoutModal = false;
}

confirmLogout() {
  localStorage.clear();
  this.showLogoutModal = false;
  this.router.navigate(['/login']);
}

/* Close dropdown when clicking outside */
@HostListener('document:click')
closeDropdown() {
  this.showUserMenu = false;
}

logout(): void {
  // Clear app state
  this.userDetailsSubject.next({ displayName: null, email: null });
  this.userInfoSubject.next({
    email: '',
    roleName: '',
    pageName: []
  });

  // Clear local/session storage
  localStorage.clear();
  sessionStorage.clear();


// 🔥 IMPORTANT: Clear active account explicitly
this.msalService.instance.setActiveAccount(null);

// 🔥 FORCE Azure AD logout (NO popup)
this.msalService.logoutRedirect({
  postLogoutRedirectUri: environment.postLogoutRedirectUri
});
}


}
