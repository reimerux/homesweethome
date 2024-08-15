-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED', 'SKIPPED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY', 'ADHOC');

-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('NONE', 'WINTER', 'SPRING', 'SUMMER', 'FALL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VIEWER', 'EDIT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT NOT NULL,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL DEFAULT 'password',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "houseId" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "squarefootage" INTEGER,

    CONSTRAINT "House_pkey" PRIMARY KEY ("houseId")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL DEFAULT 'Short',
    "notes" TEXT,
    "houseId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "MaintenanceTask" (
    "taskId" SERIAL NOT NULL,
    "taskName" TEXT NOT NULL,
    "description" TEXT,
    "timeEstimate" INTEGER,
    "frequency" "Frequency" NOT NULL DEFAULT 'YEARLY',
    "importance" "Importance" NOT NULL DEFAULT 'MEDIUM',
    "season" "Season",

    CONSTRAINT "MaintenanceTask_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "taskSchedule" (
    "scheduleId" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "nextDueDate" TIMESTAMP(3) NOT NULL,
    "lastCompletedDate" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,

    CONSTRAINT "taskSchedule_pkey" PRIMARY KEY ("scheduleId")
);

-- CreateTable
CREATE TABLE "taskHistory" (
    "historyId" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "datePerformed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monthPerformed" INTEGER NOT NULL DEFAULT 8,
    "yearPerformed" INTEGER NOT NULL DEFAULT 2024,
    "status" "Status" NOT NULL DEFAULT 'COMPLETED',
    "userPerformedId" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,

    CONSTRAINT "taskHistory_pkey" PRIMARY KEY ("historyId")
);

-- CreateTable
CREATE TABLE "RoomsOnTasks" (
    "taskId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "RoomsOnTasks_pkey" PRIMARY KEY ("taskId","roomId")
);

-- CreateTable
CREATE TABLE "Issue" (
    "issueId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "priority" "Importance" NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("issueId")
);

-- CreateTable
CREATE TABLE "Label" (
    "labelId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("labelId")
);

-- CreateTable
CREATE TABLE "LabelsonIssues" (
    "issueId" INTEGER NOT NULL,
    "labelId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "LabelsonIssues_pkey" PRIMARY KEY ("issueId","labelId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("houseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskSchedule" ADD CONSTRAINT "taskSchedule_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "MaintenanceTask"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskHistory" ADD CONSTRAINT "taskHistory_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "MaintenanceTask"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskHistory" ADD CONSTRAINT "taskHistory_userPerformedId_fkey" FOREIGN KEY ("userPerformedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsOnTasks" ADD CONSTRAINT "RoomsOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "MaintenanceTask"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsOnTasks" ADD CONSTRAINT "RoomsOnTasks_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelsonIssues" ADD CONSTRAINT "LabelsonIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("issueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelsonIssues" ADD CONSTRAINT "LabelsonIssues_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("labelId") ON DELETE RESTRICT ON UPDATE CASCADE;
