-- Active: 1725122934934@@127.0.0.1@5432@hshDev
-- CreateTable
CREATE TABLE "Inventory" (
    "invId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "vendor" TEXT,
    "itemNumber" TEXT,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("invId")
);

-- CreateTable
CREATE TABLE "InventoryOnRooms" (
    "roomId" INTEGER NOT NULL,
    "invId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "InventoryOnRooms_pkey" PRIMARY KEY ("roomId","invId")
);

-- AddForeignKey
ALTER TABLE "InventoryOnRooms" ADD CONSTRAINT "InventoryOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryOnRooms" ADD CONSTRAINT "InventoryOnRooms_invId_fkey" FOREIGN KEY ("invId") REFERENCES "Inventory"("invId") ON DELETE RESTRICT ON UPDATE CASCADE;
