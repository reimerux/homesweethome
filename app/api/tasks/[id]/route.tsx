import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const task = await prisma.maintenanceTask.findUnique({
        where: { taskId: parseInt(id) }
    })
    if (!task)
        return NextResponse.json({ error: "Task not found" }, { status: 404 })

    return NextResponse.json(task);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const task = await prisma.maintenanceTask.findUnique({
        where: { taskId: parseInt(id) }
    })
    if (!task)
        return NextResponse.json({ error: "Task not found" }, { status: 404 })

    const assignedRooms = await prisma.roomsOnTasks.findMany({
        where: { taskId: parseInt(id) }
    })

    let multiRemove: any = { "taskId_roomId": [] }
    assignedRooms.map((existingRoom: any) => {
        (body.rooms.find((el: any) => parseInt(el) === existingRoom.roomId)) ? "" : multiRemove.taskId_roomId.push(
            {
                taskId: parseInt(id),
                roomId: parseInt(existingRoom.roomId)
            }
        )
    })

    let multiAdd: any = []
    body.rooms.map((selectedRoom: any) => {
        (assignedRooms.find((el: any) => el.roomId === parseInt(selectedRoom))) ? "" : multiAdd.push(
            {
                taskId: parseInt(id),
                roomId: parseInt(selectedRoom),
                assignedAt: new Date(),
                assignedBy: "API"
            }
        )
    })

    const updatedTask = await prisma.maintenanceTask.update({
        where: { taskId: task.taskId },
        data: {
            taskName: body.taskName,
            description: body.description,
            importance: body.importance,
            frequency: body.frequency,
            timeEstimate: parseInt(body.timeEstimate),
            season: body.season
        }
    })

    multiRemove.taskId_roomId.forEach(async (taskonroom: any) => {
        await prisma.roomsOnTasks.delete({
            where: {
                taskId_roomId: {
                    taskId: taskonroom.taskId,
                    roomId: taskonroom.roomId
                }
            }
        })
    })

    if (multiAdd.length > 0) {
        await prisma.roomsOnTasks.createMany({
            data: multiAdd
        })
    }

    return NextResponse.json(updatedTask);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const taskUsage = await prisma.taskSchedule.count({
        where: { taskId: parseInt(id) }
    });
    console.log(taskUsage)
    if (taskUsage > 1)
        return NextResponse.json({ error: "Task is scheduled. Remove all schedules first." }, { status: 404 })

    await prisma.roomsOnTasks.deleteMany({
        where: { taskId: parseInt(id) }
    })

    const updatedTask = await prisma.maintenanceTask.delete({
        where: { taskId: parseInt(id) }
    })

    return NextResponse.json(updatedTask);
}
