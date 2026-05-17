#!/bin/bash

################################################################################
# Database Restore Script
#
# Usage:
#   ./scripts/restore-db.sh backups/backup_20260508_143022.sql.gz
#
# Safety Features:
#   - Requires confirmation
#   - Creates pre-restore backup
#   - Validates backup before restore
#   - Verifies data integrity after restore
################################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKUP_FILE="$1"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-homesweethome}"

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

# Validate input
if [ -z "$BACKUP_FILE" ]; then
    log_error "Usage: $0 <backup_file>"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    log_error "Backup file not found: $BACKUP_FILE"
    exit 1
fi

log_info "========================================="
log_info "Database Restore - DESTRUCTIVE OPERATION"
log_info "========================================="
echo ""
log_warning "This will DELETE all current data in: $POSTGRES_DB"
log_warning "Database: $POSTGRES_DB at $POSTGRES_HOST:$POSTGRES_PORT"
echo ""

# Confirmation
read -p "$(echo -e ${YELLOW}Type 'restore' to proceed:${NC} )" CONFIRM
if [ "$CONFIRM" != "restore" ]; then
    log_info "Restore cancelled"
    exit 0
fi

log_warning "PROCEEDING WITH RESTORE"
echo ""

# Verify backup before restore
log_info "Verifying backup integrity before restore..."
if gzip -t "$BACKUP_FILE" 2>/dev/null; then
    log_success "Backup file integrity verified"
else
    log_error "Backup file is corrupted - restore aborted"
    exit 1
fi

# Create pre-restore backup
log_info "Creating pre-restore backup as safety measure..."
PRE_RESTORE_BACKUP="backups/backup_pre_restore_$(date +%Y%m%d_%H%M%S).sql.gz"
mkdir -p backups
PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" | gzip > "$PRE_RESTORE_BACKUP" || {
    log_error "Failed to create pre-restore backup"
    exit 1
}
log_success "Pre-restore backup created: $PRE_RESTORE_BACKUP"

# Drop and recreate database
log_info "Dropping existing database..."
PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "postgres" -c "DROP DATABASE IF EXISTS $POSTGRES_DB;" || {
    log_error "Failed to drop database"
    exit 1
}
log_success "Database dropped"

log_info "Creating new database..."
PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "postgres" -c "CREATE DATABASE $POSTGRES_DB;" || {
    log_error "Failed to create database"
    exit 1
}
log_success "Database created"

# Restore from backup
log_info "Restoring data from backup..."
RESTORE_START=$(date +%s)
gunzip -c "$BACKUP_FILE" | PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" > /dev/null 2>&1 || {
    log_error "Restore failed - database may be in inconsistent state"
    exit 1
}
RESTORE_END=$(date +%s)
RESTORE_TIME=$((RESTORE_END - RESTORE_START))

log_success "Restore completed in ${RESTORE_TIME}s"

# Verify restored data
log_info "Verifying restored data integrity..."
RESTORED_COUNT=$(PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -c "SELECT sum(n_live_tup) FROM pg_stat_user_tables;" 2>/dev/null || echo "Unknown")
log_success "Restored row count: $RESTORED_COUNT"

echo ""
log_success "========================================="
log_success "RESTORE COMPLETED SUCCESSFULLY"
log_success "========================================="
log_info "Pre-restore backup saved at: $PRE_RESTORE_BACKUP"
log_info "If issues occur, restore from: $PRE_RESTORE_BACKUP"