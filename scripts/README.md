# Database Backup & Recovery System

## Overview

This backup system provides comprehensive database safety for the Home Sweet Home application. It includes automated backup creation, integrity verification, and disaster recovery procedures.

## Scripts

### `backup-db.sh`
Creates compressed database backups with integrity verification.

**Usage:**
```bash
./scripts/backup-db.sh              # Standard backup
./scripts/backup-db.sh production   # Production environment backup
```

**Creates:**
- `backup_YYYYMMDD_HHMMSS.sql.gz` - Compressed database dump
- `backup_YYYYMMDD_HHMMSS.sql.sha256` - SHA256 checksum for verification
- `backup_metadata_YYYYMMDD_HHMMSS.txt` - Backup information and statistics

### `verify-backup.sh`
Tests backup integrity and corruption detection.

**Usage:**
```bash
./scripts/verify-backup.sh backups/backup_20260508_143022.sql.gz
```

**Tests Performed:**
1. File exists and has content
2. SHA256 checksum verification
3. Gzip compression integrity
4. SQL syntax validation
5. Data volume estimation

### `restore-db.sh`
Restores database from backup with safety measures.

**Usage:**
```bash
./scripts/restore-db.sh backups/backup_20260508_143022.sql.gz
```

**Safety Features:**
- Requires explicit confirmation ("restore")
- Creates pre-restore backup
- Validates backup before restore
- Verifies data integrity after restore

### `pre-deploy.sh`
Orchestrates safe deployment workflow.

**Usage:**
```bash
./scripts/pre-deploy.sh
```

**Workflow:**
1. Create backup
2. Verify backup integrity
3. Run database migrations
4. Abort deployment if any step fails

## Environment Variables

Configure these in your `.env.local` or `.env.production`:

```env
# Database Connection
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=homesweethome

# Backup Configuration
BACKUP_DIR=./backups
BACKUP_RETENTION_DAYS=30
```

## Quick Start

1. **Setup scripts:**
   ```bash
   # Make scripts executable (Linux/Mac)
   chmod +x scripts/*.sh

   # Or on Windows PowerShell:
   # Scripts are ready to run
   ```

2. **Create your first backup:**
   ```bash
   ./scripts/backup-db.sh
   ```

3. **Verify backup integrity:**
   ```bash
   ./scripts/verify-backup.sh backups/backup_*.sql.gz
   ```

4. **Test restore (on development):**
   ```bash
   ./scripts/restore-db.sh backups/backup_*.sql.gz
   # Type 'restore' when prompted
   ```

## Production Deployment Workflow

Before any database changes in production:

```bash
# 1. Run pre-deployment safety check
./scripts/pre-deploy.sh

# 2. If successful, proceed with deployment
# (Your deployment commands here)

# 3. Monitor application after deployment
# Check logs and verify functionality
```

## Backup File Structure

```
backups/
├── backup_20260508_143022.sql.gz          # Compressed database dump
├── backup_20260508_143022.sql.sha256      # Integrity checksum
├── backup_metadata_20260508_143022.txt    # Backup information
├── backup_log_20260508_143022.txt         # pg_dump verbose output
└── backup_pre_restore_*.sql.gz            # Auto-created before restore
```

## Corruption Detection

The system detects corruption through multiple layers:

1. **File Integrity:** SHA256 checksums catch any file corruption
2. **Compression Integrity:** Gzip validation ensures no compression errors
3. **SQL Syntax:** Validates backup contains proper SQL commands
4. **Data Consistency:** Row counts and table structure verification

## Recovery Procedures

### If Deployment Fails
```bash
# Restore from the backup created by pre-deploy.sh
./scripts/restore-db.sh backups/backup_*.sql.gz
```

### If Backup is Corrupted
```bash
# Check backup integrity
./scripts/verify-backup.sh backups/backup_*.sql.gz

# If corrupted, use previous backup or contact support
ls -la backups/backup_*.sql.gz
```

### Emergency Restore
```bash
# Force restore (bypasses some safety checks)
gunzip -c backups/backup_*.sql.gz | PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB
```

## Monitoring & Alerts

### Backup Success Monitoring
- Check exit codes from backup scripts
- Verify backup files exist and have content
- Monitor backup directory size

### Automated Checks
```bash
# Add to cron for daily backup verification
0 2 * * * /path/to/homesweethome/scripts/verify-backup.sh $(ls -t backups/backup_*.sql.gz | head -1)
```

## Troubleshooting

### Common Issues

**"pg_dump not found"**
- Install PostgreSQL client tools
- On Ubuntu: `sudo apt-get install postgresql-client`
- On macOS: `brew install postgresql`

**"Cannot connect to database"**
- Verify POSTGRES_PASSWORD is set
- Check database server is running
- Confirm connection details in .env

**"Permission denied"**
- Ensure scripts are executable: `chmod +x scripts/*.sh`
- Check write permissions on backup directory

**"Backup verification failed"**
- Check available disk space
- Verify database connectivity
- Review backup log: `backups/backup_log_*.txt`

## Security Considerations

- Store POSTGRES_PASSWORD securely (environment variables, not files)
- Backup files contain sensitive data - encrypt if storing off-site
- Limit access to backup directory
- Regularly rotate database passwords
- Use SSL/TLS for database connections in production

## Performance Notes

- Backups are compressed (typically 70-90% size reduction)
- Large databases may take several minutes to backup
- Restore time scales with database size
- Consider incremental backups for very large databases

## Support

For issues with the backup system:
1. Check script logs and error messages
2. Verify environment variables are set correctly
3. Test with a small development database first
4. Review the DEPLOYMENT.md documentation

---

**Last Updated:** May 9, 2026
**Version:** 1.0.0