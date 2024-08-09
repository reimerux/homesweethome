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

    const updatedTaskHistory = await prisma.taskHistory.create({
        data: {
            datePerformed: new Date(body.completionDate),
            monthPerformed: new Date(body.completionDate).getMonth(),
            yearPerformed: new Date(body.completionDate).getFullYear(),
            taskId: parseInt(body.taskId),
            status: "COMPLETED",
            notes: body.notes
        }
    })

    const updatedTask = await prisma.taskSchedule.update({
        where: { scheduleId: parseInt(params.id) },
        data: {
            lastCompletedDate: new Date(body.completionDate),
            nextDueDate: new Date(body.calcDueDate),
            notes: body.notes
        }
    })

    return NextResponse.json(updatedTask);
}

