/*
  Warnings:

  - You are about to drop the column `created_at` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Issue` table. All the data in the column will be lost.
  - Made the column `createdAt` on table `Issue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
