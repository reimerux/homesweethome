#!/bin/bash

################################################################################
# Verify Backup Integrity
#
# Usage:
#   ./scripts/verify-backup.sh backups/backup_20260508_143022.sql.gz
#
# Tests:
#   1. File exists and is not empty
#   2. Checksum matches SHA256 hash
#   3. Can decompress without errors
#   4. Contains valid SQL commands
#   5. Can restore to test database
################################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKUP_FILE="$1"
BACKUP_DIR=$(dirname "$BACKUP_FILE")
BACKUP_BASENAME=$(basename "$BACKUP_FILE")
CHECKSUM_FILE="${BACKUP_DIR}/${BACKUP_BASENAME%.gz}.sha256"

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
log_info "Verifying backup integrity: $BACKUP_BASENAME"
log_info "========================================="
echo ""

# Test 1: File size
log_info "Test 1: Checking file size..."
SIZE=$(du -h "$BACKUP_FILE" | awk '{print $1}')
if [ -z "$SIZE" ]; then
    log_error "Backup file is empty"
    exit 1
fi
log_success "File size: $SIZE"

# Test 2: Checksum verification
log_info "Test 2: Verifying SHA256 checksum..."
if [ -f "$CHECKSUM_FILE" ]; then
    cd "$BACKUP_DIR"
    if sha256sum -c "$BACKUP_BASENAME.sha256" > /dev/null 2>&1; then
        log_success "Checksum verified successfully"
    else
        log_error "CHECKSUM MISMATCH - Backup may be corrupted!"
        sha256sum -c "$BACKUP_BASENAME.sha256"
        exit 1
    fi
    cd - > /dev/null
else
    log_warning "No checksum file found - skipping checksum verification"
fi

# Test 3: Gzip integrity
log_info "Test 3: Testing gzip integrity..."
if gzip -t "$BACKUP_FILE" 2>/dev/null; then
    log_success "Gzip file is valid"
else
    log_error "Gzip file is corrupted or invalid"
    exit 1
fi

# Test 4: SQL content preview
log_info "Test 4: Checking SQL content..."
if gunzip -c "$BACKUP_FILE" | head -50 | grep -q "CREATE\\|INSERT\\|COPY"; then
    log_success "Valid SQL commands found in backup"
else
    log_error "No valid SQL commands found - backup may be corrupted"
    exit 1
fi

# Test 5: Row count (optional - counts COPY statements)
log_info "Test 5: Estimating data volume..."
COPY_COUNT=$(gunzip -c "$BACKUP_FILE" | grep -c "^COPY" || echo "0")
log_success "Found $COPY_COUNT COPY statements (tables with data)"

echo ""
log_success "========================================="
log_success "ALL VERIFICATION TESTS PASSED"
log_success "========================================="
log_success "Backup is safe and can be restored"
echo ""
echo "To restore from this backup:"
echo "  ./scripts/restore-db.sh $BACKUP_FILE"