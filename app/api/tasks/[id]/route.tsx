import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params: { id: number}
}

export async function GET(
    request: NextRequest,
    {params}: {params: { id: string}}){
    const task = await prisma.maintenanceTask.findUnique({

        where: {taskId: parseInt(params.id)}
    })
        if (!task)
        return NextResponse.json({error: "Task not found"}, {status: 404})
        
    
    return NextResponse.json(task);
}

export async function PUT(
    request: NextRequest,
    {params}: {params: { id: string}}){
        const body = await request.json();
    const task = await prisma.maintenanceTask.findUnique({

        where: {taskId: parseInt(params.id)}
    })
        if (!task)
        return NextResponse.json({error: "Task not found"}, {status: 404})
        
    const updatedUser = await prisma.maintenanceTask.update({
        where: { taskId: task.taskId},
        data: {
            taskName: body.taskName,
            description: body.description,
            importance: body.importance,
            frequency: body.frequency,
            season: body.season
        }
    })

    return NextResponse.json(updatedUser);
}

export async function DELETE(
    request: NextRequest,
    {params} : {params: {id: string}}){
        const body = await request.json();
    const task = await prisma.maintenanceTask.findUnique({

        where: {taskId: parseInt(params.id)}
    })
        if (!task)
        return NextResponse.json({error: "Task not found"}, {status: 404})
        
    const updatedUser = await prisma.user.delete({
        where: { id: task.taskId}
        })

        return NextResponse.json(updatedUser);
    }