import { Component, ElementRef, EventEmitter, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private renderer: Renderer2) { }

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
  logout() {
    // Clear session or token
    localStorage.clear();
    sessionStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }

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
  hoveredMenuLabel: string | null = null; // add this new property at top with others

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
}
