import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();

    const newRooms = await prisma.room.createMany({
        data: body
    })
    return NextResponse.json(newRooms, {status: 201})
}