/*
  Warnings:

  - The values [OVERDUE] on the enum `taskSchedule_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `taskhistory` MODIFY `datePerformed` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `taskschedule` MODIFY `status` ENUM('PENDING', 'COMPLETED', 'SKIPPED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
