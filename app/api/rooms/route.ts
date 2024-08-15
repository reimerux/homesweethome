import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";

export async function GET(request: NextRequest){
    const rooms = await prisma.room.findMany();
    return NextResponse.json(rooms);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
   
    const room = await prisma.room.create({
        data: {
            name: body.name,
            notes: body.notes,
            shortName: body.shortName,
            houseId: 1
        }

    })
    
    return NextResponse.json(room, {status: 201});

}