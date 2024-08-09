import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();

    const newTask = await prisma.maintenanceTask.createMany({
        data: body
    })
    return NextResponse.json(newTask, {status: 201})
}