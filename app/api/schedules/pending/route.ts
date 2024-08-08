import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";

export async function GET(request: NextRequest){
    const taskschedules = await prisma.taskSchedule.findMany({
        where:
        {status: 'PENDING'},
        include: {task: true },
        orderBy: {nextDueDate: 'asc'}
    });
    return NextResponse.json(taskschedules);
}