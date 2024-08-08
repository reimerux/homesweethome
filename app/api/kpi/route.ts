import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";
import Kpis from "@/app/components/Kpis";

interface KPIs{
    ScheduledTasks: number,
    OverdueTasks: number,
    TasksCompleted: number
}

export async function GET(request: NextRequest){
    
    const response: KPIs = 
    { ScheduledTasks: 0,
        OverdueTasks: 0,
        TasksCompleted: 0};
    response.ScheduledTasks = await prisma.taskSchedule.count({});
    response.OverdueTasks = await prisma.taskSchedule.count({
        where:{
            nextDueDate: { lte: new Date()}
        }
    });
    response.TasksCompleted = await prisma.taskHistory.count({});
    
    return NextResponse.json(response);
}