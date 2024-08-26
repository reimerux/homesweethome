-- CreateTable
CREATE TABLE "RoomsOnIssues" (
    "issueId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "RoomsOnIssues_pkey" PRIMARY KEY ("issueId","roomId")
);

-- AddForeignKey
ALTER TABLE "RoomsOnIssues" ADD CONSTRAINT "RoomsOnIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("issueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsOnIssues" ADD CONSTRAINT "RoomsOnIssues_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
