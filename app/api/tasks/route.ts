import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createTaskSchema = z.object({
    taskName: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function GET(request: NextRequest) {
    const tasks = await prisma.maintenanceTask.findMany();
    return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: 'Validation not successful!' }, { status: 400 })


    const newTask = await prisma.maintenanceTask.create({
        data: { taskName: body.taskName, description: body.description, importance: body.importance, frequency: body.frequency, season: body.season }
    })

    // create new relationships
    let multiAdd: any = []
    body.rooms.map((selectedRoom: any) => {
        multiAdd.push(

            {
                taskId: newTask.taskId,
                roomId: parseInt(selectedRoom),
                assignedAt: new Date(),
                assignedBy: "API"
            }
        )
    })

    if (multiAdd.length > 0) {
        await prisma.roomsOnTasks.createMany({
            data: multiAdd
        })
    }

    return NextResponse.json(newTask, { status: 201 })
}