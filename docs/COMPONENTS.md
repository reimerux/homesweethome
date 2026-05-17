# Home Sweet Home - Component Architecture

**Last Updated**: May 8, 2026  
**Framework**: React 18.3.1 + Next.js App Router  
**Styling**: Tailwind CSS + DaisyUI

---

## Table of Contents
1. [Component Organization](#component-organization)
2. [Data Display Components](#data-display-components)
3. [Badge & Status Components](#badge--status-components)
4. [Form Components](#form-components)
5. [Card Components](#card-components)
6. [Layout Components](#layout-components)
7. [Utility Functions](#utility-functions)
8. [Component Patterns](#component-patterns)
9. [Testing & Performance](#testing--performance)

---

## Component Organization

Components are organized in `/app/components/` by functional category:

```
components/
├── Data Display
│   ├── Data-table.tsx          # Generic sortable/paginated table (TanStack React Table)
│   ├── Select-Data-table.tsx   # Table with row selection and checkboxes
│   ├── IssueGrid.tsx           # Grid view for issues
│
├── Badges & Status
│   ├── Badge_achievement.tsx   # Achievement display badge
│   ├── Badge_Importance.tsx    # Priority/importance badge
│   ├── Badge_Rooms.tsx         # Room tags
│   ├── SeasonBadge.tsx         # Season indicator
│   ├── StatusIndicator.tsx     # Status display (PENDING, COMPLETED, etc.)
│   ├── CalendarDayIndicator.tsx # Calendar event marker
│
├── Forms
│   ├── FormField.tsx           # Reusable form input wrapper
│   ├── FormButtons.tsx         # Standard form action buttons (Save/Cancel)
│   ├── DateCompletionEntry.tsx # Date picker for task completion
│   ├── ImportancePicker.tsx    # Priority selector (dropdown)
│   ├── RoomMultiSelect.tsx     # Multi-select for rooms
│   ├── MultiSelect.tsx         # Generic multi-select component
│
├── Cards
│   ├── TaskCard.tsx            # Task display card (read-only)
│   ├── TaskCardDraggable.tsx   # Draggable task card (calendar)
│   ├── IssueCard.tsx           # Issue display card
│   ├── DimensionCard.tsx       # KPI metric card (dashboard)
│   ├── InventoryEdit.tsx       # Inventory item edit form
│   ├── CommentForm.tsx         # Issue comment/note form
│
├── Layout
│   ├── NavBar.tsx              # Main navigation bar with auth
│   ├── Tabs.tsx                # Tabbed interface
│   ├── ProfileInfo.tsx         # User profile display
│
├── Utilities
│   ├── URfunctions.ts          # Shared utility functions
│   ├── URTypes.tsx             # Shared TypeScript types
│   ├── UploadFile.tsx          # File upload handler
│   ├── DownloadFile.tsx        # File download handler
│   ├── Toast_Award.tsx         # Achievement notification
│   ├── IndeterminateCheckBox.tsx # Partial selection checkbox
│
├── Dashboard Components
│   ├── HouseInfo.tsx           # House information panel
│   ├── Kpis.tsx                # KPI metrics sidebar
│   ├── IssueCards.tsx          # Pending issues collection
│   ├── TaskCards.tsx           # Upcoming tasks collection
│   ├── print/                  # Print view components
│
└── chart/                      # Recharts visualization
    ├── Metrics.tsx             # Metrics visualization
    └── (Other chart components)
```

---

## Data Display Components

### Data-table.tsx
Generic, reusable data table with sorting, filtering, and pagination using TanStack React Table.

**Props**:
```typescript
interface DataTableProps<T> {
  columns: ColumnDef<T>[];           // TanStack column definitions
  data: T[];                          // Array of items to display
  onRowClick?: (row: T) => void;     // Click handler for rows
  pageSize?: number;                 // Items per page (default: 10)
  enableFiltering?: boolean;          // Show search/filter (default: true)
  enableSorting?: boolean;            // Allow column sorting (default: true)
  enablePagination?: boolean;         // Show pagination controls (default: true)
}
```

**Features**:
- Sortable columns (click header to sort)
- Paginated results (20 items per page default)
- Global search/filter across all columns
- Responsive design (horizontal scroll on mobile)
- Column visibility toggle

**Usage**:
```typescript
import { DataTable } from "@/app/components/Data-table";
import { columns } from "@/app/tasks/columns"; // Define columns per feature

export default function TasksPage() {
  const tasks = await fetchTasks();
  return <DataTable columns={columns} data={tasks} />;
}
```

---

### Select-Data-table.tsx
Table variant with row selection (checkboxes) for bulk operations.

**Props**:
```typescript
interface SelectDataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  pageSize?: number;
}
```

**Features**:
- Checkbox column for row selection
- "Select All" header checkbox (with indeterminate state)
- Selection state management
- Callback on selection changes

---

### IssueGrid.tsx
Grid layout for displaying issues as cards rather than table rows.

**Props**:
```typescript
interface IssueGridProps {
  issues: Issue[];
  onIssueClick?: (issue: Issue) => void;
  filterByPriority?: "HIGH" | "MEDIUM" | "LOW";
}
```

**Features**:
- Card-based grid layout
- Priority-based coloring
- Status badges
- Room associations displayed
- Responsive 1-3 column layout

---

## Badge & Status Components

### Badge_Importance.tsx
Visual badge for importance/priority levels.

**Props**:
```typescript
interface BadgeImportanceProps {
  importance: "HIGH" | "MEDIUM" | "LOW";
  size?: "sm" | "md" | "lg";  // default: "md"
}
```

**Renders**:
- `HIGH` → Red badge with exclamation icon
- `MEDIUM` → Orange badge
- `LOW` → Blue badge

---

### Badge_Rooms.tsx
Displays room associations as badge tags.

**Props**:
```typescript
interface BadgeRoomsProps {
  rooms: Room[];
  maxDisplay?: number;  // Show first N, then "+X more"
}
```

**Features**:
- Lists room names as tags
- Overflow handling (e.g., "+3 more")
- Tooltip on hover showing all rooms

---

### StatusIndicator.tsx
Shows current status with color and icon.

**Props**:
```typescript
interface StatusIndicatorProps {
  status: "PENDING" | "COMPLETED" | "SKIPPED" | "CANCELLED";
  size?: "sm" | "md" | "lg";
}
```

**Renders**:
- `PENDING` → Yellow circle
- `COMPLETED` → Green checkmark
- `SKIPPED` → Gray dash
- `CANCELLED` → Red X

---

### CalendarDayIndicator.tsx
Shows visual indicator of scheduled tasks on calendar dates.

**Props**:
```typescript
interface CalendarDayIndicatorProps {
  items: TaskSchedule[];
  day: Date;
  maxIndicators?: number;  // Show dots for multiple tasks
}
```

**Features**:
- Colored dots indicating tasks on date
- Tooltip showing task names on hover
- Different colors by importance level

---

## Form Components

### FormField.tsx
Reusable form input wrapper with label, error display, and styling.

**Props**:
```typescript
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;  // Input element
  helperText?: string;
}
```

**Usage**:
```typescript
<FormField label="Task Name" error={errors.taskName?.message} required>
  <input {...register("taskName")} placeholder="Enter task name" />
</FormField>
```

---

### ImportancePicker.tsx
Dropdown selector for importance/priority levels.

**Props**:
```typescript
interface ImportancePickerProps {
  value: "HIGH" | "MEDIUM" | "LOW";
  onChange: (value: string) => void;
  label?: string;
}
```

**Renders**: DaisyUI dropdown with color-coded options

---

### RoomMultiSelect.tsx
Multi-select component for assigning tasks/issues to multiple rooms.

**Props**:
```typescript
interface RoomMultiSelectProps {
  rooms: Room[];
  selectedRoomIds: number[];
  onChange: (roomIds: number[]) => void;
  maxSelectable?: number;
}
```

**Features**:
- Search/filter rooms by name
- Selected count display
- Checkboxes for multi-selection
- Responsive dropdown menu

---

### FormButtons.tsx
Standard form action buttons (Save, Cancel, Delete).

**Props**:
```typescript
interface FormButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
  loading?: boolean;
  disabled?: boolean;
}
```

**Renders**:
- Save button (primary color, disabled if `loading`)
- Cancel button (secondary)
- Delete button (danger color, optional)

---

## Card Components

### TaskCard.tsx
Displays a task with basic information and quick actions.

**Props**:
```typescript
interface TaskCardProps {
  task: MaintenanceTask;
  schedule?: taskSchedule;
  onEdit?: () => void;
  onDelete?: () => void;
}
```

**Features**:
- Task name and description
- Frequency and importance badges
- Room associations
- Due date if schedule provided
- Edit/delete action buttons

---

### TaskCardDraggable.tsx
Draggable variant for calendar interface.

**Props**:
```typescript
interface TaskCardDraggableProps {
  task: taskSchedule;
  onDragStart: (scheduleId: number) => void;
  color?: string;
  index: number;
}
```

**Features**:
- Full drag-and-drop support
- Visual feedback during drag
- Used by TaskCalendar component

---

### IssueCard.tsx
Displays an issue with priority, status, and room info.

**Props**:
```typescript
interface IssueCardProps {
  issue: Issue;
  onEdit?: () => void;
  onStatusChange?: (status: Status) => void;
}
```

**Features**:
- Priority badge (HIGH/MEDIUM/LOW)
- Status indicator (PENDING/COMPLETED/etc)
- Issue title and description
- Room tags
- Label tags

---

### DimensionCard.tsx
KPI metric card for dashboard (number + label + trend).

**Props**:
```typescript
interface DimensionCardProps {
  title: string;
  value: number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;  // e.g., "+5 this week"
  icon?: React.ReactNode;
}
```

**Usage**: Displays KPI metrics (Overdue Tasks, Tasks Completed, etc.)

---

## Layout Components

### NavBar.tsx
Main navigation bar with logo, menu items, and user menu.

**Props**:
```typescript
interface NavBarProps {
  session: Session;  // NextAuth session from server
}
```

**Features**:
- Logo/app name
- Navigation links (Dashboard, Tasks, Issues, Calendar, etc.)
- Role-based menu visibility
- User profile dropdown
- Sign out button

**Server Component**: Fetches session on server, passes to client

---

### Tabs.tsx
Tabbed interface for switching between views.

**Props**:
```typescript
interface TabsProps {
  tabs: Array<{ label: string; content: React.ReactNode }>;
  defaultTab?: number;
  onTabChange?: (index: number) => void;
}
```

**Features**:
- Smooth tab switching
- Active tab highlight
- Keyboard navigation (arrow keys)
- URL-based tab selection optional

---

### ProfileInfo.tsx
User profile display with avatar and details.

**Props**:
```typescript
interface ProfileInfoProps {
  user: User;
  showFollowers?: boolean;
  showRole?: boolean;
}
```

**Renders**:
- User avatar (initials if no image)
- First and last name
- Email
- Role badge (optional)
- Followers count (optional)

---

## Utility Functions (URfunctions.ts)

### formatDateWithDiff()
Formats date with relative time difference.

```typescript
formatDateWithDiff(date: Date): string
// Output: "May 15, 2024 (in 7 days)" or "May 1, 2024 (3 days ago)"
```

### dateColor()
Returns Tailwind color class based on date urgency.

```typescript
dateColor(dueDate: Date): string
// Returns: "text-green-600" (future), "text-yellow-600" (due soon), "text-red-600" (overdue)
```

### calcDueDate()
Calculates next due date based on frequency.

```typescript
calcDueDate(frequency: Frequency, lastDate?: Date): Date
// frequency: "WEEKLY" → +7 days
// frequency: "MONTHLY" → +1 month
// frequency: "YEARLY" → +1 year
```

### classNames()
Utility for conditional CSS class names (className helper).

```typescript
classNames(
  condition1 && "class-one",
  condition2 && "class-two"
) // → "class-one class-two"
```

### stripPrisma()
Removes Prisma runtime properties from objects for serialization.

```typescript
stripPrisma(object: any): any
// Used before JSON serialization to avoid Prisma Client symbols
```

### metricCalc()
Calculates analytics metrics from data.

```typescript
metricCalc(tasks: taskSchedule[]): {
  scheduled: number,
  overdue: number,
  completed: number
}
```

---

## Component Patterns

### Pattern 1: Server Component with Client Children

```typescript
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const kpis = await fetchKPIs();
  return <Dashboard kpis={kpis} />;  // Pass data as prop
}

// app/dashboard/Dashboard.tsx (Client Component)
"use client"
export default function Dashboard({ kpis }) {
  const [expanded, setExpanded] = useState(false);
  return <div>...</div>;
}
```

**Benefits**:
- Data fetching on server
- Interactivity on client
- No loading states needed (data preloaded)

---

### Pattern 2: Form with React Hook Form + Zod

```typescript
"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  taskName: z.string().min(1, "Task name required"),
  frequency: z.enum(["WEEKLY", "MONTHLY", ...])
});

export default function TaskForm() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    await axios.post("/api/tasks", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Task Name" error={errors.taskName?.message}>
        <input {...register("taskName")} />
      </FormField>
    </form>
  );
}
```

**Benefits**:
- Type-safe form data
- Server-side validation
- Client-side error display
- Minimal re-renders

---

### Pattern 3: Data Table with Columns Definition

```typescript
// app/tasks/columns.tsx
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<MaintenanceTask>[] = [
  {
    accessorKey: "taskName",
    header: "Task Name",
    cell: ({ row }) => <span>{row.getValue("taskName")}</span>
  },
  {
    accessorKey: "importance",
    header: "Priority",
    cell: ({ row }) => <Badge_Importance importance={row.getValue("importance")} />
  }
];

// app/tasks/page.tsx
import { DataTable } from "@/app/components/Data-table";
import { columns } from "./columns";

export default async function TasksPage() {
  const tasks = await fetchTasks();
  return <DataTable columns={columns} data={tasks} />;
}
```

---

## Testing & Performance

### Critical Components for Testing
- `Data-table.tsx` - Sorting, filtering, pagination
- `FormField.tsx` - Validation error display
- `TaskCardDraggable.tsx` - Drag events
- `RoomMultiSelect.tsx` - Selection logic

### Performance Optimization

**Component Memoization**:
```typescript
import { memo } from "react";

const TaskCard = memo(({ task }) => {
  return <div>{task.taskName}</div>;
});

export default TaskCard;
```

**Use when**:
- Component receives same props frequently
- Complex rendering logic
- High rerender rate

**Avoid**:
- Memoizing components that rarely rerender
- Large number of memoized components (can worsen performance)

### Bundle Size
- Data table: ~15KB (TanStack React Table)
- Forms: ~8KB (React Hook Form + Zod)
- Charts: ~25KB (Recharts)
- Total component library: ~150KB (gzipped)

---

## Common Component Usage Examples

### Display Task List
```typescript
import { DataTable } from "@/app/components/Data-table";
import { columns } from "@/app/tasks/columns";

export default async function AllTasksPage() {
  const tasks = await prisma.maintenanceTask.findMany();
  return <DataTable columns={columns} data={tasks} />;
}
```

### Create Task Form
```typescript
"use client"
import { useForm } from "react-hook-form";
import { FormField } from "@/app/components/FormField";
import { ImportancePicker } from "@/app/components/ImportancePicker";
import { RoomMultiSelect } from "@/app/components/RoomMultiSelect";

export default function CreateTaskForm() {
  const { register, control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Task Name" required>
        <input {...register("taskName")} />
      </FormField>
      <ImportancePicker control={control} />
      <RoomMultiSelect control={control} />
      <FormButtons onSave={() => {}} onCancel={() => {}} />
    </form>
  );
}
```

### Display Dashboard KPIs
```typescript
import { DimensionCard } from "@/app/components/DimensionCard";
import { Kpis } from "@/app/dashboard/Kpis";

export default async function DashboardPage() {
  const { scheduled, overdue, completed } = await fetchKpis();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <DimensionCard title="Scheduled Tasks" value={scheduled} />
      <DimensionCard title="Overdue" value={overdue} trend="up" />
      <DimensionCard title="Completed This Month" value={completed} />
    </div>
  );
}
```

---

**Next**: See [FEATURES.md](./FEATURES.md) for feature workflows and user guides.
