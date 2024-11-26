import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";

export async function GET(request: NextRequest){
    const inventory = await prisma.inventory.findMany();
    return NextResponse.json(inventory);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body)
    
    const rooms = body.rooms
    delete body.rooms

    const newInventoryItem = await prisma.inventory.create({
        data: body
    })
    
    // Add room relations
    // create new relationships
    let multiAdd: any = []
    rooms.map((selectedRoom: any) => {
        multiAdd.push(

            {
                invId: newInventoryItem.invId,
                roomId: parseInt(selectedRoom),
                assignedAt: new Date(),
                assignedBy: "API"
            }
        )
    })

    if (multiAdd.length > 0) {
        await prisma.inventoryOnRooms.createMany({
            data: multiAdd
        })
    }

    return NextResponse.json(newInventoryItem, {status: 201});

}