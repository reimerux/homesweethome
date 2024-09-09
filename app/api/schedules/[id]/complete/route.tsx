import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { fromZonedTime } from "date-fns-tz";

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
            datePerformed: fromZonedTime(body.completionDate, "America/Los_Angeles"),
            monthPerformed: fromZonedTime(body.completionDate, "America/Los_Angeles").getMonth()+1,
            yearPerformed: fromZonedTime(body.completionDate, "America/Los_Angeles").getFullYear(),
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

