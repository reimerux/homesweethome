/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `taskhistory` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `taskHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `taskhistory` DROP FOREIGN KEY `taskHistory_scheduleId_fkey`;

-- AlterTable
ALTER TABLE `taskhistory` DROP COLUMN `scheduleId`,
    ADD COLUMN `taskId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `taskHistory` ADD CONSTRAINT `taskHistory_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `MaintenanceTask`(`taskId`) ON DELETE RESTRICT ON UPDATE CASCADE;
