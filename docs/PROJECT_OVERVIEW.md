# Home Sweet Home - Project Overview

**Last Updated**: May 8, 2026  
**Version**: 0.5.0

---

## Executive Summary

**Home Sweet Home** is a comprehensive home maintenance tracker application designed to help homeowners organize, schedule, and track all household maintenance tasks and issues. The application provides a centralized hub for managing periodic maintenance work across different rooms, with calendar views, analytics dashboards, and gamification features to encourage consistent home upkeep.

### Key Value Propositions
- **Never Miss Maintenance**: Automatic scheduling and reminders for periodic tasks
- **Room-Based Organization**: Filter and organize tasks/issues by specific rooms
- **Visual Timeline**: Calendar view of upcoming maintenance work
- **Performance Insights**: Track completion rates, identify overdue work
- **Multi-User Support**: Invite family members with role-based access control
- **Gamification**: Earn achievements and build streaks to motivate consistency

---

## Core Features

### 1. **Task Management**
- Create, schedule, and track periodic maintenance tasks (weekly, monthly, quarterly, yearly)
- Set task importance levels and time estimates
- View unscheduled tasks and auto-schedule them
- Drag-and-drop calendar interface to reschedule tasks
- Task history tracking with completion notes

**Related Pages**: `/tasks/all`, `/calendar`

### 2. **Issue Tracking**
- Report home issues (bugs, repairs needed) with title, description, priority
- Categorize issues with labels and assign to rooms
- Filter by room or priority
- Mark issues complete with resolution notes
- Issue grid view with status indicators

**Related Pages**: `/issues/all`, `/issues/pending`, `/issues/new`

### 3. **Calendar View**
- Visual monthly calendar of scheduled maintenance tasks
- Select specific dates to see tasks due that day
- Drag-and-drop tasks to reschedule
- Visual indicators showing which days have tasks

**Related Pages**: `/calendar`

### 4. **Analytics & KPIs**
- Dashboard metrics: scheduled tasks, overdue tasks, completed tasks this month
- Issue analytics tab showing open/closed issues by priority
- Task analytics showing completion trends
- History view of past completed work

**Related Pages**: `/dashboard`, `/analytics`

### 5. **Room Organization**
- Organize all tasks and issues by house room
- Multi-select rooms to filter across views
- Dedicated room-based view showing all related tasks/issues
- Room inventory tracking

**Related Pages**: `/byroom`, `/rooms`

### 6. **Inventory Management**
- Track household items and their locations
- Organize inventory by room
- Export/import inventory data
- Print inventory reports

**Related Pages**: `/inventory`, `/inventory/new`, `/inventory/[id]`

### 7. **Achievements System**
- Streak-based achievements (consecutive completions)
- Counter-based achievements (total issues resolved)
- User achievement tracking and notifications
- Visual achievement badges

**Related Pages**: Dashboard (achievement display)

### 8. **Admin Features**
- User management and role assignments
- Room management and configuration
- Task template management
- Database backup and restore functionality
- Selective data reset capabilities

**Related Pages**: `/admin/*`

### 9. **File Import/Export**
- Bulk import tasks from CSV files
- Bulk import rooms from CSV files
- Export data for analysis
- Data seeding functionality

**Related Routes**: API endpoints with file handling

### 10. **Multi-User Support**
- Role-based access control (Admin, Editor, Viewer)
- User profiles with follower counts
- Session-based authentication
- Activity attribution (track who performed actions)

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | React | 18.3.1 |
| **Meta-Framework** | Next.js (App Router) | 14.2.5 |
| **Language** | TypeScript | 5.5.4 |
| **Styling** | Tailwind CSS | 3.4.7 |
| **UI Components** | DaisyUI | 4.12.10 |
| **State & Forms** | React Hook Form | 7.46.1 |
| **Data Tables** | TanStack React Table | 8.20.1 |
| **Authentication** | NextAuth.js (beta) | 5.0.0-beta.20 |
| **Database** | PostgreSQL | (via Prisma) |
| **ORM** | Prisma | 5.22.0 |
| **HTTP Client** | Axios | 1.7.3 |
| **Date Handling** | date-fns, date-fns-tz | 3.6.0, 3.1.3 |
| **Validation** | Zod | 3.22.2 |
| **Charts** | Recharts | 2.12.7 |
| **CSV Processing** | PapaParse | 5.4.1 |
| **Notifications** | React Hot Toast | 2.4.1 |
| **Icons** | React Icons | 5.2.1 |
| **Testing** | Playwright | 1.46.1 |
| **Linting** | ESLint, Next.js ESLint config | 8.57.0, 14.2.5 |

---

## Repository Structure

```
homesweethome/
├── app/                          # Next.js App Router - main application
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout with global styles
│   ├── dashboard/               # Dashboard hub (KPIs, pending tasks/issues)
│   ├── tasks/                   # Task management pages
│   │   ├── all/                 # All tasks list view
│   │   └── [id]/                # Task detail pages
│   ├── issues/                  # Issue tracking pages
│   │   ├── all/                 # All issues grid
│   │   ├── pending/             # Pending issues
│   │   └── [id]/                # Issue detail pages
│   ├── calendar/                # Calendar view with drag-to-reschedule
│   ├── analytics/               # Analytics tabs (current, history, issues, tasks)
│   ├── inventory/               # Inventory management
│   ├── byroom/                  # Room-filtered tasks/issues
│   ├── admin/                   # Admin panel with sidebar
│   │   ├── home/
│   │   ├── rooms/
│   │   ├── tasks/
│   │   ├── users/
│   │   └── backup/
│   ├── profile/                 # User profile page
│   ├── auth/                    # Authentication pages
│   │   ├── signIn/
│   │   ├── signOut/
│   │   └── noAuth/
│   ├── api/                     # REST API routes
│   │   ├── tasks/               # Task endpoints
│   │   ├── issues/              # Issue endpoints
│   │   ├── schedules/           # Task schedule endpoints
│   │   ├── rooms/               # Room endpoints
│   │   ├── users/               # User endpoints
│   │   ├── inventory/           # Inventory endpoints
│   │   ├── achievements/        # Achievement endpoints
│   │   ├── kpi/                 # Analytics/KPI endpoints
│   │   ├── dbreset/             # Admin backup/restore
│   │   └── auth/                # NextAuth endpoints
│   └── components/              # Reusable React components
│       ├── Data-table.tsx       # Generic sortable/paginated table
│       ├── TaskCard.tsx         # Task display card
│       ├── IssueCard.tsx        # Issue display card
│       ├── Badge_*.tsx          # Status/category badges
│       ├── FormField.tsx        # Form input wrapper
│       ├── NavBar.tsx           # Main navigation
│       ├── URfunctions.ts       # Shared utility functions
│       └── chart/               # Chart components (Recharts)
│
├── prisma/                      # Database schema & migrations
│   ├── schema.prisma            # Data model definition
│   ├── client.ts                # Prisma Client initialization
│   ├── migrations/              # Migration files
│   └── migrations_mysql/        # Legacy MySQL migrations
│
├── types/                       # TypeScript type definitions
│   └── next-auth.d.ts          # NextAuth type extensions
│
├── public/                      # Static assets
│   └── *.jpg                    # Hero images
│
├── auth.ts                      # NextAuth configuration & callbacks
├── middleware.js                # Next.js middleware for route protection
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies & scripts
├── playwright.config.ts         # E2E test configuration
│
├── tests/                       # Playwright E2E tests
├── test-results/                # Playwright test reports
│
├── README.md                    # Repository README
└── docs/                        # Project documentation (you are here)
    ├── PROJECT_OVERVIEW.md      # This file
    ├── ARCHITECTURE.md          # System design & data flow
    ├── DATABASE.md              # Data schema & models
    ├── API.md                   # REST API reference
    ├── COMPONENTS.md            # Component architecture
    ├── FEATURES.md              # Feature workflows
    ├── DEVELOPMENT.md           # Setup & development guide
    └── DEPLOYMENT.md            # Deployment procedures
```

---

## Quick Links

**Get Started**
- [Development Setup Guide](./DEVELOPMENT.md) — How to run the project locally
- [Architecture Overview](./ARCHITECTURE.md) — System design and technology decisions

**Reference**
- [Database Schema](./DATABASE.md) — Data models and relationships
- [API Reference](./API.md) — Complete endpoint documentation
- [Component Catalog](./COMPONENTS.md) — UI component inventory and patterns

**Feature Guides**
- [Feature Descriptions](./FEATURES.md) — Detailed workflows for each feature
- [Deployment Guide](./DEPLOYMENT.md) — Production deployment procedures

---

## Key Design Principles

1. **Server-Driven Components**: Use Next.js App Router with async server components for data fetching
2. **Type Safety**: Leverage TypeScript and Zod for compile-time and runtime validation
3. **Role-Based Access**: Implement multi-tier permission system (Admin/Editor/Viewer)
4. **Responsive Design**: Mobile-first UI with Tailwind CSS
5. **Real-Time Data**: Force dynamic rendering on most pages for fresh data
6. **Modular Components**: Reusable, composable React components
7. **CSV-First Data Import**: Support bulk data seeding via CSV files
8. **Timezone Awareness**: Handle user timezones with date-fns-tz (Europe/London)

---

## User Roles & Permissions

| Action | Admin | Editor | Viewer |
|--------|-------|--------|--------|
| View dashboard | ✅ | ✅ | ✅ |
| View tasks/issues | ✅ | ✅ | ✅ |
| Create tasks/issues | ✅ | ✅ | ❌ |
| Edit tasks/issues | ✅ | ✅ | ❌ |
| Mark complete | ✅ | ✅ | ❌ |
| Manage rooms | ✅ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| Admin backup/restore | ✅ | ❌ | ❌ |

---

## Current Status

- **Version**: 0.5.0 (Beta)
- **Primary Features**: Complete (tasks, issues, calendar, analytics)
- **Nice-to-Have Features**: Achievements, inventory tracking
- **Testing**: Playwright E2E tests included
- **Database**: PostgreSQL with connection pooling

### Known Constraints

- **Single house**: The application currently assumes a single house per deployment. Multi-tenancy (managing multiple properties) is not yet supported.
- **Email-only authentication**: Login uses email address only. Password authentication is on the roadmap but not yet implemented.
- **NextAuth beta dependency**: The project uses NextAuth.js 5.0.0-beta.20. This is a pre-release version; behaviour may change when NextAuth v5 reaches stable.

---

## Next Steps & Future Considerations

- Real-time notifications for overdue tasks
- Mobile app (React Native)
- AI-powered task recommendations
- Integration with smart home systems
- Advanced reporting and forecasting
- Expense tracking for maintenance items

---

## Documentation Structure

This documentation is organized to serve different audiences:

- **Project Overview** (this file) — For stakeholders, new team members, system overview
- **Architecture** — For backend developers, infrastructure decisions, data flows
- **Database** — For database admins, data modelers, understanding relationships
- **API** — For frontend developers, mobile developers, API integrations
- **Components** — For UI developers, component reuse, design patterns
- **Features** — For QA, product managers, end-user workflows
- **Development** — For engineers getting started locally
- **Deployment** — For DevOps, system administrators, production setup

---

**Questions?** Check the specific documentation guide for your role or refer to inline code comments.
