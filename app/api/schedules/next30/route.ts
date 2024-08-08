import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";
import { addDays } from "@/app/components/URfunctions";

export async function GET(request: NextRequest){
    const taskschedules = await prisma.taskSchedule.findMany({
        where:
        {nextDueDate: {lt: addDays(new Date(),30)}},
        include: {task: true },
        orderBy: {nextDueDate: 'asc'}
    });
    return NextResponse.json(taskschedules);
}