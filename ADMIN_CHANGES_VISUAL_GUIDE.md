# Admin User Changes - Visual Guide

## What Changed?

### 1️⃣ Profile Menu - Now Restricted to Admin & SuperAdmin

#### User Dropdown Menu (Before)
```
┌─────────────────────┐
│ User Menu           │
├─────────────────────┤
│ 👤 Profile ✅       │  ← Available to ALL users
├─────────────────────┤
│ 🚪 Logout           │
└─────────────────────┘
```

#### User Dropdown Menu (After)
```
┌─────────────────────────────────────┐
│ User Menu                           │
├─────────────────────────────────────┤
│ SuperAdmin User:                    │
│ 👤 Profile ✅                       │  ← VISIBLE
├─────────────────────────────────────┤
│ Admin User:                         │
│ 👤 Profile ✅                       │  ← VISIBLE
├─────────────────────────────────────┤
│ Regular User:                       │
│ (No Profile option)                 │
│ 🚪 Logout           ✅              │  ← Only Logout shown
├─────────────────────────────────────┤
```

---

## Code Implementation

### HTML Change
**File**: `leftmenu.component.html`

```html
<!-- BEFORE -->
<div class="dropdown-item" (click)="goToProfile($event)">
  👤 Profile
</div>

<!-- AFTER -->
<div 
  class="dropdown-item"
  *ngIf="isAdminOrSuper()"    ← NEW: Only show for Admin & SuperAdmin
  (click)="goToProfile($event)">
  👤 Profile
</div>
```

### TypeScript Permission Logic
**File**: `leftmenu.component.ts`

```typescript
// Role Check Method (unchanged - already existed)
isAdminOrSuper(): boolean {
  const role = (this.userRole || '').toLowerCase();
  return role === 'admin' || role === 'superadmin';
}

// Permission System (updated with better comments)
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

---

## Permission Decision Tree

```
User Logs In
    │
    ├─→ API: GetUserRole(email)
    │   └─→ Store in localStorage['userRole']
    │
    ├─→ API: getUserPermissions(email)
    │   └─→ Store in localStorage['allowedPages']
    │
    └─→ Render Menu
        │
        ├─→ Is SuperAdmin?
        │   ├─ YES → Show ALL menu items ✅
        │   └─ NO → Check next condition
        │
        ├─→ Is Home/Registration/Profile?
        │   ├─ YES → Always show ✅
        │   └─ NO → Check next condition
        │
        ├─→ For Profile specifically:
        │   ├─ Is Admin/SuperAdmin? 
        │   │   ├─ YES → Show Profile ✅
        │   │   └─ NO → Hide Profile ❌
        │   └─ End
        │
        └─→ For other pages:
            ├─ Is in allowedPages?
            │   ├─ YES → Show item ✅
            │   └─ NO → Hide item ❌
            └─ End
```

---

## Role Capability Matrix

| Capability | SuperAdmin | Admin | User |
|------------|:----------:|:-----:|:----:|
| Access Home | ✅ | ✅ | ✅ |
| Access Registration | ✅ | ✅ | ✅ |
| Access Profile | ✅ | ✅ | ❌ |
| Access DB-assigned Pages | ✅ (All) | ✅ | ✅ |
| See Compliance Menu | ✅ | If assigned | If assigned |
| See Departments Menu | ✅ | If assigned | If assigned |
| See Attendance Menu | ✅ | If assigned | If assigned |
| See User Groups | ✅ | If assigned | If assigned |
| Add New Skill | ✅ | If assigned | If assigned |

---

## Real-World Scenarios

### Scenario 1: Compliance Admin
**Role**: Admin  
**Assigned Pages** (from DB): `ismstask`, `qmstask`, `registered`

```
Menu Visible:
✅ Home
✅ Registered Users
✅ Results (if in allowedPages)
✅ Skill Questions (if in allowedPages)
✅ Compliance
   ├─ ISMS Task ✅
   ├─ QMS Task ✅
   └─ SOC2 Task ❌ (not assigned)
❌ Departments
❌ User Groups
❌ Attendance
✅ Profile (Admin can see this)
```

### Scenario 2: HR Admin
**Role**: Admin  
**Assigned Pages** (from DB): `empattendance`, `adminuser`, `adminreports`

```
Menu Visible:
✅ Home
✅ Registered Users
❌ Skills
❌ Compliance
✅ Attendance
   ├─ Attendance ✅
   ├─ Admin User ✅
   ├─ Admin Reports ✅
   ├─ PM Admin User ❌
   ├─ Project Reports ❌
   └─ Monthly Report ❌
❌ User Groups
✅ Profile (Admin can see this)
```

### Scenario 3: Regular User
**Role**: User  
**Assigned Pages** (from DB): `home`, `registered`

```
Menu Visible:
✅ Home
✅ Registered Users
❌ Skills
❌ Compliance
❌ Departments
❌ Attendance
❌ User Groups
❌ Profile (User CANNOT see this)

User Menu Dropdown:
├─ 🚪 Logout ✅
└─ (No Profile option)
```

---

## Database Configuration Examples

### Example 1: Add Compliance Admin

```sql
-- Step 1: Ensure Admin role exists
INSERT INTO Roles (RoleName) VALUES ('Admin')

-- Step 2: Assign Admin role to user
UPDATE Users SET RoleId = 2 
WHERE Email = 'compliance.admin@company.com'

-- Step 3: Assign specific pages
INSERT INTO UserPermissions (Email, PageName) VALUES
('compliance.admin@company.com', 'ismstask'),
('compliance.admin@company.com', 'qmstask'),
('compliance.admin@company.com', 'ismshistory'),
('compliance.admin@company.com', 'qmshistory'),
('compliance.admin@company.com', 'ismsmails'),
('compliance.admin@company.com', 'qmsmails'),
('compliance.admin@company.com', 'registered'),
('compliance.admin@company.com', 'skillqa')
```

### Example 2: Add Attendance Admin

```sql
-- Step 1: Assign Admin role to user
UPDATE Users SET RoleId = 2 
WHERE Email = 'attendance.admin@company.com'

-- Step 2: Assign attendance-related pages
INSERT INTO UserPermissions (Email, PageName) VALUES
('attendance.admin@company.com', 'iams'),
('attendance.admin@company.com', 'empattendance'),
('attendance.admin@company.com', 'adminuser'),
('attendance.admin@company.com', 'pmadminuser'),
('attendance.admin@company.com', 'adminreports'),
('attendance.admin@company.com', 'projectreports'),
('attendance.admin@company.com', 'monthlyempreport'),
('attendance.admin@company.com', 'configuration')
```

---

## Browser Console Verification

After an Admin user logs in, open DevTools and verify:

```javascript
// In Console, check:
localStorage.getItem('userRole')
// Expected: "admin"

localStorage.getItem('allowedPages')
// Expected: ["home","ismstask","qmstask","registered","skillqa"]

// Check if method works:
// This is only available in the component, but you can verify by:
// 1. Looking at the Network tab
// 2. Check XHR requests to GetUserRole and getUserPermissions endpoints
// 3. Verify the responses contain correct role and pages
```

---

## Debugging Checklist

If Admin users see wrong permissions:

✅ **Check 1**: User has Admin role in database
```sql
SELECT Email, RoleId, Role FROM Users WHERE Email = 'admin@company.com'
```

✅ **Check 2**: Pages are assigned to admin in database
```sql
SELECT Email, PageName FROM UserPermissions WHERE Email = 'admin@company.com'
```

✅ **Check 3**: API endpoints return correct data
- GET `/api/role/{email}` → Returns "admin"
- GET `/api/permissions/{email}` → Returns array of pages

✅ **Check 4**: localStorage is populated after login
- Open DevTools → Application → Local Storage
- Check `userRole` = "admin"
- Check `allowedPages` = ["page1", "page2", ...]

✅ **Check 5**: Component method works
- Test in browser console: `isAdminOrSuper()` (if available)
- Or navigate to profile and check if link appears

---

## Summary of Changes

| What | Where | Before | After |
|------|-------|--------|-------|
| Profile Visibility | HTML | All users | Admin & SuperAdmin only |
| Admin Permission Source | API | Database | Database |
| Profile Access Control | Component | None | `*ngIf="isAdminOrSuper()"` |
| Code Comments | TypeScript | Generic | Specific for Admin role |

