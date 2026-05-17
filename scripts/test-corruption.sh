#!/bin/bash

################################################################################
# Test Corruption Detection
#
# Usage:
#   ./scripts/test-corruption.sh
#
# This script demonstrates the backup system's corruption detection
# by creating a backup, corrupting it, and showing detection
################################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

echo ""
log_info "========================================="
log_info "TESTING BACKUP CORRUPTION DETECTION"
log_info "========================================="
echo ""

# Step 1: Create a test backup
log_info "Step 1: Creating test backup..."
if ./scripts/backup-db.sh > /dev/null 2>&1; then
    BACKUP_FILE=$(ls -t backups/backup_*.sql.gz | head -1)
    log_success "Test backup created: $BACKUP_FILE"
else
    log_error "Failed to create test backup"
    exit 1
fi
echo ""

# Step 2: Verify the backup is good
log_info "Step 2: Verifying backup integrity (should pass)..."
if ./scripts/verify-backup.sh "$BACKUP_FILE" > /dev/null 2>&1; then
    log_success "✓ Backup verification passed (as expected)"
else
    log_error "✗ Backup verification failed unexpectedly"
    exit 1
fi
echo ""

# Step 3: Corrupt the backup file
log_info "Step 3: Corrupting the backup file..."
CORRUPTED_FILE="${BACKUP_FILE}.corrupted"
cp "$BACKUP_FILE" "$CORRUPTED_FILE"

# Add some corruption to the file
echo "CORRUPTION_TEST_DATA_12345" >> "$CORRUPTED_FILE"
log_warning "✓ Added corruption to backup file"
echo ""

# Step 4: Try to verify the corrupted backup
log_info "Step 4: Verifying corrupted backup (should fail)..."
if ./scripts/verify-backup.sh "$CORRUPTED_FILE" > /dev/null 2>&1; then
    log_error "✗ Corrupted backup verification passed (unexpected!)"
    exit 1
else
    log_success "✓ Corrupted backup verification failed (as expected)"
fi
echo ""

# Step 5: Test gzip corruption
log_info "Step 5: Testing gzip corruption detection..."
GZIP_CORRUPTED="${BACKUP_FILE}.gzip_corrupted"
head -c 1000 "$BACKUP_FILE" > "$GZIP_CORRUPTED"  # Truncate file (corrupts gzip)
echo "EXTRA_DATA" >> "$GZIP_CORRUPTED"

if ./scripts/verify-backup.sh "$GZIP_CORRUPTED" > /dev/null 2>&1; then
    log_error "✗ Gzip corrupted backup verification passed (unexpected!)"
    exit 1
else
    log_success "✓ Gzip corrupted backup verification failed (as expected)"
fi
echo ""

# Step 6: Clean up test files
log_info "Step 6: Cleaning up test files..."
rm -f "$CORRUPTED_FILE" "$GZIP_CORRUPTED"
log_success "✓ Test files cleaned up"
echo ""

# Summary
echo ""
log_success "========================================="
log_success "CORRUPTION DETECTION TEST COMPLETED"
log_success "========================================="
echo ""
log_success "✓ Original backup verified successfully"
log_success "✓ Content corruption detected"
log_success "✓ Gzip corruption detected"
echo ""
log_info "The backup system successfully detects:"
log_info "  - SHA256 checksum mismatches"
log_info "  - Gzip compression corruption"
log_info "  - File truncation/modification"
echo ""
log_info "Safe backup: $BACKUP_FILE"
echo ""