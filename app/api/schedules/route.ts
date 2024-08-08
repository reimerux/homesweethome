import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";

export async function GET(request: NextRequest){
    const taskschedules = await prisma.taskSchedule.findMany({
        include: {task: true },
        orderBy: {nextDueDate: 'asc'}
    });
    return NextResponse.json(taskschedules);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body)
    
    const schedule = await prisma.taskSchedule.create({
        data: {
            taskId: parseInt(body.taskId),
            nextDueDate: new Date(body.nextDueDate).toISOString(),
            lastCompletedDate: body.lastCompletionDate,
            notes: body.notes
        }

    })
    
    return NextResponse.json(schedule, {status: 201});

}