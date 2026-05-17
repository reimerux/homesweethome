# Home Sweet Home - REST API Reference

**Last Updated**: May 8, 2026  
**Base URL**: `http://localhost:3000/api` (development) or `https://yourdomain.com/api` (production)  
**Authentication**: Bearer token in `Authorization` header (provided by NextAuth session)

---

## Table of Contents
1. [Authentication](#authentication)
2. [Error Handling](#error-handling)
3. [Tasks API](#tasks-api)
4. [Issues API](#issues-api)
5. [Schedules API](#schedules-api)
6. [Rooms API](#rooms-api)
7. [Users API](#users-api)
8. [Inventory API](#inventory-api)
9. [Achievements API](#achievements-api)
10. [Analytics API](#analytics-api)
11. [Admin API](#admin-api)

---

## Authentication

All protected endpoints require a valid NextAuth session. Sessions are managed via JWT tokens stored in browser cookies automatically. The `middleware.js` file protects routes based on user role.

**Required Session Fields**:
```
session.user.id     - User ID (string)
session.user.role   - Role: "ADMIN", "EDIT", or "VIEWER"
session.user.email  - User email
```

**Example Client Request**:
```typescript
// Axios automatically includes cookies with requests from client components
const response = await axios.get("/api/tasks");
// If user not authenticated, redirected to /auth/noAuth
```

---

## Error Handling

All API responses follow a consistent error format.

**Success Response** (2xx):
```json
{
  "status": "success",
  "data": { /* response data */ }
}
```

**Error Response** (4xx, 5xx):
```json
{
  "status": "error",
  "message": "Descriptive error message",
  "code": "ERROR_CODE"
}
```

**HTTP Status Codes**:
- `200 OK` - Successful GET, PUT
- `201 Created` - Successful POST (resource created)
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error, malformed request
- `401 Unauthorized` - User not authenticated
- `403 Forbidden` - User lacks required role
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server error

---

## Tasks API

### GET /tasks
Fetch all maintenance tasks with optional filtering.

**Endpoint**: `GET /api/tasks`  
**Auth Required**: Yes (any role)  
**Role Required**: VIEWER or higher

**Query Parameters**:
```
roomId (optional): Int - Filter by room ID
frequency (optional): String - Filter by frequency (WEEKLY, MONTHLY, etc.)
importance (optional): String - Filter by importance (HIGH, MEDIUM, LOW)
```

**Success Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "taskId": 1,
      "taskName": "Clean gutters",
      "description": "Remove leaves and debris",
      "timeEstimate": 60,
      "frequency": "QUARTERLY",
      "importance": "HIGH",
      "season": "FALL",
      "rooms": [
        {
          "roomId": 1,
          "name": "Exterior",
          "assignedAt": "2024-01-15T10:00:00Z",
          "assignedBy": "admin@example.com"
        }
      ],
      "taskSchedule": [
        {
          "scheduleId": 5,
          "nextDueDate": "2024-05-15T00:00:00Z",
          "status": "PENDING"
        }
      ]
    }
  ]
}
```

---

### POST /tasks
Create a new maintenance task.

**Endpoint**: `POST /api/tasks`  
**Auth Required**: Yes  
**Role Required**: EDIT or ADMIN

**Request Body**:
```json
{
  "taskName": "Clean gutters",
  "description": "Remove leaves and debris from roof gutters",
  "timeEstimate": 60,
  "frequency": "QUARTERLY",
  "importance": "HIGH",
  "season": "FALL",
  "roomIds": [1, 2, 3]
}
```

**Validation**:
- `taskName` required, string
- `frequency` must be: WEEKLY, MONTHLY, QUARTERLY, YEARLY, ADHOC
- `importance` must be: HIGH, MEDIUM, LOW
- `season` optional, must be: NONE, WINTER, SPRING, SUMMER, FALL
- `roomIds` must be array of valid room IDs

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "taskId": 42,
    "taskName": "Clean gutters",
    "frequency": "QUARTERLY",
    "importance": "HIGH"
  }
}
```

---

### POST /tasks/mass
Bulk create tasks (typically from CSV import).

**Endpoint**: `POST /api/tasks/mass`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Request Body**:
```json
{
  "tasks": [
    {
      "taskName": "Task 1",
      "frequency": "MONTHLY",
      "importance": "MEDIUM",
      "roomIds": [1]
    },
    {
      "taskName": "Task 2",
      "frequency": "YEARLY",
      "importance": "HIGH",
      "roomIds": [1, 2]
    }
  ]
}
```

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "created": 2,
    "taskIds": [42, 43]
  }
}
```

---

### GET /tasks/unscheduled
Fetch tasks without any scheduled instances.

**Endpoint**: `GET /api/tasks/unscheduled`  
**Auth Required**: Yes  
**Role Required**: VIEWER or higher

**Success Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "taskId": 1,
      "taskName": "Clean gutters",
      "frequency": "QUARTERLY",
      "taskSchedule": []
    }
  ]
}
```

---

### PUT /tasks/autoschedule
Create schedule instances for unscheduled tasks based on frequency.

**Endpoint**: `PUT /api/tasks/autoschedule`  
**Auth Required**: Yes  
**Role Required**: EDIT or ADMIN

**Request Body**:
```json
{
  "taskIds": [1, 2, 3]
}
```

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "scheduled": 3,
    "scheduleIds": [101, 102, 103]
  }
}
```

---

## Issues API

### GET /issues
Fetch all home issues with optional filtering.

**Endpoint**: `GET /api/issues`  
**Auth Required**: Yes  
**Role Required**: VIEWER or higher

**Query Parameters**:
```
status (optional): String - PENDING, COMPLETED, CANCELLED, SKIPPED
priority (optional): String - HIGH, MEDIUM, LOW
roomId (optional): Int - Filter by room
```

**Success Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "issueId": 1,
      "title": "Water leak in basement",
      "description": "Dripping from northwest corner",
      "priority": "HIGH",
      "status": "PENDING",
      "createdAt": "2024-05-01T10:00:00Z",
      "rooms": [
        {
          "roomId": 4,
          "name": "Basement"
        }
      ],
      "labels": [
        {
          "labelId": 2,
          "name": "urgent"
        }
      ]
    }
  ]
}
```

---

### POST /issues
Create a new issue.

**Endpoint**: `POST /api/issues`  
**Auth Required**: Yes  
**Role Required**: EDIT or ADMIN

**Request Body**:
```json
{
  "title": "Water leak in basement",
  "description": "Dripping from northwest corner",
  "priority": "HIGH",
  "status": "PENDING",
  "roomIds": [4],
  "labelIds": [2]
}
```

**Validation**:
- `title` required, string (max 255)
- `priority` must be: HIGH, MEDIUM, LOW
- `status` must be: PENDING, COMPLETED, CANCELLED, SKIPPED
- `roomIds`, `labelIds` optional arrays

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "issueId": 42,
    "title": "Water leak in basement",
    "priority": "HIGH",
    "status": "PENDING"
  }
}
```

---

### POST /issues/mass
Bulk create issues.

**Endpoint**: `POST /api/issues/mass`  
**Auth Required**: Yes  
**Role Required**: EDIT or ADMIN

**Request Body** (array of issue objects):
```json
[
  {
    "title": "Water leak in basement",
    "description": "Dripping from northwest corner",
    "priority": "HIGH",
    "status": "PENDING"
  }
]
```

**Success Response** (201):
```json
{
  "count": 1
}
```

---

## Schedules API

### GET /schedules
Fetch all task schedules (scheduled instances).

**Endpoint**: `GET /api/schedules`  
**Auth Required**: Yes  
**Role Required**: VIEWER or higher

**Query Parameters**:
```
status (optional): String - PENDING, COMPLETED, CANCELLED
dateFrom (optional): ISO8601 - Filter by nextDueDate >= dateFrom
dateTo (optional): ISO8601 - Filter by nextDueDate <= dateTo
```

**Success Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "scheduleId": 1,
      "taskId": 5,
      "task": {
        "taskId": 5,
        "taskName": "Clean gutters",
        "frequency": "QUARTERLY"
      },
      "nextDueDate": "2024-05-15T00:00:00Z",
      "lastCompletedDate": "2024-02-15T00:00:00Z",
      "status": "PENDING",
      "notes": null
    }
  ]
}
```

---

### POST /schedules
Create a new schedule instance for a task.

**Endpoint**: `POST /api/schedules`  
**Auth Required**: Yes  
**Role Required**: EDIT or ADMIN

**Request Body**:
```json
{
  "taskId": 5,
  "nextDueDate": "2024-05-15T00:00:00Z",
  "status": "PENDING",
  "notes": "Additional context for this instance"
}
```

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "scheduleId": 42,
    "taskId": 5,
    "nextDueDate": "2024-05-15T00:00:00Z"
  }
}
```

---

> **Note**: Individual schedule update and reschedule endpoints (`PUT /schedules/:id`, `PUT /schedules/:id/push`) are planned but not yet implemented. Rescheduling is currently handled client-side via the calendar drag-and-drop UI calling the autoschedule flow.

---

## Rooms API

### GET /rooms
Fetch all house rooms.

**Endpoint**: `GET /api/rooms`  
**Auth Required**: Yes  
**Role Required**: VIEWER or higher

**Success Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "roomId": 1,
      "name": "Master Bedroom",
      "shortName": "Master",
      "notes": "Upstairs east wing",
      "houseId": 1,
      "taskCount": 5,
      "issueCount": 1
    }
  ]
}
```

---

### POST /rooms
Create a new room.

**Endpoint**: `POST /api/rooms`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Request Body**:
```json
{
  "name": "Master Bedroom",
  "shortName": "Master",
  "notes": "Upstairs east wing",
  "houseId": 1
}
```

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "roomId": 42,
    "name": "Master Bedroom"
  }
}
```

---

### POST /rooms/mass
Bulk create rooms.

**Endpoint**: `POST /api/rooms/mass`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Request Body** (array of room objects):
```json
[
  { "name": "Master Bedroom", "shortName": "Master", "houseId": 1 },
  { "name": "Kitchen", "shortName": "Kitchen", "houseId": 1 }
]
```

**Success Response** (201):
```json
{
  "count": 2
}
```

---

## Users API

### GET /users
Fetch all users.

**Endpoint**: `GET /api/users`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Success Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "email": "homeowner@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "ADMIN",
      "isActive": true,
      "followers": 0,
      "registeredAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /users
Create a new user.

**Endpoint**: `POST /api/users`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Request Body**:
```json
{
  "email": "family@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "EDIT"
}
```

**Validation**:
- `email` required, unique
- `firstName` optional, string
- `lastName` required, string
- `role` must be: ADMIN, EDIT, VIEWER

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "id": 42,
    "email": "family@example.com",
    "role": "EDIT"
  }
}
```

---

## Inventory API

### GET /inventory
Fetch all inventory items.

**Endpoint**: `GET /api/inventory`  
**Auth Required**: Yes  
**Role Required**: VIEWER or higher

**Query Parameters**:
```
roomId (optional): Int - Filter by room
type (optional): String - Filter by item type
```

**Success Response** (200):
```json
{
  "status": "success",
  "data": [
    {
      "invId": 1,
      "name": "HVAC Unit",
      "type": "Heating",
      "content": "2-ton unit, installed 2015",
      "rooms": [
        {
          "roomId": 2,
          "name": "Utility Room"
        }
      ]
    }
  ]
}
```

---

### POST /inventory
Create a new inventory item.

**Endpoint**: `POST /api/inventory`  
**Auth Required**: Yes  
**Role Required**: EDIT or ADMIN

**Request Body**:
```json
{
  "name": "HVAC Unit",
  "type": "Heating",
  "content": "2-ton unit, installed 2015",
  "roomIds": [2]
}
```

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "invId": 42,
    "name": "HVAC Unit"
  }
}
```

---

> **Note**: Individual inventory update and delete endpoints (`PUT /inventory/:id`, `DELETE /inventory/:id`) are planned but not yet implemented.

---

## Achievements API

### POST /achievements
Evaluate and award achievements for a user. Calculates current streaks and issue resolution counts, then unlocks any newly qualified achievements.

**Endpoint**: `POST /api/achievements`  
**Auth Required**: Yes  
**Role Required**: Any authenticated user

**Request Body**:
```json
{
  "userId": 1
}
```

**Success Response** (201) — array of newly unlocked achievements:
```json
[
  {
    "achievementId": 3,
    "userId": 1,
    "unlockedAt": "2026-05-16T10:00:00Z",
    "name": "On a Roll"
  }
]
```

Returns an empty array `[]` if no new achievements were unlocked.

---

### POST /achievements/mass
Bulk create achievements (typically from seed data).

**Endpoint**: `POST /api/achievements/mass`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Request Body**:
```json
{
  "achievements": [
    {
      "name": "First Task",
      "category": "ISSUES",
      "target": 1
    },
    {
      "name": "On a Roll",
      "category": "STREAK",
      "target": 7
    }
  ]
}
```

**Success Response** (201):
```json
{
  "status": "success",
  "data": {
    "created": 2
  }
}
```

---

## Analytics API

### GET /kpi
Fetch KPI metrics for dashboard.

**Endpoint**: `GET /api/kpi`  
**Auth Required**: Yes  
**Role Required**: VIEWER or higher

**Query Parameters**:
```
period (optional): String - "week", "month", "quarter", "year" (default: month)
```

**Success Response** (200):
```json
{
  "status": "success",
  "data": {
    "scheduledTasks": 12,
    "overdueTasks": 3,
    "tasksCompletedThisMonth": 5,
    "openIssues": 2,
    "issuesResolvedThisMonth": 1,
    "totalRooms": 8,
    "activeUsers": 3
  }
}
```

---

## Admin API

### POST /dbreset
Perform database reset or partial deletion (admin only).

**Endpoint**: `POST /api/dbreset`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Request Body** (Full reset):
```json
{
  "action": "reset",
  "confirmation": "I understand this will delete all data"
}
```

**Request Body** (Selective table deletion):
```json
{
  "action": "delete",
  "tables": ["taskHistory", "taskSchedule"],
  "confirmation": "I understand this action cannot be undone"
}
```

**Success Response** (200):
```json
{
  "status": "success",
  "data": {
    "action": "reset",
    "deletedRecords": 450,
    "message": "Database reset complete"
  }
}
```

---

### PUT /dbreset
Restore database from backup (admin only).

**Endpoint**: `PUT /api/dbreset`  
**Auth Required**: Yes  
**Role Required**: ADMIN

**Request Body**:
```json
{
  "action": "restore",
  "backupId": "backup_2024_05_08",
  "confirmation": "I confirm I want to restore from this backup"
}
```

**Success Response** (200):
```json
{
  "status": "success",
  "data": {
    "action": "restore",
    "message": "Database restored successfully"
  }
}
```

---

## Rate Limiting [Planned]

Rate limiting is not yet implemented. Planned additions for production:
- Per-user rate limits (e.g., 100 requests/minute)
- Per-IP rate limits for public endpoints
- Exponential backoff for failed authentication

---

## API Response Best Practices

**Always Include**:
- `status` field ("success" or "error")
- `data` field for success responses
- `message` field for error responses
- Appropriate HTTP status codes

**Pagination** (for list endpoints):
```json
{
  "status": "success",
  "data": [ /* items */ ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 20,
    "totalRecords": 150,
    "totalPages": 8
  }
}
```

**Error Details** (optional but recommended):
```json
{
  "status": "error",
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "taskName": "Field is required",
    "frequency": "Invalid value: must be one of WEEKLY, MONTHLY, etc."
  }
}
```

---

**Next**: See [COMPONENTS.md](./COMPONENTS.md) for UI component documentation.
