-- AlterTable
ALTER TABLE `taskhistory` ADD COLUMN `userPerformedId` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `RoomsOnTasks` (
    `taskId` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`taskId`, `roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `taskHistory` ADD CONSTRAINT `taskHistory_userPerformedId_fkey` FOREIGN KEY (`userPerformedId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomsOnTasks` ADD CONSTRAINT `RoomsOnTasks_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `MaintenanceTask`(`taskId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomsOnTasks` ADD CONSTRAINT `RoomsOnTasks_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;
