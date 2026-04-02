import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../environment.prod';
import { MsalService } from '@azure/msal-angular';
import { environmentConfig } from '../environment.runtime';
import { AuthService } from 'src/app/authservice.service';
import { IelcapiService } from '../ielcapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnDestroy {
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
  // allowedPages: string[] = [];
  // userRole: string = '';
  userInfoSubscription: any;
  userInfoInitialized = false;

  allowedPages: string[] = JSON.parse(
  localStorage.getItem('allowedPages') || '[]'
);


userRole: string = localStorage.getItem('userRole') || 'User';
//userRole: string = '';

  constructor(private router: Router, private renderer: Renderer2, private msalService: MsalService, private authService: AuthService, private ielc: IelcapiService) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.urlAfterRedirects;

        this.isSidebarClosed = false;
        this.sidebarToggled.emit(this.isSidebarClosed);

        this.autoOpenDropdown(this.activeRoute);
      });

//       const account = this.msalService.instance.getActiveAccount();

//       const email =
//           account?.username ||
//           account?.idTokenClaims?.preferred_username ||
//           account?.idTokenClaims?.['email'];


//       this.ielc.getUserPermissions(email as string).subscribe((res:any[]) => {

//   this.allowedPages = res
//     .map(x => x.pageName?.toLowerCase())
//     .filter(Boolean)
//     .flatMap(p => p.split(','))
//     .map(p => p.trim().replace(/\s+/g,'')); 

//   localStorage.setItem('allowedPages', JSON.stringify(this.allowedPages));

//   console.log('Allowed Pages:', this.allowedPages);
// });
//debugger;
//this.userRole = localStorage.getItem('userRole') || 'User';
// FIRST load from localStorage (no flicker)


// this.allowedPages = JSON.parse(
//   localStorage.getItem('allowedPages') || '[]'
// );

// THEN refresh from API
const account = this.msalService.instance.getActiveAccount();

const email =
  account?.username ||
  account?.idTokenClaims?.preferred_username ||
  account?.idTokenClaims?.['email'];

// this.ielc.getUserPermissions(email as string).subscribe((res:any[]) => {

//   this.allowedPages = res
//     .map(x => x.pageName?.toLowerCase())
//     .filter(Boolean)
//     .flatMap(p => p.split(','))
//     .map(p => p.trim().replace(/\s+/g,'')); 

//   localStorage.setItem('allowedPages', JSON.stringify(this.allowedPages));
// });


// this.ielc.GetUserRole(email as string).subscribe(role => {
//   this.userRole = role;
//   console.log('User Role:', this.userRole);
// });


// this.ielc.getUserPermissions(email as string).subscribe((res:any[]) => {

//   this.allowedPages = res
//     .map(x => x.pageName?.toLowerCase())
//     .filter(Boolean)
//     .flatMap(p => p.split(','))
//     .map(p => p.trim().replace(/\s+/g,'')); 
// debugger;
//   // ✅ set role from API
//   //this.userRole = res[0]?.roleName || 'User';
//   //this.userRole = res[0]?.roleName || 'User';
// this.permissionsLoaded = true;

//   // ✅ store role
//   localStorage.setItem('userRole', this.userRole);

//   localStorage.setItem('allowedPages', JSON.stringify(this.allowedPages));

//   console.log('Role:', this.userRole);
// });


// forkJoin({
//   role: this.ielc.GetUserRole(email as string),
//   permissions: this.ielc.getUserPermissions(email as string)
// }).subscribe(({ role, permissions }) => {

//   this.userRole = role;

//   this.allowedPages = permissions
//     .map(x => x.pageName?.toLowerCase())
//     .filter(Boolean)
//     .flatMap(p => p.split(','))
//     .map(p => p.trim().replace(/\s+/g,'')); 



//   localStorage.setItem('allowedPages', JSON.stringify(this.allowedPages));

//   console.log('Role:', this.userRole);
// });

forkJoin({
  role: this.ielc.GetUserRole(email as string),
  permissions: this.ielc.getUserPermissions(email as string)
}).subscribe(({ role, permissions }) => {
debugger;
  this.userRole = role;
  localStorage.setItem('userRole', this.userRole);

  this.allowedPages = permissions
    .map(x => x.pageName?.toLowerCase())
    .filter(Boolean)
    .flatMap(p => p.split(','))
    .map(p => p.trim().replace(/\s+/g,'')); 

  localStorage.setItem('allowedPages', JSON.stringify(this.allowedPages));

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

// canAccess(module: string): boolean {
//   // Always visible
//   if (module === 'home' || module === 'registration') {
//     return true;
//   }

//   // Admin always allowed
//   if (this.userRole === 'SuperAdmin' || this.userRole === 'Admin') {
//     return true;
//   }
//   const normalizedModule = module.replace(/\s+/g, '').toLowerCase();
//   return this.allowedPages.includes(normalizedModule);
// }

// canAccess(module: string): boolean {

//   const normalized = module.replace(/\s+/g,'').toLowerCase();

//   // SuperAdmin → everything
//   if (this.userRole === 'SuperAdmin') {
//     return true;
//   }

//   // Always visible
//   if (normalized === 'home' || normalized === 'registration') {
//     return true;
//   }

//   // Admin + User → only allowed pages
//   return this.allowedPages.includes(normalized);
// }

// canAccess(module: string): boolean {

//   if (!this.permissionsLoaded) return false;

//   const normalized = module.replace(/\s+/g,'').toLowerCase();

//   if (this.userRole === 'SuperAdmin') return true;

//   if (normalized === 'home' || normalized === 'registration') return true;

//   return this.allowedPages.includes(normalized);
// }

// canAccess(module: string): boolean {

//   const normalized = module.replace(/\s+/g,'').toLowerCase();

//   // SuperAdmin
//   if (this.userRole === 'SuperAdmin') return true;

//   // Always visible
//   if (normalized === 'home' || normalized === 'registration') return true;

//   return this.allowedPages.includes(normalized);
// }

canAccess(module: string): boolean {

  // SuperAdmin sees everything
  if (this.userRole?.toLowerCase() === 'superadmin') {
    return true;
  }

  const normalized = module.replace(/\s+/g,'').toLowerCase();

  if (normalized === 'home' || normalized === 'registration') {
    return true;
  }

  return this.allowedPages.includes(normalized);
}


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
  postLogoutRedirectUri: environmentConfig.postLogoutRedirectUri
});
}

  // Unsubscribe to prevent memory leaks
  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
  }

}
