import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params: { id: number}
}

export async function GET(
    request: NextRequest,
    {params}: {params: { id: string}}){
    const task = await prisma.taskSchedule.findUnique({

        where: {scheduleId: parseInt(params.id)},
        include: {task: true }
    })
        if (!task)
        return NextResponse.json({error: "Scheduled Task not found"}, {status: 404})
        
    
    return NextResponse.json(task);
}

export async function PUT(
    request: NextRequest,
    {params}: {params: { id: string}}){
        const body = await request.json();
    const task = await prisma.taskSchedule.findUnique({

        where: {scheduleId: parseInt(params.id)}
    })
        if (!task)
        return NextResponse.json({error: "Task not found"}, {status: 404})
        
    const updatedUser = await prisma.taskSchedule.update({
        where: { scheduleId: task.taskId},
        data: {
            status: body.taskName,
            lastCompletedDate: body.description
        }
    })

    return NextResponse.json(updatedUser);
}

export async function DELETE(
    request: NextRequest,
    {params} : {params: {id: string}}){
        const body = await request.json();
    const task = await prisma.taskSchedule.findUnique({

        where: {scheduleId: parseInt(params.id)}
    })
        
    console.log(task)
    if (!task)
        return NextResponse.json({error: "Schedule not found"}, {status: 404})
        
    const deletedtask = await prisma.taskSchedule.delete({
        where: {scheduleId: parseInt(params.id)}
        })

        return NextResponse.json(deletedtask);
    }