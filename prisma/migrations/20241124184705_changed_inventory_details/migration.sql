/*
  Warnings:

  - You are about to drop the column `description` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `itemNumber` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `vendor` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `content` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "description",
DROP COLUMN "itemNumber",
DROP COLUMN "vendor",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
