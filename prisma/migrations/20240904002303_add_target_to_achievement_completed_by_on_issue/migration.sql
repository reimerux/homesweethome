-- Active: 1725122934934@@127.0.0.1@5432@hshDev@public
/*
  Warnings:

  - The values [TIME,ROOM] on the enum `AchievementCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AchievementCategory_new" AS ENUM ('STREAK', 'ISSUES');
ALTER TABLE "Achievement" ALTER COLUMN "category" TYPE "AchievementCategory_new" USING ("category"::text::"AchievementCategory_new");
ALTER TYPE "AchievementCategory" RENAME TO "AchievementCategory_old";
ALTER TYPE "AchievementCategory_new" RENAME TO "AchievementCategory";
DROP TYPE "AchievementCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "target" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "completedBy" INTEGER;
