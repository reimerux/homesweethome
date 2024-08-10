import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params: { id: number}
}

export async function GET(
    request: NextRequest,
    {params}: {params: { id: string}}){
    const room = await prisma.room.findUnique({

        where: {roomId: parseInt(params.id)}
    })
        if (!room)
        return NextResponse.json({error: "Room not found"}, {status: 404})
        
    
    return NextResponse.json(room);
}

export async function PUT(
    request: NextRequest,
    {params}: {params: { id: string}}){
        const body = await request.json();
    const room = await prisma.room.findUnique({

        where: {roomId: parseInt(params.id)}
    })
        if (!room)
        return NextResponse.json({error: "Room not found"}, {status: 404})
        
    const updatedroom = await prisma.room.update({
        where: { roomId: parseInt(params.id)},
        data: {
            name: body.name,
            notes: body.notes
        }
    })

    return NextResponse.json(updatedroom);
}

export async function DELETE(
    request: NextRequest,
    {params} : {params: {id: string}}){
    const room = await prisma.room.findUnique({

        where: {roomId: parseInt(params.id)}
    })
        if (!room)
        return NextResponse.json({error: "Room not found"}, {status: 404})
        
    const updatedRoom = await prisma.room.delete({
        where: { roomId: parseInt(params.id)}
        })

        return NextResponse.json(updatedRoom);
    }