import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const task = await prisma.maintenanceTask.findUnique({

        where: { taskId: parseInt(params.id) }
    })
    if (!task)
        return NextResponse.json({ error: "Task not found" }, { status: 404 })


    return NextResponse.json(task);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const body = await request.json();
    const task = await prisma.maintenanceTask.findUnique({

        where: { taskId: parseInt(params.id) }
    })
    if (!task)
        return NextResponse.json({ error: "Task not found" }, { status: 404 })


    const allRooms = await prisma.room.findMany()
    const assignedRooms = await prisma.roomsOnTasks.findMany({
        where: { taskId: parseInt(params.id) }
    }
    )

    // delete removed relationships
    let multiRemove: any = { "taskId_roomId": [] }
    assignedRooms.map((existingRoom: any) => {
        (body.rooms.find((el: any) => parseInt(el) === existingRoom.roomId)) ? "" : multiRemove.taskId_roomId.push(

            {
                taskId: parseInt(params.id),
                roomId: parseInt(existingRoom.roomId)
            }
        )
    })

    // create new relationships
    let multiAdd: any = []
    body.rooms.map((selectedRoom: any) => {
        (assignedRooms.find((el: any) => el.roomId === parseInt(selectedRoom))) ? "" : multiAdd.push(

            {
                taskId: parseInt(params.id),
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

    multiRemove.taskId_roomId.forEach(async (taskonroom : any) => {

        await prisma.roomsOnTasks.delete({
            where: {
                taskId_roomId: {
                    taskId: taskonroom.taskId,
                    roomId: taskonroom.roomId
                }
        }})
    }    
    );


    if (multiAdd.length > 0) {
        await prisma.roomsOnTasks.createMany({
            data: multiAdd
        })
    }

 
    return NextResponse.json(updatedTask);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const taskUsage = await prisma.taskSchedule.count({
        where: { taskId: parseInt(params.id) }
    });
    console.log(taskUsage)
    if (taskUsage > 1)
        return NextResponse.json({ error: "Task is scheduled. Remove all schedules first." }, { status: 404 })

    const updatedUser = await prisma.maintenanceTask.delete({
        where: { taskId: parseInt(params.id) }
    })

    return NextResponse.json(updatedUser);
}