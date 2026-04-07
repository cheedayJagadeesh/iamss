# Database Setup - Quick Reference

## SQL Scripts for Admin User Implementation

### 1️⃣ Verify/Create Admin Role
```sql
-- Check if Admin role exists
SELECT * FROM Roles WHERE RoleName = 'Admin'

-- If not exists, create it
INSERT INTO Roles (RoleName, IsActive) VALUES 
('Admin', 1)

-- Verify result
SELECT * FROM Roles
```

### 2️⃣ Create Admin User (Example)
```sql
-- Create admin user in Users table
INSERT INTO Users (Email, UserName, RoleId, IsActive, CreatedDate) VALUES 
('admin@company.com', 'Compliance Admin', 2, 1, GETDATE())

-- Verify
SELECT Email, UserName, RoleId FROM Users WHERE Email = 'admin@company.com'
```

### 3️⃣ Assign Pages to Admin User

#### Option A: Compliance Admin
```sql
INSERT INTO UserPermissions (Email, PageName, AssignedDate) VALUES
('admin@company.com', 'ismstask', GETDATE()),
('admin@company.com', 'qmstask', GETDATE()),
('admin@company.com', 'soc2task', GETDATE()),
('admin@company.com', 'ismshistory', GETDATE()),
('admin@company.com', 'qmshistory', GETDATE()),
('admin@company.com', 'soc2history', GETDATE()),
('admin@company.com', 'ismsmails', GETDATE()),
('admin@company.com', 'qmsmails', GETDATE()),
('admin@company.com', 'soc2mails', GETDATE()),
('admin@company.com', 'registered', GETDATE()),
('admin@company.com', 'skillqa', GETDATE())

-- Verify
SELECT Email, PageName FROM UserPermissions 
WHERE Email = 'admin@company.com'
ORDER BY PageName
```

#### Option B: HR/Attendance Admin
```sql
INSERT INTO UserPermissions (Email, PageName, AssignedDate) VALUES
('hr.admin@company.com', 'iams', GETDATE()),
('hr.admin@company.com', 'empattendance', GETDATE()),
('hr.admin@company.com', 'adminuser', GETDATE()),
('hr.admin@company.com', 'pmadminuser', GETDATE()),
('hr.admin@company.com', 'adminreports', GETDATE()),
('hr.admin@company.com', 'projectreports', GETDATE()),
('hr.admin@company.com', 'monthlyempreport', GETDATE()),
('hr.admin@company.com', 'configuration', GETDATE()),
('hr.admin@company.com', 'registered', GETDATE())

-- Verify
SELECT Email, PageName FROM UserPermissions 
WHERE Email = 'hr.admin@company.com'
ORDER BY PageName
```

#### Option C: IT Admin
```sql
INSERT INTO UserPermissions (Email, PageName, AssignedDate) VALUES
('it.admin@company.com', 'adminusers', GETDATE()),
('it.admin@company.com', 'configuration', GETDATE()),
('it.admin@company.com', 'registered', GETDATE()),
('it.admin@company.com', 'skillqa', GETDATE())

-- Verify
SELECT Email, PageName FROM UserPermissions 
WHERE Email = 'it.admin@company.com'
ORDER BY PageName
```

### 4️⃣ Update Existing User to Admin
```sql
-- Convert regular user to admin
UPDATE Users 
SET RoleId = 2 
WHERE Email = 'existing.user@company.com'

-- Add permissions
INSERT INTO UserPermissions (Email, PageName, AssignedDate) VALUES
('existing.user@company.com', 'ismstask', GETDATE()),
('existing.user@company.com', 'qmstask', GETDATE())
-- ... add more pages as needed

-- Verify
SELECT u.Email, u.UserName, r.RoleName 
FROM Users u 
LEFT JOIN Roles r ON u.RoleId = r.RoleId
WHERE u.Email = 'existing.user@company.com'

SELECT Email, PageName FROM UserPermissions 
WHERE Email = 'existing.user@company.com'
```

### 5️⃣ Remove Admin Role from User
```sql
-- Convert admin back to regular user
UPDATE Users 
SET RoleId = 3  -- Assuming 3 is 'User' role
WHERE Email = 'admin@company.com'

-- Remove all permissions
DELETE FROM UserPermissions 
WHERE Email = 'admin@company.com'

-- Verify
SELECT * FROM Users WHERE Email = 'admin@company.com'
SELECT * FROM UserPermissions WHERE Email = 'admin@company.com'
```

### 6️⃣ View All Admins and Their Pages
```sql
SELECT 
  u.Email,
  u.UserName,
  r.RoleName,
  STRING_AGG(up.PageName, ', ') AS AssignedPages,
  u.IsActive,
  u.CreatedDate
FROM Users u
LEFT JOIN Roles r ON u.RoleId = r.RoleId
LEFT JOIN UserPermissions up ON u.Email = up.Email
WHERE r.RoleName = 'Admin'
GROUP BY u.Email, u.UserName, r.RoleName, u.IsActive, u.CreatedDate
ORDER BY u.Email
```

### 7️⃣ Add New Page to All Current Admins
```sql
-- When adding a new page, grant it to all admins
INSERT INTO UserPermissions (Email, PageName, AssignedDate)
SELECT 
  u.Email,
  'newpagename' AS PageName,
  GETDATE() AS AssignedDate
FROM Users u
LEFT JOIN Roles r ON u.RoleId = r.RoleId
WHERE r.RoleName = 'Admin'
  AND u.IsActive = 1
  AND u.Email NOT IN (
    SELECT Email FROM UserPermissions WHERE PageName = 'newpagename'
  )

-- Verify
SELECT * FROM UserPermissions WHERE PageName = 'newpagename'
```

### 8️⃣ List All Available Pages
```sql
-- Assuming there's a Pages table (if exists)
SELECT DISTINCT PageName 
FROM UserPermissions 
ORDER BY PageName

-- Or manually check available pages:
-- home, registration, profile, addskill, registered, resultinfo, skillqa
-- ismstask, qmstask, soc2task, ismshistory, qmshistory, soc2history
-- ismsmails, qmsmails, soc2mails, admindept, hrdept, itdept
-- adminusers, empattendance, adminuser, pmadminuser, adminreports
-- projectreports, monthlyempreport, configuration, iams
```

---

## Database Schema Reference

### Users Table (Relevant Columns)
```sql
CREATE TABLE Users (
  UserId INT PRIMARY KEY IDENTITY(1,1),
  Email NVARCHAR(255) NOT NULL UNIQUE,
  UserName NVARCHAR(255),
  RoleId INT NOT NULL,
  IsActive BIT DEFAULT 1,
  CreatedDate DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
)
```

### Roles Table
```sql
CREATE TABLE Roles (
  RoleId INT PRIMARY KEY IDENTITY(1,1),
  RoleName NVARCHAR(100) NOT NULL UNIQUE,
  IsActive BIT DEFAULT 1
)

-- Expected roles:
-- 1: SuperAdmin
-- 2: Admin
-- 3: User
```

### UserPermissions Table
```sql
CREATE TABLE UserPermissions (
  PermissionId INT PRIMARY KEY IDENTITY(1,1),
  Email NVARCHAR(255) NOT NULL,
  PageName NVARCHAR(255) NOT NULL,
  AssignedDate DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (Email) REFERENCES Users(Email)
)
```

---

## Step-by-Step Admin Creation Process

### Quick Process (Copy-Paste Ready)
```sql
-- Step 1: Create Admin Role (if needed)
IF NOT EXISTS (SELECT 1 FROM Roles WHERE RoleName = 'Admin')
BEGIN
  INSERT INTO Roles (RoleName) VALUES ('Admin')
END

-- Step 2: Create User
INSERT INTO Users (Email, UserName, RoleId, IsActive) VALUES 
('newadmin@company.com', 'New Admin User', 2, 1)

-- Step 3: Assign Pages
INSERT INTO UserPermissions (Email, PageName) VALUES
('newadmin@company.com', 'ismstask'),
('newadmin@company.com', 'qmstask'),
('newadmin@company.com', 'soc2task'),
('newadmin@company.com', 'registered'),
('newadmin@company.com', 'skillqa')

-- Verify
SELECT 'Users' AS TableName, Email, UserName, RoleId FROM Users WHERE Email = 'newadmin@company.com'
UNION ALL
SELECT 'Permissions', Email, PageName, NULL FROM UserPermissions WHERE Email = 'newadmin@company.com'
```

---

## Testing Verification

### After Admin Created, Run This Query
```sql
-- Full verification
SELECT 
  u.Email,
  u.UserName,
  r.RoleName AS 'Role',
  (SELECT COUNT(*) FROM UserPermissions WHERE Email = u.Email) AS 'Page Count',
  STRING_AGG(up.PageName, ', ') AS 'Pages'
FROM Users u
LEFT JOIN Roles r ON u.RoleId = r.RoleId
LEFT JOIN UserPermissions up ON u.Email = up.Email
WHERE u.Email = 'admin@company.com'
GROUP BY u.Email, u.UserName, r.RoleName
```

---

## Common Issues & Solutions

### Issue: Admin doesn't see pages after creation
**Solution**: 
1. Run: `SELECT * FROM UserPermissions WHERE Email = 'admin@company.com'`
2. If empty, insert permissions using Option A/B/C above
3. Clear browser localStorage and re-login

### Issue: Admin role doesn't exist
**Solution**:
```sql
INSERT INTO Roles (RoleName, IsActive) VALUES ('Admin', 1)
```

### Issue: User not found in database
**Solution**:
1. Check user email spelling
2. Verify user exists: `SELECT * FROM Users WHERE Email = 'admin@company.com'`
3. If not, create using Step 2 above

### Issue: Multiple admins, need to grant page to all
**Solution**: Use script in section 7️⃣ above

---

## Regular Maintenance

### Monthly Admin Audit
```sql
-- Check all active admins
SELECT 
  u.Email, 
  u.UserName, 
  COUNT(up.PageName) AS PageCount,
  MAX(up.AssignedDate) AS LastModified
FROM Users u
LEFT JOIN Roles r ON u.RoleId = r.RoleId
LEFT JOIN UserPermissions up ON u.Email = up.Email
WHERE r.RoleName = 'Admin' AND u.IsActive = 1
GROUP BY u.Email, u.UserName
ORDER BY u.Email
```

### Remove Inactive Admin
```sql
-- Soft delete (mark as inactive)
UPDATE Users 
SET IsActive = 0 
WHERE Email = 'admin@company.com'

-- Hard delete (remove completely - use with caution!)
-- DELETE FROM UserPermissions WHERE Email = 'admin@company.com'
-- DELETE FROM Users WHERE Email = 'admin@company.com'
```

