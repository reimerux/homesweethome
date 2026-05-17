import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const task = await prisma.taskSchedule.findUnique({
        where: { scheduleId: parseInt(id) },
        include: { task: true }
    })
    if (!task)
        return NextResponse.json({ error: "Scheduled Task not found" }, { status: 404 })

    return NextResponse.json(task);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const task = await prisma.taskSchedule.findUnique({
        where: { scheduleId: parseInt(id) }
    })
    if (!task)
        return NextResponse.json({ error: "Task not found" }, { status: 404 })

    const updatedUser = await prisma.taskSchedule.update({
        where: { scheduleId: task.taskId },
        data: {
            status: body.taskName,
            lastCompletedDate: body.description
        }
    })

    return NextResponse.json(updatedUser);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const task = await prisma.taskSchedule.findUnique({
        where: { scheduleId: parseInt(id) }
    })

    console.log(task)
    if (!task)
        return NextResponse.json({ error: "Schedule not found" }, { status: 404 })

    const deletedtask = await prisma.taskSchedule.delete({
        where: { scheduleId: parseInt(id) }
    })

    return NextResponse.json(deletedtask);
}
