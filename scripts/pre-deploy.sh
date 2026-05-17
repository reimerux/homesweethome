#!/bin/bash

################################################################################
# Pre-Deployment Safety Script
#
# Orchestrates: Backup → Run Migrations → Verify
# Usage:
#   ./scripts/pre-deploy.sh
################################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

log_info "========================================="
log_info "PRE-DEPLOYMENT SAFETY CHECK"
log_info "========================================="
echo ""

# Step 1: Create backup
log_info "Step 1/3: Creating database backup..."
if ./scripts/backup-db.sh; then
    BACKUP_FILE=$(ls -t backups/backup_*.sql.gz | head -1)
    log_success "Backup created: $BACKUP_FILE"
else
    log_error "Backup failed - aborting deployment"
    exit 1
fi
echo ""

# Step 2: Verify backup
log_info "Step 2/3: Verifying backup integrity..."
if ./scripts/verify-backup.sh "$BACKUP_FILE"; then
    log_success "Backup verified safe"
else
    log_error "Backup verification failed - aborting deployment"
    exit 1
fi
echo ""

# Step 3: Run migrations
log_info "Step 3/3: Running database migrations..."
if npx prisma migrate deploy; then
    log_success "Migrations completed successfully"
else
    log_error "Migration failed - restore from backup with: ./scripts/restore-db.sh $BACKUP_FILE"
    exit 1
fi

echo ""
log_success "========================================="
log_success "PRE-DEPLOYMENT CHECK PASSED"
log_success "========================================="
log_info "Safe to proceed with deployment"
log_info "Recovery backup: $BACKUP_FILE"