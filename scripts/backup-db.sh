#!/bin/bash

################################################################################
# Database Backup Script for Home Sweet Home
#
# Usage:
#   ./scripts/backup-db.sh              # Backup to default location
#   ./scripts/backup-db.sh production   # Backup with environment prefix
#
# Creates:
#   - backup_YYYYMMDD_HHMMSS.sql.gz (compressed)
#   - backup_YYYYMMDD_HHMMSS.sql.sha256 (checksum for integrity verification)
#   - backup_metadata_YYYYMMDD_HHMMSS.txt (backup info)
#
# Environment Variables (from .env.local or .env.production):
#   POSTGRES_USER (default: postgres)
#   POSTGRES_PASSWORD (required)
#   POSTGRES_HOST (default: localhost)
#   POSTGRES_PORT (default: 5432)
#   POSTGRES_DB (default: homesweethome)
#   BACKUP_DIR (default: ./backups)
#   BACKUP_RETENTION_DAYS (default: 30)
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
BACKUP_DIR="${BACKUP_DIR:-.}/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${TIMESTAMP}.sql.gz"
BACKUP_CHECKSUM="backup_${TIMESTAMP}.sql.sha256"
BACKUP_METADATA="backup_metadata_${TIMESTAMP}.txt"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"

# Database Configuration
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-homesweethome}"

# Function to print status messages
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Validate prerequisites
validate_prerequisites() {
    log_info "Validating prerequisites..."

    # Check for required commands
    command -v pg_dump >/dev/null 2>&1 || { log_error "pg_dump not found. Install PostgreSQL client tools."; exit 1; }
    command -v gzip >/dev/null 2>&1 || { log_error "gzip not found"; exit 1; }
    command -v sha256sum >/dev/null 2>&1 || { log_error "sha256sum not found"; exit 1; }

    # Check for POSTGRES_PASSWORD
    if [ -z "$POSTGRES_PASSWORD" ]; then
        log_error "POSTGRES_PASSWORD environment variable not set"
        exit 1
    fi

    # Check database connectivity
    PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT 1" > /dev/null 2>&1 || {
        log_error "Cannot connect to database at $POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"
        exit 1
    }

    log_success "All prerequisites validated"
}

# Create backup directory
create_backup_dir() {
    if [ ! -d "$BACKUP_DIR" ]; then
        log_info "Creating backup directory: $BACKUP_DIR"
        mkdir -p "$BACKUP_DIR" || { log_error "Failed to create backup directory"; exit 1; }
    fi
}

# Get database statistics
get_db_stats() {
    PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -c "
        SELECT
            'Total Relations: ' || (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public') ||
            ', Total Rows: ' || (SELECT sum(n_live_tup) FROM pg_stat_user_tables);
    " 2>/dev/null || echo "Unknown"
}

# Perform database backup
perform_backup() {
    log_info "Starting database backup..."
    log_info "Environment: $ENVIRONMENT"
    log_info "Database: $POSTGRES_DB at $POSTGRES_HOST:$POSTGRES_PORT"
    log_info "Backup file: $BACKUP_DIR/$BACKUP_FILE"

    # Get database stats before backup
    DB_STATS=$(get_db_stats)

    # Create backup with timestamp
    BACKUP_START_TIME=$(date +%s)
    PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" --verbose 2>"${BACKUP_DIR}/backup_log_${TIMESTAMP}.txt" | gzip > "${BACKUP_DIR}/${BACKUP_FILE}" || {
        log_error "Backup failed"
        exit 1
    }
    BACKUP_END_TIME=$(date +%s)
    BACKUP_DURATION=$((BACKUP_END_TIME - BACKUP_START_TIME))

    # Verify backup file exists and has content
    if [ ! -f "${BACKUP_DIR}/${BACKUP_FILE}" ] || [ ! -s "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
        log_error "Backup file is empty or not created"
        exit 1
    fi

    log_success "Backup completed successfully"
}

# Generate checksum for integrity verification
generate_checksum() {
    log_info "Generating checksum for backup verification..."

    cd "$BACKUP_DIR"
    sha256sum "$BACKUP_FILE" > "$BACKUP_CHECKSUM" || { log_error "Failed to generate checksum"; exit 1; }
    cd - > /dev/null

    CHECKSUM=$(cat "${BACKUP_DIR}/${BACKUP_CHECKSUM}" | awk '{print $1}')
    log_success "Checksum generated: $CHECKSUM"
}

# Create metadata file
create_metadata() {
    log_info "Creating backup metadata..."

    cat > "${BACKUP_DIR}/${BACKUP_METADATA}" << EOF
========================================
BACKUP METADATA
========================================
Timestamp: $(date)
Environment: $ENVIRONMENT
Database: $POSTGRES_DB
Host: $POSTGRES_HOST
Port: $POSTGRES_PORT

Backup File: $BACKUP_FILE
Size: $(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | awk '{print $1}')
Checksum (SHA256): $CHECKSUM

Duration: ${BACKUP_DURATION}s
Database Stats: $DB_STATS

Retention: Keep until $(date -d "+$BACKUP_RETENTION_DAYS days" '+%Y-%m-%d')
========================================
EOF

    log_success "Metadata file created"
}

# Cleanup old backups
cleanup_old_backups() {
    log_info "Cleaning up backups older than $BACKUP_RETENTION_DAYS days..."

    find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +$BACKUP_RETENTION_DAYS -delete && \
    find "$BACKUP_DIR" -name "backup_*.sql.sha256" -mtime +$BACKUP_RETENTION_DAYS -delete && \
    find "$BACKUP_DIR" -name "backup_metadata_*.txt" -mtime +$BACKUP_RETENTION_DAYS -delete

    log_info "Cleanup completed"
}

# Print summary
print_summary() {
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}BACKUP COMPLETED SUCCESSFULLY${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo "Backup File: ${BACKUP_DIR}/${BACKUP_FILE}"
    echo "Checksum:    ${BACKUP_DIR}/${BACKUP_CHECKSUM}"
    echo "Metadata:    ${BACKUP_DIR}/${BACKUP_METADATA}"
    echo ""
    echo "To verify backup integrity:"
    echo "  ./scripts/verify-backup.sh ${BACKUP_DIR}/${BACKUP_FILE}"
    echo ""
    echo "To restore from this backup:"
    echo "  ./scripts/restore-db.sh ${BACKUP_DIR}/${BACKUP_FILE}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
}

# Main execution
main() {
    log_info "Home Sweet Home - Database Backup Script"
    log_info "========================================"

    validate_prerequisites
    create_backup_dir
    perform_backup
    generate_checksum
    create_metadata
    cleanup_old_backups
    print_summary
}

# Run main function
main "$@"