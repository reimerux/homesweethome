# Home Sweet Home - Development Setup Guide

**Last Updated**: May 8, 2026  
**Est. Setup Time**: 15-20 minutes  
**Difficulty**: Intermediate

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Common Development Tasks](#common-development-tasks)
6. [Debugging](#debugging)
7. [Testing](#testing)
8. [Code Style & Conventions](#code-style--conventions)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn)
- **Git**: For version control
- **PostgreSQL**: 12 or higher (local or remote)

### Required Knowledge
- TypeScript basics
- React hooks
- Next.js App Router
- SQL/PostgreSQL fundamentals
- REST API concepts

### Recommended Tools
- **IDE**: Visual Studio Code
- **Extensions**: TypeScript, Prettier, ESLint (VS Code)
- **Database GUI**: pgAdmin or DBeaver (for database inspection)
- **API Client**: Postman or Insomnia (for API testing)

---

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/homesweethome.git
cd homesweethome
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create Environment Files

**Create `.env.local`** at project root:

```env
# Database
POSTGRES_PRISMA_URL=postgresql://user:password@localhost:5432/homesweethome?schema=public
POSTGRES_URL_NON_POOLING=postgresql://user:password@localhost:5432/homesweethome?schema=public

# NextAuth
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Optional: External Services
# SENTRY_DSN=https://...
# ANALYTICS_KEY=...
```

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

**Environments**:
- **Development** (`.env.local`): Local database, debug logging
- **Staging** (`.env.staging`): Remote database, production-like
- **Production** (`.env`): Remote database, security hardened

### 4. Verify Node & npm Versions

```bash
node --version    # Should be 18+
npm --version     # Should be 9+
```

---

## Database Setup

### 1. Install PostgreSQL

**macOS** (via Homebrew):
```bash
brew install postgresql
brew services start postgresql
```

**Windows** (via installer):
- Download from https://www.postgresql.org/download/windows/
- Install with default port 5432
- Remember admin password

**Linux** (Ubuntu):
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

**Connect to PostgreSQL**:
```bash
psql -U postgres
```

**Create database and user**:
```sql
CREATE DATABASE homesweethome;
CREATE USER homeowner WITH PASSWORD 'secure_password_here';
ALTER ROLE homeowner WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE homesweethome TO homeowner;
```

> **Note**: The `password` field in the `User` table is a schema placeholder. Application login uses email address only — password authentication is on the roadmap but not yet implemented.

### 3. Update `.env.local`

Use the credentials you just created:

```env
POSTGRES_PRISMA_URL=postgresql://homeowner:secure_password_here@localhost:5432/homesweethome?schema=public
POSTGRES_URL_NON_POOLING=postgresql://homeowner:secure_password_here@localhost:5432/homesweethome?schema=public
```

### 4. Run Prisma Migrations

```bash
# Apply all pending migrations
npx prisma migrate dev

# Or if migrations don't exist (fresh setup):
npx prisma migrate dev --name init
```

### 5. Seed Initial Data (Optional)

**Method 1: Prisma Seed Script**
```bash
npx prisma db seed
```

**Method 2: CSV Import**
- Place `maintenanceTask.csv` and `room.csv` in project root
- Run application and use admin import feature

**Sample Data Structure**:

`maintenanceTask.csv`:
```
taskName,description,frequency,importance,season
Clean gutters,Remove leaves and debris,QUARTERLY,HIGH,FALL
Replace HVAC filter,Standard 3-month change,QUARTERLY,HIGH,NONE
Check smoke detectors,Test and replace batteries,YEARLY,HIGH,SPRING
```

`room.csv`:
```
name,shortName,notes
Master Bedroom,Master,Upstairs east wing
Kitchen,Kitchen,Main living area
Basement,Basement,Unfinished storage
```

### 6. Verify Database Connection

```bash
npx prisma db execute --stdin

# In stdin, type:
SELECT NOW();

# Should return current timestamp
```

---

## Running the Application

### Development Server

```bash
npm run dev
```

**Output**:
```
> homesweethome@0.5.0 dev
> next dev

  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 1.2s
```

**Access Application**: Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint

# Fix auto-fixable issues:
npm run lint -- --fix
```

---

## Common Development Tasks

### Adding a New API Endpoint

**1. Create API Route File**

Create `app/api/tasks/my-endpoint/route.ts`:

```typescript
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.maintenanceTask.findMany();
    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
```

**2. Test Endpoint**

```bash
curl http://localhost:3000/api/tasks/my-endpoint
```

### Creating a New Page

**1. Create Route Folder**

Create `app/myfeature/page.tsx`:

```typescript
export const dynamic = 'force-dynamic';

export default async function MyFeaturePage() {
  return <div>My Feature Page</div>;
}
```

**2. Add Navigation Link**

Update `app/components/NavBar.tsx` to include link to `/myfeature`

### Adding a New Component

**1. Create Component File**

Create `app/components/MyComponent.tsx`:

```typescript
"use client"
import { useState } from "react";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

**2. Use in Page**

```typescript
import MyComponent from "@/app/components/MyComponent";

export default function Page() {
  return <MyComponent title="Test" />;
}
```

### Updating Database Schema

**1. Modify `prisma/schema.prisma`**

```prisma
model NewTable {
  id Int @id @default(autoincrement())
  name String
  createdAt DateTime @default(now())
}
```

**2. Create Migration**

```bash
npx prisma migrate dev --name add_new_table
```

**3. Prisma Client Regenerated Automatically**

Prisma regenerates the client with new types.

### Adding Form Validation

**1. Create Zod Schema**

```typescript
import { z } from "zod";

export const taskSchema = z.object({
  taskName: z.string().min(1, "Task name required"),
  frequency: z.enum(["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY", "ADHOC"]),
  roomIds: z.array(z.number()).min(1, "At least one room required")
});

export type TaskFormData = z.infer<typeof taskSchema>;
```

**2. Use in Form**

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/schemas";

export default function TaskForm() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(taskSchema)
  });

  const onSubmit = async (data) => {
    await axios.post("/api/tasks", data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* ... */}</form>;
}
```

---

## Debugging

### VS Code Debugger

**1. Create `.vscode/launch.json`**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "protocol": "inspector"
    }
  ]
}
```

**2. Set Breakpoints**

- Click line number to set breakpoint
- Press F5 to start debugging
- Execution pauses at breakpoint

### Browser DevTools

**1. React DevTools Chrome Extension**

- Inspect component hierarchy
- View component props and state
- Time render performance

**2. Network Tab**

- Monitor API requests/responses
- Check response status and body
- Measure request timing

### Console Logging

```typescript
// Server-side (terminal):
console.log("Server log message");

// Client-side (browser console):
console.log("Client log message");

// Conditional logging:
if (process.env.NODE_ENV === 'development') {
  console.log("Debug info");
}
```

### Error Pages

- **Development**: Full error stack trace on `/error` page
- **Production**: Generic error message for security

---

## Testing

### E2E Test Overview

Tests are located in `tests/` and run against a live development server. The test suite uses the real PostgreSQL database configured in `.env.local` — there is no separate mock or in-memory database. Ensure the dev server is running (`npm run dev`) before executing tests.

### Running Playwright Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/Tasks/create.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Run tests in CI (headless, with reporter)
npx playwright test --reporter=html
```

### Writing New Tests

**Create `tests/Features/my-feature.spec.ts`**:

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load my feature page', async ({ page }) => {
    await page.click('text=My Feature');
    await expect(page).toHaveTitle(/My Feature/);
  });

  test('should create new item', async ({ page }) => {
    await page.click('text=New Item');
    await page.fill('input[name="name"]', 'Test Item');
    await page.click('button:has-text("Save")');
    await expect(page).toContainText('Item created');
  });
});
```

### Manual Testing Checklist

- [ ] Can create new task
- [ ] Can schedule task
- [ ] Can mark task complete
- [ ] Can create issue
- [ ] Can resolve issue
- [ ] Can reschedule via calendar drag-drop
- [ ] Can filter by room
- [ ] Dashboard KPIs update correctly
- [ ] Permissions enforced (VIEWER can't create)
- [ ] Mobile responsive (test on small screens)

---

## Code Style & Conventions

### TypeScript

**Always**:
- Use explicit type annotations for function parameters/returns
- Define interfaces for props
- Avoid `any` type (use `unknown` if needed)
- Use `const` by default, `let` if needed

```typescript
// Good
interface TaskCardProps {
  task: MaintenanceTask;
  onComplete: () => void;
}

export default function TaskCard({ task, onComplete }: TaskCardProps) {
  return <div onClick={onComplete}>{task.taskName}</div>;
}

// Avoid
export default function TaskCard(props: any) {
  return <div>{props.task.taskName}</div>;
}
```

### React Components

**Naming**:
- Components use PascalCase (TaskCard, FormField)
- Hooks use camelCase (useForm, useRouter)
- Constants use UPPER_SNAKE_CASE

**Structure**:
```typescript
"use client"  // Add if needs interactivity

// Imports
import { useState } from "react";

// Types
interface Props { /* ... */ }

// Component
export default function MyComponent({ prop }: Props) {
  const [state, setState] = useState();
  
  return <div>{state}</div>;
}
```

### File Organization

```
Feature Name/
├── page.tsx                 # Main route (server component)
├── components/
│   ├── FeatureCard.tsx      # Reusable components
│   ├── FeatureForm.tsx
│   └── FeatureList.tsx
├── api/
│   └── route.ts             # API endpoints
├── columns.tsx              # DataTable columns (if list view)
└── types.ts                 # Feature-specific types
```

### Tailwind CSS

**Utility-First Approach**:
```typescript
// Good
<div className="flex gap-4 bg-blue-50 p-4 rounded-lg">
  <h1 className="text-lg font-semibold">Title</h1>
</div>

// Avoid
<style>{`.container { display: flex; gap: 1rem; }`}</style>
<div className="container">...</div>
```

**Responsive Classes**:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

### API Route Conventions

```typescript
// All responses include status field
export async function GET(req: NextRequest) {
  try {
    const data = await prisma.task.findMany();
    return NextResponse.json(
      { status: "success", data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Troubleshooting

### Common Issues

#### "Cannot find module '@/prisma/client'"
**Solution**: Run `npx prisma generate` to regenerate Prisma Client

#### "POSTGRES_PRISMA_URL not set"
**Solution**: Create `.env.local` file with database URL. Restart dev server.

#### "Error: connect ECONNREFUSED"
**Solution**: PostgreSQL not running. Start with `brew services start postgresql` (macOS)

#### "Port 3000 already in use"
**Solution**: Kill process on port 3000 or use different port:
```bash
npm run dev -- -p 3001
```

#### TypeScript errors in browser
**Solution**: 
- Run `npm run build` to check for real errors
- Errors in browser DevTools may be development-only
- Clear browser cache (hard refresh)

#### Tests failing locally but pass in CI
**Solution**: 
- Update database in test environment
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Performance Troubleshooting

**Slow Initial Page Load**:
1. Check database queries with Prisma `prisma studio`
2. Add `console.time()` to measure sections
3. Review Network tab for large assets

**Slow API Responses**:
1. Add `.include()` to load relations efficiently
2. Check for N+1 query problems
3. Consider caching frequently accessed data

**High Memory Usage**:
1. Check for memory leaks in server components
2. Review large data arrays in state
3. Use pagination for large lists

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server on :3000
npm run build                  # Build for production
npm start                      # Run production build
npm run lint                   # Run ESLint
npm run lint -- --fix          # Fix linting issues

# Database
npx prisma studio             # Open Prisma Studio (GUI)
npx prisma migrate dev        # Create and apply migrations
npx prisma migrate deploy     # Apply migrations (production)
npx prisma db push           # Push schema to database (development)
npx prisma db seed           # Run seed script
npx prisma generate          # Regenerate Prisma Client

# Testing
npx playwright test           # Run all tests
npx playwright test --headed  # Run with browser visible
npx playwright test --debug   # Debug mode

# Utilities
npm list                       # List installed packages
npm outdated                   # Check for package updates
npm audit                      # Check security vulnerabilities
npm update                     # Update all packages
```

---

## Next Steps

After setup:
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand system design
2. Review [DATABASE.md](./DATABASE.md) for data model
3. Check [COMPONENTS.md](./COMPONENTS.md) for component patterns
4. Read feature documentation in [FEATURES.md](./FEATURES.md)
5. Start with small changes (modify existing component, add field to form)

---

**Questions?** Check project README.md or raise an issue on GitHub.

**Next**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment.
