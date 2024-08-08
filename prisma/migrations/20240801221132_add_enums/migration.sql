/*
  Warnings:

  - You are about to alter the column `frequency` on the `maintenancetask` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `importance` on the `maintenancetask` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `taskschedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `maintenancetask` MODIFY `description` TEXT NULL,
    MODIFY `frequency` ENUM('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY', 'ADHOC') NOT NULL DEFAULT 'YEARLY',
    MODIFY `importance` ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL DEFAULT 'MEDIUM';

-- AlterTable
ALTER TABLE `taskhistory` MODIFY `notes` TEXT NULL;

-- AlterTable
ALTER TABLE `taskschedule` MODIFY `status` ENUM('PENDING', 'COMPLETED', 'OVERDUE', 'SKIPPED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    MODIFY `notes` TEXT NULL;
