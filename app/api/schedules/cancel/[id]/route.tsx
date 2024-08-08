import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params: { id: number }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const body = await request.json();
    const task = await prisma.taskSchedule.findUnique({

        where: { scheduleId: parseInt(params.id) }
    })
    if (!task)
        return NextResponse.json({ error: "Scheduled Task not found" }, { status: 404 })

    const updatedTask = await prisma.taskSchedule.update({
        where: { scheduleId: task.taskId },
        data: {
            status: 'CANCELLED',
            notes: body.notes
        }
    })

    return NextResponse.json(updatedTask);
}

