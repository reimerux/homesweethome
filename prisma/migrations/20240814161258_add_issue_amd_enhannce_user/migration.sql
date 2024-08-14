/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `shortName` VARCHAR(191) NOT NULL DEFAULT 'Short';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'VIEWER', 'EDIT') NOT NULL;

-- CreateTable
CREATE TABLE `Issue` (
    `issueId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('PENDING', 'COMPLETED', 'SKIPPED', 'CANCELLED') NOT NULL,
    `priority` ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL,

    PRIMARY KEY (`issueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Label` (
    `labelId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`labelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LabelsonIssues` (
    `issueId` INTEGER NOT NULL,
    `labelId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`issueId`, `labelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LabelsonIssues` ADD CONSTRAINT `LabelsonIssues_issueId_fkey` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`issueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabelsonIssues` ADD CONSTRAINT `LabelsonIssues_labelId_fkey` FOREIGN KEY (`labelId`) REFERENCES `Label`(`labelId`) ON DELETE RESTRICT ON UPDATE CASCADE;
