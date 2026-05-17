# Home Sweet Home - Deployment Guide

**Last Updated**: May 8, 2026  
**Target Platforms**: Vercel (recommended), self-hosted Node servers, Docker

---

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deployment to Vercel](#deployment-to-vercel)
3. [Self-Hosted Deployment](#self-hosted-deployment)
4. [Docker Deployment](#docker-deployment)
5. [Database Migration Strategy](#database-migration-strategy)
6. [Environment Configuration](#environment-configuration)
7. [Monitoring & Logging](#monitoring--logging)
8. [Performance Optimization](#performance-optimization)
9. [Security Hardening](#security-hardening)
10. [Rollback Procedures](#rollback-procedures)

---

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests pass: `npm run build && npm run lint`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No console.log() statements left (use logger)
- [ ] No hardcoded URLs/API keys
- [ ] Error handling in place for all API endpoints
- [ ] Environment variables properly validated on startup

### Security
- [ ] NEXTAUTH_SECRET is unique and strong (32+ chars)
- [ ] NEXTAUTH_URL matches production domain
- [ ] Database credentials stored in secure environment
- [ ] No sensitive data in git history
- [ ] CORS configured if needed
- [ ] Rate limiting considered for public endpoints

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass on staging
- [ ] Manual testing on staging environment
- [ ] Load testing if high traffic expected

### Documentation
- [ ] Deployment notes documented
- [ ] Known issues logged
- [ ] Rollback plan documented
- [ ] Team notified of deployment time

### Database
- [ ] Database backups created
- [ ] Migrations tested on staging
- [ ] Data migrations validated
- [ ] Rollback database plan in place

---

## Deployment to Vercel

### Recommended: Vercel Deployment

Vercel is the official hosting platform for Next.js and provides seamless deployment with minimal configuration.

### Prerequisites
- Vercel account (free tier available at vercel.com)
- GitHub account with repository
- Production database (Neon, Supabase, AWS RDS, etc.)

### Setup Steps

#### 1. Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Paste GitHub URL: `https://github.com/yourusername/homesweethome`
4. Click "Import"

#### 2. Configure Project

**Project Name**: `homesweethome` (or preferred name)

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: Leave as `.` (default)

#### 3. Environment Variables

Click "Environment Variables" and add:

```env
# Required
NEXTAUTH_SECRET=your-secure-random-32-char-secret
NEXTAUTH_URL=https://homesweethome.vercel.app

# Database
POSTGRES_PRISMA_URL=postgresql://user:pass@db.host/dbname?schema=public
POSTGRES_URL_NON_POOLING=postgresql://user:pass@db.host/dbname?schema=public

# Optional
SENTRY_DSN=
LOG_LEVEL=info
```

#### 4. Deploy

Click "Deploy" button. Vercel will:
1. Build project: `npm run build`
2. Run tests if configured
3. Deploy to CDN
4. Provide production URL

**First Deploy**: Takes 3-5 minutes

#### 5. Post-Deployment

1. Visit your deployment URL
2. Run database migrations (see Database Migration section)
3. Create initial admin user
4. Test key features

### Automatic Deployments

**Production** (from main branch):
- Every push to `main` triggers production build
- Auto-deployed when build succeeds
- Can be disabled in project settings

**Preview** (from pull requests):
- Every PR gets preview deployment
- Test changes before merging
- Preview URL provided in PR

### Vercel Production Checklist

- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics enabled (optional)
- [ ] Error notifications configured
- [ ] Backup plan for database
- [ ] Monitoring tools integrated

---

## Self-Hosted Deployment

### Hosting Options

1. **VPS**: DigitalOcean, Linode, Vultr, AWS EC2
2. **PaaS**: Heroku, Railway, Render
3. **Dedicated Server**: Various hosting providers

### Prerequisites
- Server with Node.js 18+
- PostgreSQL 12+
- Process manager (PM2, systemd)
- Reverse proxy (Nginx)
- SSL certificate (Let's Encrypt)

### Deployment Steps

#### 1. Server Setup

```bash
# SSH into server
ssh user@your-server.com

# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Install Nginx
sudo apt-get install -y nginx

# Install PM2
sudo npm install -g pm2
```

#### 2. Clone Repository

```bash
cd /var/www
sudo git clone https://github.com/yourusername/homesweethome.git
cd homesweethome
sudo chown -R $USER:$USER .
```

#### 3. Install Dependencies

```bash
npm install --production
npm run build
```

#### 4. Create `.env.production`

```env
NODE_ENV=production
NEXTAUTH_SECRET=your-secure-secret
NEXTAUTH_URL=https://yourdomain.com
POSTGRES_PRISMA_URL=postgresql://user:pass@localhost:5432/homesweethome?schema=public
POSTGRES_URL_NON_POOLING=postgresql://user:pass@localhost:5432/homesweethome?schema=public
```

#### 5. Database Setup

```bash
# Create database
sudo -u postgres createdb homesweethome

# Run migrations
npx prisma migrate deploy
```

#### 6. PM2 Process Manager

**Create `ecosystem.config.js`**:

```javascript
module.exports = {
  apps: [
    {
      name: 'homesweethome',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      watch: false,
      max_memory_restart: '512M'
    }
  ]
};
```

**Start Application**:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 7. Nginx Configuration

**Create `/etc/nginx/sites-available/homesweethome`**:

```nginx
upstream homesweethome {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name yourdomain.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_pass http://homesweethome;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api {
    proxy_pass http://homesweethome;
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;
  }
}
```

**Enable Site**:

```bash
sudo ln -s /etc/nginx/sites-available/homesweethome /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 8. SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

#### 9. Monitoring

**PM2 Monitoring Dashboard**:

```bash
pm2 install pm2-auto-pull  # Auto-update from git
pm2 web                     # Web dashboard on :9615
```

---

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

**`docker-compose.yml`**:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      POSTGRES_PRISMA_URL: postgresql://homesweethome:password@db:5432/homesweethome?schema=public
      POSTGRES_URL_NON_POOLING: postgresql://homesweethome:password@db:5432/homesweethome?schema=public
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: https://yourdomain.com
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: homesweethome
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: homesweethome
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U homesweethome"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  postgres_data:
```

**Deploy**:

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop
docker-compose down
```

---

## Database Migration Strategy

### Pre-Deployment Testing

1. **Test Migrations on Staging**:
```bash
# Apply migrations to staging database
npx prisma migrate deploy --skip-generate
```

2. **Verify Data Integrity**:
   - Count records before/after
   - Spot-check data transformations
   - Test rollback scenario

### Deployment Day

#### Before Deployment

```bash
# 1. Create database backup
pg_dump -U postgres homesweethome > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Verify backup
pg_restore -l backup_*.sql | head

# 3. Notify team
# Post message: "Deployment starting at 2:00 PM UTC"
```

#### During Deployment

```bash
# 1. Stop application (optional, can deploy without downtime)
pm2 stop homesweethome

# 2. Deploy new code
git pull origin main
npm install
npm run build

# 3. Run migrations
npx prisma migrate deploy

# 4. Start application
pm2 start homesweethome
pm2 save
```

#### Verification

```bash
# 1. Check application status
curl https://yourdomain.com/health

# 2. Monitor logs
pm2 logs homesweethome

# 3. Verify database
psql -d homesweethome -c "SELECT COUNT(*) FROM \"MaintenanceTask\";"

# 4. Test key features
# - Create task
# - Create issue
# - Complete task
# - View dashboard
```

### Rollback Procedure

**If deployment fails**:

```bash
# 1. Restore database from backup
psql -U postgres homesweethome < backup_*.sql

# 2. Checkout previous commit
git checkout HEAD~1

# 3. Rebuild and restart
npm run build
pm2 restart homesweethome
```

---

## Environment Configuration

### Environment Variables by Stage

**Development** (`.env.local`):
```env
NODE_ENV=development
NEXTAUTH_SECRET=dev-secret-not-used
NEXTAUTH_URL=http://localhost:3000
POSTGRES_PRISMA_URL=postgresql://user:pass@localhost/dev_db
LOG_LEVEL=debug
```

**Staging** (`.env.staging`):
```env
NODE_ENV=staging
NEXTAUTH_SECRET=${STAGING_SECRET}
NEXTAUTH_URL=https://staging.homesweethome.com
POSTGRES_PRISMA_URL=${STAGING_DB_URL}
LOG_LEVEL=info
SENTRY_DSN=${SENTRY_STAGING_DSN}
```

**Production** (`.env.production`):
```env
NODE_ENV=production
NEXTAUTH_SECRET=${PRODUCTION_SECRET}
NEXTAUTH_URL=https://homesweethome.com
POSTGRES_PRISMA_URL=${PRODUCTION_DB_URL}
LOG_LEVEL=warn
SENTRY_DSN=${SENTRY_PRODUCTION_DSN}
```

### Secrets Management

**Option 1: Vercel Secrets** (Recommended for Vercel)
```bash
vercel env add NEXTAUTH_SECRET
vercel env add POSTGRES_PRISMA_URL
```

**Option 2: Environment Files** (Self-hosted)
```bash
# Create .env.production with strong permissions
touch .env.production
chmod 600 .env.production
# Edit with secrets
```

**Option 3: Secrets Manager** (Enterprise)
- HashiCorp Vault
- AWS Secrets Manager
- Azure Key Vault

---

## Monitoring & Logging

### Error Tracking

**Sentry Integration**:

```typescript
// app/layout.tsx
import * as Sentry from "@sentry/nextjs";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  });
}
```

### Application Monitoring

**PM2 Monitoring**:
```bash
# Real-time dashboard
pm2 web              # Available on http://localhost:9615

# Log monitoring
pm2 logs homesweethome
pm2 logs homesweethome --err
```

### Database Monitoring

**PostgreSQL Logs**:
```bash
# View query logs
sudo -u postgres psql -d homesweethome -c "SELECT query, calls, total_time FROM pg_stat_statements ORDER BY total_time DESC;"

# Monitor connections
sudo -u postgres psql -d homesweethome -c "SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;"
```

### Uptime Monitoring

**Status Page** (Optional):
- Uptime Robot
- StatusPage.io
- Pingdom

---

## Performance Optimization

### Database Optimization

1. **Add Indexes** (for frequent queries):
```sql
CREATE INDEX idx_taskschedule_due_date ON "taskSchedule"("nextDueDate");
CREATE INDEX idx_taskschedule_status ON "taskSchedule"("status");
CREATE INDEX idx_issue_status ON "Issue"("status");
```

2. **Query Optimization**:
   - Use `.include()` judiciously (avoid N+1 problems)
   - Implement query result caching
   - Consider read replicas for analytics

### Caching Strategy

**HTTP Caching**:
```typescript
// app/api/tasks/route.ts
export async function GET(req: NextRequest) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  });
}
```

**Application Caching** (Redis, optional):
- Cache user sessions
- Cache KPI calculations
- Cache frequently accessed data

### Asset Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - WebP format
   - Responsive sizing

2. **Code Splitting**:
   - Already handled by Next.js
   - Large components lazy-loaded

3. **Bundle Size**:
   - Monitor with `npm run build --analyze`
   - Remove unused dependencies

---

## Security Hardening

### CORS Configuration

```typescript
// app/api/route.ts
const ALLOWED_ORIGINS = [
  'https://homesweethome.com',
  'https://app.homesweethome.com'
];

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  
  if (ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(..., {
      headers: { 'Access-Control-Allow-Origin': origin }
    });
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

### Rate Limiting

```typescript
// middleware.ts (with rate limiting library)
import { rateLimit } from 'some-rate-limit-library';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // 500 unique tokens per interval
});

export async function middleware(request: NextRequest) {
  const ip = request.ip;
  
  try {
    await limiter.check(ip, 100); // 100 requests per minute
  } catch {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
}
```

### HTTPS/TLS

- Enforce HTTPS (redirect HTTP → HTTPS)
- Use TLS 1.2+
- Keep certificates updated (auto-renew with Let's Encrypt)

### Database Security

- Use connection pooling
- Implement SQL injection protection (Prisma does this)
- Regular backups with encryption
- Restrict database access by IP

### Secrets Security

- Never commit secrets to git
- Use `.gitignore` for `.env.*`
- Rotate NEXTAUTH_SECRET regularly
- Use strong, randomly generated secrets

---

## Rollback Procedures

### Application Rollback

**If Latest Version has Bugs**:

```bash
# 1. Identify previous working version
git log --oneline | head

# 2. Rollback to previous commit
git revert HEAD
git push origin main

# 3. Vercel auto-deploys from main branch
# Monitor deployment at vercel.com dashboard

# 4. Verify rollback
curl https://yourdomain.com
```

### Database Rollback

**If Migration Causes Issues**:

```bash
# 1. Restore from backup
pg_restore -d homesweethome backup_*.sql

# 2. Revert migration files
rm prisma/migrations/latest_migration_folder/

# 3. Rollback application code
git revert HEAD

# 4. Restart application
npm run build
pm2 restart homesweethome
```

### Zero-Downtime Deployment

**For High-Traffic Sites**:

1. Deploy new code (old schema still compatible)
2. Run data migrations in background
3. Gradually switch users to new version
4. Monitor for errors before completing

---

## Deployment Checklist

**Pre-Deployment** (1 week before):
- [ ] Code review completed
- [ ] Tests passing on CI/CD
- [ ] Staging deployment working
- [ ] Performance testing complete
- [ ] Security scan completed

**Day Before** (24 hours):
- [ ] Team notified of deployment time
- [ ] Database backup scheduled
- [ ] Rollback plan documented
- [ ] Monitoring tools active

**Deployment Day** (Execution):
- [ ] Post deployment announcement
- [ ] Monitor error tracking
- [ ] Check database health
- [ ] Test key features manually
- [ ] Monitor performance metrics

**Post-Deployment** (Day after):
- [ ] Review error logs
- [ ] Check user feedback
- [ ] Monitor performance
- [ ] Document any issues
- [ ] Archive backup (keep for 30 days)

---

**Questions?** Contact DevOps team or refer to platform-specific documentation (Vercel, Nginx, Docker, etc.).

**Summary**: Refer to [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for project context and all documentation.
