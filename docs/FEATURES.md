# Home Sweet Home - Features & User Guide

**Last Updated**: May 8, 2026  
**Document Type**: User-facing feature documentation

---

## Table of Contents
1. [Task Management](#task-management)
2. [Issue Tracking](#issue-tracking)
3. [Calendar View](#calendar-view)
4. [Room Organization](#room-organization)
5. [Analytics & KPIs](#analytics--kpis)
6. [Inventory Management](#inventory-management)
7. [Achievements](#achievements)
8. [Admin Features](#admin-features)
9. [User Role Permissions](#user-role-permissions)
10. [Common Workflows](#common-workflows)

---

## Task Management

### Overview
Tasks represent periodic maintenance work that needs to happen on a schedule (e.g., "Clean gutters" every quarter). Each task can be assigned to one or more rooms and has a frequency that determines how often it repeats.

### Creating a Task

**How to Access**: 
- Dashboard → Tasks menu → "New Task" button
- Or navigate to `/tasks/new`

**Steps**:
1. Enter task name (required, e.g., "Clean gutters")
2. Add optional description with details
3. Set time estimate in minutes (how long task will take)
4. Select frequency:
   - **WEEKLY** - Every 7 days
   - **MONTHLY** - Every 30-31 days
   - **QUARTERLY** - Every 3 months
   - **YEARLY** - Every 365 days
   - **ADHOC** - One-time only (no repeat)
5. Set importance level:
   - **HIGH** - Urgent, address immediately
   - **MEDIUM** - Normal priority
   - **LOW** - Can be deferred
6. Optional: Select seasonal indicator (WINTER, SPRING, SUMMER, FALL) — used to display a season badge on task cards and filter tasks by the current season
7. Assign to one or more rooms (required)
8. Click "Save Task"

**Field Validation**:
- Task name must not be empty
- At least one room must be selected
- Frequency must be selected
- Task is created and ready to schedule

**Result**: Task is now in system but not yet scheduled. Must be scheduled to appear on calendar.

---

### Scheduling Tasks

**Scheduled vs. Unscheduled**:
- **Unscheduled**: Task exists but no specific due dates
- **Scheduled**: Task has due dates on calendar

**How to Schedule**:

**Option 1: Auto-Schedule**
1. Go to `/tasks/all` or Tasks menu
2. Click "Auto Schedule Unscheduled Tasks"
3. System calculates next due dates based on frequency
4. Tasks now appear on calendar

**Option 2: Manual Schedule**
1. Open task detail page
2. Click "Add Schedule"
3. Enter next due date
4. Click "Create Schedule"

### Viewing Tasks

**All Tasks** (`/tasks/all`):
- Table view with sorting and filtering
- Columns: Task Name, Frequency, Importance, Rooms, Status
- Click task name to view details
- Filter by room or importance using sidebar

**Task Details** (`/tasks/[id]`):
- Full task description
- All scheduled instances
- Completion history
- Edit/delete options

**Dashboard Tasks** (`/dashboard`):
- 5 most urgent upcoming tasks
- Quick access to overdue tasks
- Next task due indicator

---

### Updating Tasks

**Edit Task**:
1. Go to task detail page
2. Click "Edit" button
3. Modify fields
4. Click "Save"

**Available Changes**:
- Name, description, time estimate
- Frequency (automatically recalculates schedules)
- Importance level
- Seasonal indicator
- Room assignments

**Note**: Historical completion records remain unchanged when task is edited.

---

### Completing Tasks

**Quick Complete** (from calendar or list):
1. Click task card
2. Click "Mark Complete"
3. System records completion with current date
4. Task status changes to COMPLETED

**Complete with Notes**:
1. Open task detail page
2. Click "Complete Task"
3. Enter completion notes (optional)
4. Select completion date (defaults to today)
5. Click "Complete"

**Result**: 
- Task schedule updated with completion date
- Entry added to task history
- Achievement points awarded if applicable
- Task status set to COMPLETED

---

### Rescheduling Tasks

**Reschedule via Calendar** (Drag & Drop):
1. Go to `/calendar`
2. Find task in today's schedule (right panel)
3. Drag task card to different date on calendar
4. Task due date updates instantly

**Reschedule via Detail Page**:
1. Open task schedule detail
2. Click "Reschedule"
3. Enter new due date
4. Click "Update"

**Reschedule Skipped Task**:
1. If task marked as SKIPPED, click "Reschedule"
2. Select new due date
3. Task status returns to PENDING

---

## Issue Tracking

### Overview
Issues represent problems or repairs needed in your home (e.g., "Water leak in basement"). Issues have a priority level, status, and can be assigned to one or more rooms.

### Creating an Issue

**How to Access**:
- Dashboard → Issues menu → "New Issue" button
- Or navigate to `/issues/new`

**Steps**:
1. Enter issue title (required, e.g., "Water leak in basement")
2. Add detailed description of the problem
3. Set priority:
   - **HIGH** - Urgent, address immediately
   - **MEDIUM** - Normal priority
   - **LOW** - Can wait, deferred
4. Assign to rooms affected (can select multiple)
5. Optional: Add labels/tags (e.g., "plumbing", "urgent")
6. Click "Create Issue"

**Result**: Issue appears in pending issues list and dashboard.

---

### Viewing Issues

**All Issues** (`/issues/all`):
- Grid view of all issues
- Color-coded by priority (red=HIGH, orange=MEDIUM, blue=LOW)
- Shows status, priority, rooms affected
- Click issue card to view details

**Pending Issues** (`/issues/pending`):
- Only shows PENDING (not yet resolved) issues
- Quick dashboard for unresolved work

**Issue Details** (`/issues/[id]`):
- Full issue description
- Current status and priority
- Rooms affected with assignment details
- Labels/tags
- Comments and notes history
- Completion date if resolved

---

### Resolving Issues

**Quick Resolve**:
1. Go to issue detail page
2. Click "Resolve Issue" button
3. Issue status changes to COMPLETED
4. Completion date recorded

**Resolve with Notes**:
1. Open issue detail
2. Click "Add Note"
3. Enter resolution notes
4. Click "Resolve"

**Result**:
- Issue status set to COMPLETED
- Completion date recorded
- Issue no longer appears in "Pending Issues"
- Achievement points awarded

---

### Issue Status Workflow

```
CREATE ISSUE
    ↓
PENDING (default state)
    ├→ COMPLETED (issue resolved)
    ├→ CANCELLED (issue no longer relevant)
    └→ SKIPPED (issue deferred, not completed)
```

**Status Meanings**:
- **PENDING**: Not yet resolved, active issue
- **COMPLETED**: Issue resolved/fixed
- **CANCELLED**: No longer relevant, closed without action
- **SKIPPED**: Deferred, may be reopened later

---

### Filtering & Searching Issues

**By Status**:
- PENDING (active)
- COMPLETED (resolved)
- CANCELLED (archived)

**By Priority**:
- HIGH only
- MEDIUM and above
- All priorities

**By Room**:
- Filter issues affecting specific room
- View all room issues in `/byroom` page

**By Label**:
- Filter issues with specific tag
- Multiple label filtering supported

---

### Label Management

Labels are short tags that categorise issues (e.g., "plumbing", "electrical", "urgent"). Labels are created and managed via the admin API; there is no dedicated UI page for label CRUD at this time.

**How labels work**:
- Labels are shared across all issues — create a label once, apply it to many issues
- Apply labels when creating or editing an issue (multi-select)
- Filter the issue list by one or more labels

---

## Calendar View

### Overview
Calendar displays all scheduled maintenance tasks in a monthly grid. Provides visual timeline and drag-to-reschedule functionality.

### Navigation

**Accessing Calendar**: Navigate to `/calendar`

**Month Navigation**:
- Click "Today" button to return to current month
- Click "Previous" to go to previous month
- Click "Next" to go to next month
- Current day is highlighted in red

### Viewing Tasks by Date

**Select Date**:
1. Click on any date in the calendar grid
2. Right panel shows all tasks due that day
3. Tasks listed in order of importance

**Visual Indicators**:
- Small dots under dates with tasks
- Color indicates task importance (red=HIGH, orange=MEDIUM, blue=LOW)
- Hover over dot to see task names

### Rescheduling via Drag & Drop

**How to Drag**:
1. Find task in right panel ("Schedule for [Date]")
2. Click and hold on task card
3. Drag to target date in calendar grid
4. Release to drop

**Result**:
- Task's due date instantly updates
- System records "pushed via calendar" in notes
- Task appears in new date's schedule panel
- Visual feedback during drag (highlight target date)

### Task Details on Calendar

**Quick Actions**:
- Click task card to expand details
- See task name, time estimate, importance
- View rooms affected
- Quick mark complete button

---

## Room Organization

### Overview
Rooms are locations within your house where maintenance work is needed. Organize all tasks and issues by room for easier management and tracking.

### Managing Rooms

**Add Room** (Admin only):
1. Go to `/admin/rooms`
2. Click "New Room"
3. Enter room name (e.g., "Master Bedroom")
4. Enter short name for UI display (e.g., "Master")
5. Optional: Add notes about room
6. Click "Create Room"

**Edit Room** (Admin only):
1. Go to `/admin/rooms`
2. Click room name to edit
3. Modify room details
4. Click "Save"

**Delete Room** (Admin only):
1. Go to `/admin/rooms`
2. Click "Delete" button on room
3. Confirm deletion (cannot be undone)

---

### Filtering by Room

**Room Selector** (All pages):
- Use room multi-select dropdown on most pages
- Select one or more rooms
- UI updates to show only tasks/issues in selected rooms
- Selection persists in URL (shareable links)

**By Room View** (`/byroom`):
1. Navigate to `/byroom`
2. Select rooms from dropdown
3. View all tasks for rooms in left panel
4. View all issues for rooms in center panel
5. Room inventory displayed in right panel

**Room Filter on Dashboard**:
- Add room widget to dashboard
- Shows tasks/issues/inventory for selected room
- Updates in real-time when room changed

---

### Room-Based Reporting

**Room Summary**:
- Total tasks in room
- Pending/overdue tasks count
- Recent completion rate
- Inventory items in room

**Room Comparison**:
- Compare maintenance load across rooms
- Identify which rooms need most attention
- Plan maintenance resources

---

## Analytics & KPIs

### Overview
Dashboard provides key performance indicators (KPIs) and trends to monitor home maintenance progress.

### Dashboard Metrics

**Main KPIs** (shown on dashboard):

1. **Scheduled Tasks** - Total tasks with due dates
   - Shows number of tasks on calendar
   - Click to see task list

2. **Overdue Tasks** - Tasks past their due date
   - Red number indicates urgent attention needed
   - Click to see overdue tasks and reschedule

3. **Tasks Completed This Month** - Completed in current month
   - Green number shows progress
   - Trends compared to last month

4. **Open Issues** - Pending issues not yet resolved
   - Shows count of active problems
   - Click to view issue list

5. **Issues Resolved This Month** - Completed in current month
   - Shows issue resolution rate
   - Indicates home health trend

6. **Active Users** - Number of users with recent activity
   - Team activity indicator

### Analytics Page (`/analytics`)

**Tabs Available**:

**Current**: Real-time metrics
- Scheduled tasks this week
- Overdue count
- Completed this period
- Open vs. resolved ratio
- Issue priority breakdown

**Tasks**: Task completion analytics
- Tasks completed by month (line chart)
- Task completion rate (percentage)
- Most frequently completed tasks
- Completion time trends

**Issues**: Issue resolution analytics
- Issues opened vs. resolved (trend)
- Issue resolution time (average days)
- Issues by priority
- Issue creation vs. resolution rate

**History**: Detailed completion records
- All completed tasks (filterable table)
- Completed by user
- Completion date
- Notes
- Time estimates vs. actual time spent

### Performance Indicators

**Completion Rate** = `Tasks Completed / Tasks Due` in period
- High rate (>80%) = Healthy maintenance
- Low rate (<50%) = Falling behind on maintenance

**Average Task Age** = How long until next due date (in days)
- Negative = Overdue
- 0-7 days = Due soon
- 7+ days = Future planning

**Issue Resolution Time** = Average days from creation to completion
- Benchmark: <7 days for urgent issues

---

## Inventory Management

### Overview
Track household items, equipment, and assets with their locations and status.

### Adding Inventory

**How to Access**:
- `/inventory` → "New Item" button
- Or `/inventory/new`

**Steps**:
1. Enter item name (e.g., "HVAC Unit")
2. Select item type/category (e.g., "Heating System")
3. Enter detailed content/description (e.g., "2-ton unit, installed 2015")
4. Assign to rooms (where item is located)
5. Click "Create Item"

**Optional Fields**:
- Purchase date
- Warranty expiration
- Cost/value
- Maintenance schedule

---

### Viewing Inventory

**All Inventory** (`/inventory`):
- Table view of all items
- Sortable by name, type, room
- Search/filter by room or type
- Print button for inventory report

**Room Inventory** (`/byroom`):
- Right panel shows inventory in selected room
- Quick access to room items
- Shows what's located where

**Inventory Detail** (`/inventory/[id]`):
- Full item details
- Rooms where located
- Associated maintenance tasks
- Edit/delete options

---

### Updating Inventory

**Edit Item**:
1. Go to item detail
2. Click "Edit" button
3. Modify details
4. Click "Save"

**Delete Item**:
1. Go to item detail
2. Click "Delete" button
3. Confirm deletion

---

### Inventory Export

**Print Inventory Report**:
1. Go to `/inventory`
2. Click "Print" button
3. Browser print dialog opens
4. Select printer or "Print to PDF"
5. Get inventory checklist for physical reference

---

## Achievements

### Overview
Gamification system that awards achievements for consistent maintenance behavior, encouraging regular home upkeep.

### Achievement Categories

**Streak Achievements**:
- Awarded for consecutive task completions
- Example: "7-Day Streak" for completing task 7 days in a row
- Resets if task is skipped or missed

**Issue Resolution Achievements**:
- Awarded for total issues resolved
- Example: "Issue Solver" for resolving 10 issues
- Cumulative counter, never resets

### Viewing Achievements

**Profile Achievements** (`/profile`):
- View all user's unlocked achievements
- Shows unlock date and description
- Points earned displayed

**Dashboard Achievement Panel**:
- Shows 3 most recent achievements
- Quick streak status
- Next achievement target

**Achievement Notifications**:
- Toast notification when achievement unlocked
- Achievement name and description
- Points earned

---

## Admin Features

### Overview
Admin-only features for system configuration, user management, and database operations. Accessible at `/admin/*`.

### User Management

**View All Users** (`/admin/users`):
- Table of all users
- Email, name, role, registration date
- Active/inactive status

**Create User** (`/admin/users/new`):
- Email (unique, required)
- First and last name
- Role assignment (ADMIN, EDIT, VIEWER)
- User account active by default

**Edit User**:
- Click user to edit
- Change role (e.g., promote VIEWER to EDIT)
- Deactivate account (isActive toggle)
- Delete user

**Role Meanings**:
- **ADMIN**: Full access including admin panel, user management
- **EDIT**: Can create/edit tasks and issues but no admin access
- **VIEWER**: Read-only access to all data

---

### Room Management

**Manage Rooms** (`/admin/rooms`):
- Create new rooms
- Edit room names and notes
- Delete rooms (if no tasks/issues assigned)

---

### Database Operations

**Backup & Restore** (`/admin/backup`):

**Download Backup**:
1. Click "Download Database Backup" button
2. Full database export downloads as JSON/SQL
3. Save file locally as backup

**Restore from Backup**:
1. Click "Upload Backup File"
2. Select previously downloaded backup file
3. System validates backup
4. Click "Confirm Restore"
5. Database restored to backup state

**Note**: Restore is destructive and non-reversible. Always confirm before restoring.

---

### Database Reset

**Full Reset** (Dangerous):
1. Go to `/admin/backup`
2. Click "Reset Database"
3. Confirmation dialog appears
4. Type "I confirm" to proceed
5. All data deleted, system reset to empty state

**Selective Reset**:
1. Choose which tables to delete
2. Example: Delete task history but keep tasks
3. Allows archiving old data while keeping structure

---

## User Role Permissions

### Feature Matrix

| Feature | Admin | Editor | Viewer |
|---------|-------|--------|--------|
| View dashboard | ✅ | ✅ | ✅ |
| View all tasks | ✅ | ✅ | ✅ |
| Create task | ✅ | ✅ | ❌ |
| Edit task | ✅ | ✅ | ❌ |
| Delete task | ✅ | ✅ | ❌ |
| Complete task | ✅ | ✅ | ❌ |
| View issues | ✅ | ✅ | ✅ |
| Create issue | ✅ | ✅ | ❌ |
| Edit issue | ✅ | ✅ | ❌ |
| Resolve issue | ✅ | ✅ | ❌ |
| View calendar | ✅ | ✅ | ✅ |
| Reschedule task | ✅ | ✅ | ❌ |
| View analytics | ✅ | ✅ | ✅ |
| View inventory | ✅ | ✅ | ✅ |
| Edit inventory | ✅ | ✅ | ❌ |
| Manage rooms | ✅ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| Database backup | ✅ | ❌ | ❌ |
| Database restore | ✅ | ❌ | ❌ |
| View admin panel | ✅ | ❌ | ❌ |

---

## Common Workflows

### Workflow 1: Setting Up a New Home

1. **Create Rooms**
   - Go to `/admin/rooms`
   - Create room for each area (Master Bedroom, Kitchen, Bathroom, etc.)

2. **Import/Create Maintenance Tasks**
   - Option A: Upload CSV with standard tasks
   - Option B: Manually create each task via `/tasks/new`

3. **Assign Tasks to Rooms**
   - Each task assigned to relevant rooms
   - Example: "Clean gutters" → Exterior + Roof areas

4. **Auto-Schedule Tasks**
   - All unscheduled tasks scheduled at once
   - System calculates next due dates

5. **Create Users**
   - Admin invites family members via `/admin/users/new`
   - Each user assigned appropriate role

6. **Dashboard Ready**
   - Users see upcoming tasks, issues, KPIs
   - Maintenance can begin

---

### Workflow 2: Tracking a Maintenance Project

1. **Create Issue**
   - Homeowner notices water leak
   - Creates issue in `/issues/new` with HIGH priority

2. **Assign to Room**
   - Issue assigned to "Basement"
   - Tagged with "plumbing" label

3. **Track Progress**
   - Issue appears in Pending Issues list
   - Shows on dashboard as open problem

4. **Schedule Related Task**
   - Admin creates "Check for leaks" task if recurring
   - Associated with Basement room
   - Scheduled quarterly

5. **Resolve Issue**
   - Plumber fixes leak
   - Editor marks issue as COMPLETED
   - Completion date recorded

6. **Review Analytics**
   - Issue appears in "Issues Resolved This Month"
   - Task scheduled for next quarterly check
   - Home health improves

---

### Workflow 3: End-of-Month Review

1. **Check Dashboard**
   - Review KPIs: tasks completed, issues resolved
   - Compare to previous months

2. **Overdue Analysis**
   - Identify any overdue tasks
   - Reschedule or mark as skipped

3. **Generate Report**
   - Analytics page shows completion trends
   - Export data if needed

4. **Achievement Celebration**
   - View unlocked achievements
   - Share progress with family

5. **Plan Next Month**
   - Review upcoming scheduled tasks
   - Adjust priorities if needed

---

**Next**: See [DEVELOPMENT.md](./DEVELOPMENT.md) for setup and development instructions.
