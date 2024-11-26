import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const inventory = await prisma.inventory.findUnique({

        where: { invId: parseInt(params.id) }
    })
    if (!inventory)
        return NextResponse.json({ error: "inventory Item not found" }, { status: 404 })


    return NextResponse.json(inventory);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const body = await request.json();
    console.log(body)
    const bodyRooms = body.rooms
    delete body.rooms

    const inventory = await prisma.inventory.findUnique({

        where: { invId: parseInt(params.id) }
    })
    
    if (!inventory)
        return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })

    let completedBy = null;
    let completedAt = null;

    const updatedInventory = await prisma.inventory.update({
        where: { invId: parseInt(params.id) },
        data: body
    })

    const assignedRooms = await prisma.inventoryOnRooms.findMany({
        where: { invId: parseInt(params.id) }
    }
    )

    // // delete removed relationships
    let multiRemove: any = { "roomId_invId": [] }
    assignedRooms.map((existingRoom: any) => {
        (bodyRooms.find((el: any) => parseInt(el) === existingRoom.roomId)) ? "" : multiRemove.roomId_invId.push(

            {
                invId: parseInt(params.id),
                roomId: parseInt(existingRoom.roomId)
            }
        )
    })

    // // create new relationships
    let multiAdd: any = []
    bodyRooms.map((selectedRoom: any) => {
        (assignedRooms.find((el: any) => el.roomId === parseInt(selectedRoom))) ? "" : multiAdd.push(

            {
                invId: parseInt(params.id),
                roomId: parseInt(selectedRoom),
                assignedAt: new Date(),
                assignedBy: "API"
            }
        )
    })

    
    multiRemove?.roomId_invId.forEach(async (inventoryOnRooms : any) => {

        await prisma.inventoryOnRooms.delete({
            where: {
                roomId_invId: {
                    invId: inventoryOnRooms.invId,
                    roomId: inventoryOnRooms.roomId
                }
        }})
    }    
    );


    if (multiAdd.length > 0) {
        await prisma.inventoryOnRooms.createMany({
            data: multiAdd
        })
    }

    return NextResponse.json(updatedInventory);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const inventory = await prisma.inventory.findUnique({

        where: { invId: parseInt(params.id) }
    })
    if (!inventory)
        return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })

    const updatedInventory = await prisma.inventory.delete({
        where: { invId: parseInt(params.id) }
    })

    await prisma.inventoryOnRooms.deleteMany({
        where:
            { invId: parseInt(params.id) }
    })

    return NextResponse.json(updatedInventory);
}