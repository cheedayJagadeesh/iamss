# LeftMenu Component - Permission & Admin User Analysis

## Current State Overview

### 1. **Permission System Architecture**

#### Data Flow:
```
User Logs In → Azure AD (MSAL) 
  ↓
API Call: GetUserRole() → userRole (stored in localStorage)
API Call: getUserPermissions() → allowedPages (stored in localStorage)
  ↓
canAccess() method → checks access for each menu item
```

#### Current Variables:
```typescript
userRole: string = localStorage.getItem('userRole') || 'User';
allowedPages: string[] = JSON.parse(localStorage.getItem('allowedPages') || '[]');
```

#### Data Storage (localStorage):
- `userRole`: User's role (e.g., 'SuperAdmin', 'Admin', 'User')
- `allowedPages`: Array of page names user can access (e.g., ['home', 'ismstask', 'qmstask'])

---

### 2. **Current canAccess() Method Logic**

```typescript
canAccess(module: string): boolean {
  const normalized = module.replace(/\s+/g,'').toLowerCase();
  const role = (this.userRole || '').toLowerCase();

  // SuperAdmin → sees everything
  if (role === 'superadmin') return true;

  // Always visible for all roles
  if (normalized === 'home' || normalized === 'registration' || normalized === 'profile') {
    return true;
  }

  // Admin + User → only allowed pages from API
  return this.allowedPages.includes(normalized);
}
```

#### Current Rules:
✅ **SuperAdmin**: Sees ALL menu items (no restrictions)  
✅ **Admin**: Only sees items in `allowedPages` array  
✅ **User**: Only sees items in `allowedPages` array  
✅ **Everyone**: Can always see Home, Registration, Profile  

---

### 3. **Current Menu Items & Their Permission Keys**

| Menu Item | Permission Key | Current Logic |
|-----------|----------------|---------------|
| Home | `home` | Always visible |
| Add New Skill | `addskill` | Requires `canAccess('addskill')` |
| Enrolled Users | `registered` | Requires `canAccess('registered')` |
| Results | `resultinfo` | Requires `canAccess('resultinfo')` |
| Skill Questions | `skillqa` | Requires `canAccess('skillqa')` |
| **Compliance** | Dropdown | Shows if any sub-item accessible |
| - ISMS Task | `ismstask` | Requires permission |
| - QMS Task | `qmstask` | Requires permission |
| - SOC2 Task | `soc2task` | Requires permission |
| **Departments** | Dropdown | Shows if any sub-item accessible |
| - Admin Dept | `admindept` | Requires permission |
| - HR Dept | `hrdept` | Requires permission |
| - IT Dept | `itdept` | Requires permission |
| User Groups (Admin Users) | `adminusers` | Requires permission |
| **Attendance** (IAMS) | Dropdown | Shows if `canAccess('iams')` |
| Profile | (via user menu) | Always visible to all |
| Logout | (via user menu) | Always visible to all |

---

### 4. **Profile Component Access**

Currently:
- Profile link is in the **user dropdown menu** (top-right corner)
- **Always accessible** to all users via `goToProfile()` method
- No role restriction on the profile route itself

Key line in TypeScript:
```typescript
// Line 65: Skip menu closing for profile route
if (!this.activeRoute.startsWith('/profile')) {
  this.autoOpenDropdown(this.activeRoute);
}

// Line 319: Profile always accessible
if (normalized === 'home' || normalized === 'registration' || normalized === 'profile') {
  return true;
}
```

---

## Proposed Changes for Admin User

### **Option 1: Restrict Profile to Admin Only**

To allow **only Admin & SuperAdmin** to see Profile menu item:

**In HTML** (leftmenu.component.html ~ line 265):
```html
<!-- Current -->
<div class="dropdown-item" (click)="goToProfile($event)">
  👤 Profile
</div>

<!-- Proposed -->
<div 
  class="dropdown-item"
  *ngIf="canAccessProfile()"
  (click)="goToProfile($event)">
  👤 Profile
</div>
```

**In TypeScript** (leftmenu.component.ts - add new method):
```typescript
canAccessProfile(): boolean {
  const role = (this.userRole || '').toLowerCase();
  return role === 'admin' || role === 'superadmin';
}
```

---

### **Option 2: Add Admin-Only Menu Section**

To create a dedicated **Admin Section** with specific pages only:

**Example: New Admin Menu** (to add in HTML after Attendance section):
```html
<!-- Admin Section - Only for Admin & SuperAdmin -->
<div class="dropdown" *ngIf="isAdminOrSuper()" [class.open]="activeDropdown === 'admin'" 
  (mouseenter)="onMouseEnter('admin', $event)" (mouseleave)="onMouseLeave()">
  
  <div class="dropdown-toggle" (click)="toggleDropdown('admin')">
    <i>⚙️</i><span>Admin</span>
    <span class="arrow">{{ activeDropdown === 'admin' ? '▲' : '▼' }}</span>
  </div>
  
  <!-- Expanded view -->
  <div class="dropdown-content" *ngIf="activeDropdown === 'admin' && !isSidebarClosed">
    <a routerLink="/admin-dashboard" [ngClass]="{ 'active-submenu': isSubMenuActive('/admin-dashboard') }">Dashboard</a>
    <a routerLink="/system-settings" [ngClass]="{ 'active-submenu': isSubMenuActive('/system-settings') }">System Settings</a>
    <a routerLink="/user-audit" [ngClass]="{ 'active-submenu': isSubMenuActive('/user-audit') }">User Audit Log</a>
  </div>
  
  <!-- Floating submenu when collapsed -->
  <div class="floating-dropdown" *ngIf="hoveredDropdown === 'admin' && isSidebarClosed"
    [style.top.px]="floatingTop">
    <a routerLink="/admin-dashboard">Dashboard</a>
    <a routerLink="/system-settings">System Settings</a>
    <a routerLink="/user-audit">User Audit Log</a>
  </div>
</div>
```

**In TypeScript** (already exists):
```typescript
isAdminOrSuper(): boolean {
  const role = (this.userRole || '').toLowerCase();
  return role === 'admin' || role === 'superadmin';
}
```

---

### **Option 3: Admin User with Limited Pages**

To allow **Admin role** to see specific pages (instead of just inheriting from allowedPages):

**Enhanced canAccess() method**:
```typescript
canAccess(module: string): boolean {
  const normalized = module.replace(/\s+/g,'').toLowerCase();
  const role = (this.userRole || '').toLowerCase();

  // SuperAdmin → sees everything
  if (role === 'superadmin') return true;

  // Always visible
  if (normalized === 'home' || normalized === 'registration' || normalized === 'profile') {
    return true;
  }

  // Admin role → specific allowed pages
  if (role === 'admin') {
    const adminAllowedPages = [
      'ismstask', 'qmstask', 'soc2task',
      'registered', 'skillqa', 'adminusers'
      // Add other admin-specific pages here
    ];
    return adminAllowedPages.includes(normalized);
  }

  // Regular User → only API-provided pages
  return this.allowedPages.includes(normalized);
}
```

---

## Summary of Current State

| Feature | Current Status |
|---------|----------------|
| SuperAdmin Support | ✅ Yes - sees all menus |
| Admin Support | ✅ Yes - uses allowedPages from API |
| User Role Checking | ✅ Yes - stored in localStorage |
| Profile Accessibility | ✅ Yes - always accessible |
| Admin-only Section | ❌ No - not implemented |
| Admin Profile Restriction | ❌ No - all users can access |
| Hardcoded Admin Pages | ❌ No - uses API-provided allowedPages |

---

## Key Questions Before Changes

1. **Profile Component**: Should it be restricted to Admin & SuperAdmin only, or remain public?

2. **Admin User Pages**: Should Admin users:
   - See all pages (like SuperAdmin)?
   - See specific hardcoded pages?
   - See pages from API-provided allowedPages?

3. **New Admin Menu**: Do you want a new "Admin" dropdown section with admin-specific pages?

4. **Page List**: Which pages should Admin users access? (e.g., admin dashboard, system settings, audit logs, etc.)

5. **Database/API**: Does the backend already support the "Admin" role, or do we need to add it?

---

## Next Steps (Awaiting Your Confirmation)

Please specify:
- ✅ Should Profile be visible only to Admin & SuperAdmin?
- ✅ Do you want an Admin-only menu section?
- ✅ Which pages should Admin users access?
- ✅ Should we hardcode Admin permissions or get them from API?

**I will NOT make any code changes until you confirm the requirements above.**
