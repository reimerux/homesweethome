# Home Sweet Home - System Architecture

**Last Updated**: May 8, 2026  
**Document Version**: 1.0

---

## Table of Contents
1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Technology Stack Rationale](#technology-stack-rationale)
4. [Authentication & Authorization](#authentication--authorization)
5. [Data Flow Patterns](#data-flow-patterns)
6. [Folder Structure](#folder-structure)
7. [Key Design Decisions](#key-design-decisions)
8. [Infrastructure Considerations](#infrastructure-considerations)

---

## System Overview

Home Sweet Home follows a **client-server architecture** with a modern full-stack JavaScript/TypeScript stack. The application is built as a monolithic Next.js application deployed as a single unit, with all frontend and backend logic co-located.

```
┌─────────────────────────────────────────────────────────────────┐
│                      User Browser                               │
│                  (React 18 SPA Client)                          │
└─────────────────────┬───────────────────────────────────────────┘
                      │ HTTP/HTTPS
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│              Next.js Server (App Router)                        │
│  ┌──────────────────┬──────────────────┬─────────────────────┐  │
│  │ Pages & Routes   │  API Routes      │ Middleware          │  │
│  │ (Server/Client)  │  (REST Handlers) │ (Auth Guard)        │  │
│  └──────────────────┴──────────────────┴─────────────────────┘  │
└─────────────────────┬───────────────────────────────────────────┘
                      │ SQL (Prisma)
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│         PostgreSQL Database (Connection Pooling)                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Tables: Users, Tasks, Issues, Rooms, Schedules, Inventory │ │
│  │ M:M Relations: RoomsOnTasks, RoomsOnIssues, etc.          │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## High-Level Architecture

### Frontend Layer
- **Framework**: React 18.3.1 with Next.js 14.2.5 App Router
- **Rendering Strategy**:
  - **Server Components** (default): Async data fetching directly in components
  - **Client Components** ("use client"): Interactive features, state management
- **State Management**: React Hook Form (forms), local useState (UI state)
- **Styling**: Tailwind CSS with DaisyUI component library
- **HTTP Client**: Axios for API calls from client components

### API Layer
- **Framework**: Next.js API Routes (app/api/*)
- **Architecture**: RESTful endpoints organized by resource
- **Authentication**: NextAuth.js with JWT tokens
- **Request Validation**: Zod schemas for runtime type safety
- **Response Format**: JSON with consistent error handling

### Database Layer
- **Database**: PostgreSQL with connection pooling
- **ORM**: Prisma for type-safe database access
- **Schema Management**: Prisma migrations (app/prisma/migrations/)
- **Data Integrity**: Foreign keys, unique constraints, enums

### Authentication Layer
- **Strategy**: Session-based with JWT tokens (2-day max age)
- **Provider**: Credentials (email-based, no password validation currently)
- **Authorization**: Role-based access control (ADMIN, EDIT, VIEWER)
- **Middleware**: Route-level protection via auth middleware

---

## Technology Stack Rationale

### Core Decisions

| Technology | Why This Choice | Alternatives Considered |
|-----------|-----------------|------------------------|
| **Next.js** | Full-stack framework with App Router, server components, built-in API routes, excellent TypeScript support | Express + React SPA, Remix, Svelte Kit |
| **TypeScript** | Type safety reduces bugs, better IDE support, self-documenting code | JavaScript |
| **React Server Components** | Server-side data fetching avoids N+1 queries, reduces client JS, faster page loads | Traditional SPA with all fetching in useEffect |
| **Tailwind CSS** | Utility-first CSS, rapid prototyping, DaisyUI component library support | Styled Components, Material-UI, Bootstrap |
| **Prisma ORM** | Type-safe queries, migrations, schema visualization, excellent TypeScript support | Sequelize, TypeORM, Drizzle |
| **PostgreSQL** | Relational model matches data structure, ACID compliance, M:M junction tables | MongoDB, SQLite |
| **NextAuth.js** | Built for Next.js, handles JWT/sessions, extensible | Auth0, custom JWT, Passport.js |
| **React Hook Form** | Minimal re-renders, small bundle, integrates with Zod validation | Formik, React Final Form |
| **date-fns** | Small bundle, modular imports, timezone support (date-fns-tz) | moment.js, Day.js |
| **Recharts** | React-first charting, composable components, built for React Server Components | Chart.js, ECharts, D3.js |

---

## Authentication & Authorization

### Authentication Flow

```
User Email
    ↓
NextAuth Credentials Provider
    ↓
Query User from Database
    ↓
Generate JWT Token (2-day expiry)
    ↓
Set Session in Browser
    ↓
Redirect to Dashboard
```

**Current Implementation**:
- Email-only authentication (no password validation)
- All users must exist in database before login
- Session stored as JWT in browser cookies
- Server-side session validation on protected routes

### Authorization Model

**Role Hierarchy**:
- **ADMIN**: Full system access including user/room management
- **EDIT**: Create, read, update records but no admin functions
- **VIEWER**: Read-only access to all data

**Enforcement Points**:
1. **Middleware** (`middleware.js`): Route-level access control
   - Blocks non-ADMIN from `/admin/*` routes
   - Blocks VIEWER from `/edit` or `/new` routes
2. **API Routes**: Role checks in individual endpoints
3. **UI Components**: Hide/show features based on `session.user.role`

**Protected Routes**:
```
✅ ADMIN: /dashboard, /tasks, /issues, /calendar, /analytics, /inventory, /byroom, /admin/*, /profile
✅ EDIT:  /dashboard, /tasks, /issues, /calendar, /analytics, /inventory, /byroom, /profile (no /edit or /new for VIEWER)
✅ VIEWER: /dashboard, /tasks, /issues, /calendar, /analytics, /inventory, /byroom (read-only)
❌ NO AUTH: Redirected to /auth/noAuth if role check fails
```

**Session Structure**:
```typescript
{
  user: {
    id: string,
    email: string,
    name: string (firstName),
    role: "ADMIN" | "EDIT" | "VIEWER"
  },
  expires: datetime
}
```

---

## Data Flow Patterns

### Pattern 1: Server-Side Data Fetching (Preferred)

```
User navigates to page
↓
Next.js calls async page component
↓
Page component calls prisma.resource.findMany()
↓
Data passed to child components as props
↓
Components render with data (no loading state needed)
↓
HTML sent to browser (pre-rendered)
```

**Example**: `/dashboard/page.tsx`
```typescript
export const dynamic = 'force-dynamic'; // Always fetch fresh data

export default async function Dashboard() {
  const tasks = await prisma.taskSchedule.findMany();
  return <DashboardView tasks={tasks} />;
}
```

**Benefits**:
- Single database query (no N+1 problems)
- Data is current and server-rendered
- No client-side state management needed
- Faster initial page load

### Pattern 2: Client-Side API Calls (For Interactivity)

```
User clicks button
↓
React "use client" component handler called
↓
Axios.post/put/delete to /api/resource
↓
API route validates request & updates database
↓
API returns success/error response
↓
Client updates state or revalidates data
↓
UI re-renders with new data
```

**Example**: Creating a task
```typescript
// Client component
"use client"
const handleSubmit = async (formData) => {
  try {
    const response = await axios.post("/api/tasks", formData);
    toast.success("Task created");
    router.refresh(); // Refresh server-side data
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
```

### Pattern 3: URL Search Parameters (Filtering)

```
URL: /byroom?roomSelected=1
↓
Page component reads searchParams
↓
Query database with roomId filter
↓
Render filtered results
```

**Example**:
```typescript
export default async function ByRoomPage({ searchParams }) {
  const roomId = searchParams.roomSelected;
  const tasks = await prisma.maintenanceTask.findMany({
    where: { rooms: { some: { roomId: parseInt(roomId) } } }
  });
  return <TaskList tasks={tasks} />;
}
```

**Benefits**:
- Bookmarkable, shareable URLs
- State persisted in URL
- Deep linking works naturally
- No extra state management

### Pattern 4: Form Handling with React Hook Form

```
User fills form
↓
onChange handlers update form state (not re-rendering whole component)
↓
User clicks Submit
↓
React Hook Form validates against Zod schema
↓
If valid: Call API endpoint
↓
If invalid: Show field-level error messages
```

---

## Folder Structure

### `/app` — Application Code

#### Pages & Layouts
```
app/
├── layout.tsx              # Root layout (NavBar, providers)
├── page.tsx                # Landing page (/routes.ts config)
├── loading.tsx             # Loading skeleton
├── not-found.tsx           # 404 page
├── error/
│   └── page.tsx            # Error boundary page
```

#### Feature Folders
```
app/dashboard/              # Dashboard hub
app/tasks/                  # Task management
  ├── all/page.tsx         # All tasks (DataTable)
  ├── new/page.tsx         # Create new task form
  ├── [id]/page.tsx        # Task detail view
  └── ...edit, ...page

app/issues/                 # Issue tracking
  ├── all/page.tsx         # All issues (IssueGrid)
  ├── pending/page.tsx     # Pending issues only
  ├── new/page.tsx         # Create new issue
  ├── [id]/page.tsx        # Issue detail & edit
  └── ...more detail routes

app/calendar/               # Calendar view (TaskCalendar component)
app/analytics/              # Analytics dashboard (multiple tabs)
app/inventory/              # Inventory management
app/byroom/                 # Room-filtered views (TaskCards, IssueCards)
app/admin/                  # Admin panel
app/auth/                   # Authentication pages
```

#### API Routes (`/app/api/`)
```
api/
├── tasks/                  # Task CRUD
├── issues/                 # Issue CRUD
├── schedules/              # Task schedule operations
├── rooms/                  # Room management
├── users/                  # User management
├── inventory/              # Inventory CRUD
├── achievements/           # Achievement operations
├── kpi/                    # Analytics/KPI calculations
├── dbreset/                # Admin backup/restore
└── auth/                   # NextAuth endpoints
```

#### Components (`/app/components/`)
```
components/
├── Data-table.tsx          # Generic sortable/paginated table (TanStack React Table)
├── Select-Data-table.tsx   # Table with row selection
├── TaskCard.tsx            # Task display
├── TaskCardDraggable.tsx   # Draggable task card
├── IssueCard.tsx           # Issue display
├── Badge_*.tsx             # Status/importance/room badges
├── Form*.tsx               # FormField, FormButtons reusable form parts
├── *Picker.tsx             # ImportancePicker, RoomMultiSelect, MultiSelect
├── DateCompletionEntry.tsx # Date picker component
├── CalendarDayIndicator.tsx # Calendar event markers
├── NavBar.tsx              # Main navigation bar
├── ProfileInfo.tsx         # User profile display
├── Tabs.tsx                # Tabbed interface
├── StatusIndicator.tsx     # Status display
├── SeasonBadge.tsx         # Season label
├── URfunctions.ts          # Shared utility functions
├── URTypes.tsx             # Shared TypeScript types
├── UploadFile.tsx          # File upload handler
├── DownloadFile.tsx        # File download handler
└── chart/                  # Recharts components (Kpis, Metrics)
```

### `/prisma` — Database Schema

```
prisma/
├── schema.prisma           # Full data model (entities, relations, enums)
├── client.ts               # Prisma Client initialization with config
├── migrations/             # PostgreSQL migrations (auto-generated)
└── migrations_mysql/       # Legacy MySQL migrations (unused)
```

### `/types` — TypeScript Definitions

```
types/
└── next-auth.d.ts         # Extend NextAuth session types with custom fields (role, id)
```

### Root Configuration Files

```
auth.ts                     # NextAuth configuration (providers, callbacks, session config)
middleware.js               # Route protection middleware
next.config.js              # Next.js config (env, redirects, etc.)
tsconfig.json               # TypeScript compiler options
tailwind.config.ts          # Tailwind CSS theme customization
postcss.config.js           # PostCSS plugins (autoprefixer, tailwind)
package.json                # Dependencies & npm scripts
```

---

## Key Design Decisions

### 1. **Server Components by Default**
- **Decision**: Use async server components for data fetching whenever possible
- **Rationale**: Reduces client JavaScript, avoids N+1 queries, faster TTL
- **Trade-off**: Less real-time interactivity; need "use client" boundaries for interactive features

### 2. **Dynamic Rendering** (`export const dynamic = 'force-dynamic'`)
- **Decision**: Most pages are dynamically rendered (not cached)
- **Rationale**: Users expect fresh data for tasks/issues; maintenance tasks change frequently
- **Impact**: Slightly higher server load but ensures users always see current state

### 3. **JWT Sessions** (2-day max age)
- **Decision**: Stateless JWT tokens instead of server-side session storage
- **Rationale**: Scales better; no session storage needed; works with distributed deployment
- **Trade-off**: Tokens can't be revoked immediately; users stay logged in for 2 days

### 4. **M:M Junction Tables**
- **Decision**: Use explicit junction tables (RoomsOnTasks, RoomsOnIssues) for relationships
- **Rationale**: Enables metadata storage (assignedAt, assignedBy); provides audit trail
- **Example**: `RoomsOnTasks` stores which user assigned task to which room

### 5. **CSV Seeding**
- **Decision**: Support bulk data import via CSV files
- **Rationale**: Easier initial setup with existing home data; non-technical users can populate data
- **Files**: `maintenanceTask.csv`, `room.csv` in project root

### 6. **Timezone Handling** (Europe/London)
- **Decision**: All dates normalized to Europe/London timezone
- **Rationale**: Consistent timezone for calendar/scheduling; prevents confusion with DST
- **Implementation**: Use `date-fns-tz` with `toZonedTime()` and `formatInTimeZone()`

### 7. **Role-Based Access Control (RBAC)**
- **Decision**: Three-tier permission model (ADMIN/EDIT/VIEWER)
- **Rationale**: Multi-user support for households; granular permissions
- **Enforcement**: Middleware + API route checks + UI conditionals

### 8. **Prisma as ORM**
- **Decision**: Use Prisma for all database access
- **Rationale**: Type-safe queries; migrations; excellent TypeScript support; schema-as-code
- **Alternative Considered**: Raw SQL queries (too verbose; type-unsafe)

---

## Infrastructure Considerations

### Database Connection Strategy
```
App → Prisma Client (pooling)
    ↓
Connection Pool (PgBouncer or similar)
    ↓
PostgreSQL
```

**Environment Variables**:
- `POSTGRES_PRISMA_URL`: Connection string with pooling enabled
- `POSTGRES_URL_NON_POOLING`: Direct connection (for migrations)

### Deployment Target
- **Hosting**: Vercel (recommended for Next.js) or self-hosted Node server
- **Database**: PostgreSQL on Neon, AWS RDS, or self-hosted
- **Static Assets**: CDN or local `/public` directory

### Scaling Considerations
- **Horizontal Scaling**: Stateless JWT sessions allow multiple server instances
- **Database Scaling**: Consider read replicas for analytics queries
- **Caching**: Could add Redis for session/real-time data (future enhancement)
- **File Storage**: CSV import/export currently in-memory; consider S3 for large files

---

## Common Workflows

### Adding a New Feature
1. **Design Database Schema** → Update `prisma/schema.prisma`
2. **Run Migration** → `npx prisma migrate dev --name feature_name`
3. **Create API Route** → `app/api/feature/route.ts`
4. **Create Page/Component** → `app/feature/page.tsx` + `app/components/FeatureCard.tsx`
5. **Add Permissions** → Update middleware.js and role checks if needed

### Adding a New Data Entity
1. Add model to `schema.prisma`
2. Define relationships (foreign keys, M:M junctions)
3. Run `npx prisma migrate dev`
4. Create CRUD endpoints in `app/api/entity/route.ts`
5. Create page in `app/entity/` with server component data fetch

### Modifying Authentication Rules
1. Update `auth.ts` callbacks if logic changes
2. Update `middleware.js` for route-level rules
3. Update UI conditionals in components
4. Test role-based access scenarios

---

## Performance Optimization Strategies

1. **Server-Side Rendering**: Async server components render on server, reduce client JS
2. **Query Optimization**: Use Prisma relations judiciously; avoid N+1 queries
3. **Component Memoization**: Wrap heavy components with `React.memo()` for client components
4. **Image Optimization**: Use Next.js Image component for automatic optimization
5. **Code Splitting**: Next.js automatically code-splits at route level
6. **Database Indexing**: Ensure foreign keys and frequently-queried fields are indexed
7. **Lazy Loading**: Implement pagination for large datasets (DataTable already does this)

---

## Security Considerations

1. **Authentication**: JWT tokens expire after 2 days; credentials provider could be enhanced
2. **Authorization**: Always validate `session.user.role` on API routes
3. **Validation**: Use Zod schemas to validate all user input on API routes
4. **SQL Injection**: Prisma parameterized queries prevent SQL injection
5. **CSRF**: NextAuth.js handles CSRF token generation/validation
6. **XSS**: React escapes values by default; be cautious with dangerously set HTML

---

**Next**: See [DATABASE.md](./DATABASE.md) for detailed schema documentation.
