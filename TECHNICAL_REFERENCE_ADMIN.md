# 🔧 Technical Reference - Admin User Implementation

## Modified Files Details

### File 1: `leftmenu.component.html`

**Location**: `src/app/IELC/leftmenu/leftmenu.component.html`  
**Line**: 257  
**Change Type**: HTML Attribute Addition

```html
<!-- BEFORE (Line 257-260) -->
<div 
  class="dropdown-item"
  (click)="goToProfile($event)">
  👤 Profile
</div>

<!-- AFTER (Line 257-263) -->
<!-- Profile - Only for Admin & SuperAdmin -->
<div 
  class="dropdown-item"
  *ngIf="isAdminOrSuper()"              ← NEW ATTRIBUTE
  (click)="goToProfile($event)">
  👤 Profile
</div>
```

**What It Does**:
- Adds Angular structural directive `*ngIf`
- Calls `isAdminOrSuper()` method
- Only renders Profile div if method returns true
- Hides Profile completely for non-admin users

---

### File 2: `leftmenu.component.ts`

**Location**: `src/app/IELC/leftmenu/leftmenu.component.ts`  
**Line**: 303-316  
**Change Type**: Method Documentation

```typescript
/* BEFORE (Line 303-316) */
canAccess(module: string): boolean {

  const normalized = module.replace(/\s+/g,'').toLowerCase();
  const role = (this.userRole || '').toLowerCase();

   // SuperAdmin → all
  if (role === 'superadmin') return true;

  // Always visible
  if (normalized === 'home' || normalized === 'registration' || normalized === 'profile') {
    return true;
  }

  return this.allowedPages.includes(normalized);
}

/* AFTER (Line 303-316) */
canAccess(module: string): boolean {

  const normalized = module.replace(/\s+/g,'').toLowerCase();
  const role = (this.userRole || '').toLowerCase();

  // SuperAdmin → sees everything
  if (role === 'superadmin') return true;

  // Always visible to all roles
  if (normalized === 'home' || normalized === 'registration' || normalized === 'profile') {
    return true;
  }

  // Admin & User → see pages from API allowedPages (based on DB records)
  return this.allowedPages.includes(normalized);
}
```

**What Changed**:
- Enhanced comments for clarity
- Line 8: "→ all" → "→ sees everything"
- Line 11: "Always visible" → "Always visible to all roles"
- Line 15: Added detailed explanation of admin/user permission source

---

## Method Reference

### `isAdminOrSuper()` - Already Exists

**Location**: `leftmenu.component.ts` Line 296  
**Purpose**: Check if user is Admin or SuperAdmin

```typescript
isAdminOrSuper(): boolean {
  const role = (this.userRole || '').toLowerCase();
  console.log('User Role:', role);
  return role === 'admin' || role === 'superadmin';
}
```

**Parameters**: None  
**Returns**: `boolean`

| User Role | Return Value |
|-----------|:------------:|
| "admin" | ✅ true |
| "superadmin" | ✅ true |
| "user" | ❌ false |
| "" | ❌ false |
| null | ❌ false |

---

### `canAccess(module: string)` - Core Permission Method

**Location**: `leftmenu.component.ts` Line 303  
**Purpose**: Determine if user can access a specific module

```typescript
canAccess(module: string): boolean {
  const normalized = module.replace(/\s+/g,'').toLowerCase();
  const role = (this.userRole || '').toLowerCase();

  // SuperAdmin → sees everything
  if (role === 'superadmin') return true;

  // Always visible to all roles
  if (normalized === 'home' || normalized === 'registration' || normalized === 'profile') {
    return true;
  }

  // Admin & User → see pages from API allowedPages (based on DB records)
  return this.allowedPages.includes(normalized);
}
```

**Parameters**: 
- `module: string` - Module name (e.g., 'ismstask', 'profile')

**Returns**: `boolean`

**Logic Flow**:
```
isModuleSuperAdmin?
  YES → Return true (always allowed)
  NO  ↓
  
isModuleAlwaysVisible (home/registration/profile)?
  YES → Return true (always allowed)
  NO  ↓
  
isModuleInAllowedPages?
  YES → Return true (user has permission)
  NO  → Return false (user denied)
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   User Logs In                              │
│                  (Email: admin@co.com)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
    API Call 1                    API Call 2
    GetUserRole                 getUserPermissions
        │                             │
        ▼                             ▼
   Returns: "admin"           Returns: ["ismstask", 
                                        "qmstask",
                                        "registered"]
        │                             │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │  Store in localStorage      │
        ├─────────────────────────────┤
        │ userRole: "admin"           │
        │ allowedPages: [...]         │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │   Menu Rendering             │
        │   (Angular Component)        │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │  For Each Menu Item:        │
        │  canAccess(item)?           │
        │  isAdminOrSuper()?          │
        └──────────────┬──────────────┘
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
  Profile        Compliance          Attendance
*ngIf                 YES                YES
isAdmin   isAdminOrSuper()      canAccess('iams')
   ✅                                     │
   YES                            allowed pages?
                                  (ismstask, qmstask)
                                        │
                                      YES → Show
```

---

## State Management

### Local Storage Structure

```javascript
// After Admin Login
localStorage = {
  userName: "Compliance Admin",
  userRole: "admin",
  allowedPages: '["ismstask","qmstask","registered","skillqa"]',
  token: "eyJhbGciOiJIUzI1NiIs...",
  email: "admin@company.com"
}

// Parsed in Component
this.userRole = "admin"  // String
this.allowedPages = ["ismstask", "qmstask", "registered", "skillqa"]  // Array
```

### Component Variables

```typescript
export class LeftmenuComponent {
  // Permission Data
  userRole: string = localStorage.getItem('userRole') || 'User';
  allowedPages: string[] = JSON.parse(
    localStorage.getItem('allowedPages') || '[]'
  );
  
  // Computed from above
  isAdminOrSuper(): boolean {
    return this.userRole?.toLowerCase() === 'admin' || 
           this.userRole?.toLowerCase() === 'superadmin';
  }
  
  // Menu Control
  canAccess(module: string): boolean {
    // ... logic above
  }
}
```

---

## HTML Template Usage

### Profile Menu Item
```html
<div class="user-dropdown" *ngIf="showUserMenu">
  <!-- ONLY SHOWS IF isAdminOrSuper() = true -->
  <div 
    class="dropdown-item"
    *ngIf="isAdminOrSuper()"
    (click)="goToProfile($event)">
    👤 Profile
  </div>

  <!-- ALWAYS SHOWS -->
  <div class="dropdown-item logout" (click)="confirmLogout()">
    🚪 Logout
  </div>
</div>
```

### Other Menu Items
```html
<!-- SHOWS IF canAccess('ismstask') = true -->
<a *ngIf="canAccess('ismstask')" routerLink="/ismstask">
  ISMS Task
</a>

<!-- SHOWS IF canAccess('registered') = true -->
<a *ngIf="canAccess('registered')" routerLink="/registered">
  Enrolled Users
</a>
```

---

## API Integration

### Endpoint 1: Get User Role

**URL**: `/api/role/{email}`  
**Method**: `GET`  
**Called From**: `leftmenu.component.ts` Constructor (Line 144)

```typescript
this.ielc.GetUserRole(email as string).subscribe(role => {
  this.userRole = (role || '').toString();
  localStorage.setItem('userRole', this.userRole);
});
```

**Response Example**:
```
"admin"
or
"superadmin"
or
"user"
```

---

### Endpoint 2: Get User Permissions

**URL**: `/api/permissions/{email}`  
**Method**: `GET`  
**Called From**: `leftmenu.component.ts` Constructor (Line 144)

```typescript
this.ielc.getUserPermissions(email as string).subscribe(permissions => {
  this.allowedPages = permissions
    .map(x => x.pageName?.toLowerCase())
    .filter(Boolean)
    .flatMap(p => p.split(','))
    .map(p => p.trim().replace(/\s+/g,''));
  
  localStorage.setItem('allowedPages', JSON.stringify(this.allowedPages));
});
```

**Response Example**:
```json
[
  { "pageName": "ismstask" },
  { "pageName": "qmstask" },
  { "pageName": "registered" },
  { "pageName": "skillqa" }
]
```

---

## Permission Normalization Process

```
Raw Input: "ISMS Task"
    ↓
Replace spaces: "ISMSTask"
    ↓
Convert to lowercase: "ismstask"
    ↓
Compare with allowedPages: ["ismstask", "qmstask", ...]
    ↓
Result: ✅ Found (access allowed)
```

---

## Testing Code Examples

### Test 1: Check User Role
```typescript
// In browser console
console.log(localStorage.getItem('userRole'))
// Output: "admin"
```

### Test 2: Check Allowed Pages
```typescript
// In browser console
console.log(JSON.parse(localStorage.getItem('allowedPages')))
// Output: ["ismstask", "qmstask", "registered", "skillqa"]
```

### Test 3: Check isAdminOrSuper() Method
```typescript
// Component method (not directly callable from console)
// But you can verify by:
// 1. Check if Profile menu is visible
// 2. Check console logs
// 3. Use browser DevTools to debug component
```

### Test 4: Verify HTML Rendering
```html
<!-- Open DevTools → Elements Tab -->
<!-- Search for: *ngIf="isAdminOrSuper()" -->
<!-- If found, component is using the method -->
```

---

## Edge Cases Handled

### Case 1: Role is null or undefined
```typescript
const role = (this.userRole || '').toLowerCase();
// Converts null/undefined → '' (empty string)
// Results in: false for isAdminOrSuper()
```

### Case 2: allowedPages is empty
```typescript
const allowedPages = JSON.parse(localStorage.getItem('allowedPages') || '[]')
// If localStorage is empty: [] (empty array)
// Results in: false for canAccess() (except always-visible items)
```

### Case 3: Module name has spaces/special chars
```typescript
const normalized = module.replace(/\s+/g,'').toLowerCase();
// "ISMS Task" → "ismstask"
// Handles different input formats
```

### Case 4: Always-visible pages
```typescript
if (normalized === 'home' || normalized === 'registration' || normalized === 'profile') {
  return true;
}
// These pages always accessible regardless of role/permissions
```

---

## Performance Considerations

### localStorage vs API Calls
```
✅ localStorage (FAST):
   - Used for menu rendering (instant)
   - Prevents UI flicker
   - No network latency

🔄 API Calls (MODERATE):
   - Called once on component init
   - Updates localStorage
   - Provides source of truth from backend
```

### String Normalization
```typescript
// Regex replace O(n) - minimal impact
module.replace(/\s+/g,'')           // Remove spaces
module.toLowerCase()                // Convert case

// On menu with ~20 items: <1ms total
// Negligible performance impact
```

---

## Browser Compatibility

| Browser | Support | Notes |
|---------|:-------:|-------|
| Chrome | ✅ | Full support |
| Firefox | ✅ | Full support |
| Safari | ✅ | Full support |
| Edge | ✅ | Full support |
| IE 11 | ⚠️ | May need polyfills |

---

## Security Notes

### Frontend Security
- `*ngIf` hides UI elements but doesn't prevent access
- Profile route should also have backend guard
- localStorage can be manipulated by user

### Backend Security
- Backend MUST verify admin role before serving profile data
- Don't trust only frontend permission checks
- Implement auth guards on all protected routes

### Recommended Backend Implementation
```csharp
[Authorize]
[HttpGet("profile/{userId}")]
public IActionResult GetProfile(int userId)
{
    var userRole = GetUserRole(User.Identity.Name);
    
    // Only allow admin/superadmin
    if (userRole != "Admin" && userRole != "SuperAdmin")
    {
        return Forbid("Only admins can access profiles");
    }
    
    return Ok(GetProfileData(userId));
}
```

---

## Deployment Checklist

- [x] Code changes completed
- [x] Tests performed locally
- [x] Comments updated
- [x] Documentation created
- [ ] Code review passed
- [ ] Database updated
- [ ] Backend route guards added
- [ ] Deployment to staging
- [ ] QA testing passed
- [ ] Deployment to production
- [ ] Monitoring activated

---

**Document Version**: 1.0  
**Last Updated**: April 6, 2026  
**Status**: Technical Reference Complete
