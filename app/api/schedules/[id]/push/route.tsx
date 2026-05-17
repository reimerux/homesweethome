import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const task = await prisma.taskSchedule.findUnique({
        where: { scheduleId: parseInt(id) }
    })
    if (!task)
        return NextResponse.json({ error: "Scheduled Task not found" }, { status: 404 })

    const updatedTask = await prisma.taskSchedule.update({
        where: { scheduleId: parseInt(id) },
        data: {
            nextDueDate: new Date(body.calcDueDate),
            notes: body.notes
        }
    })

    return NextResponse.json(updatedTask);
}
