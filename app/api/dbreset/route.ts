import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";


export async function POST(request: NextRequest) {
    const objects=[
        {"tablename":"achievementOnUsers"},
        {"tablename":"issue"},
        {"tablename":"label"},
        {"tablename":"labelsonIssues"},
        {"tablename":"room"},
        {"tablename":"roomsOnIssues"},
        {"tablename":"roomsOnTasks"},
        {"tablename":"taskHistory"},
        {"tablename":"maintenanceTask"},
        {"tablename":"taskSchedule"}
    ]
    const response = [] as any
    await Promise.all(objects.map(async(object: any, i: number) =>  {
        const tableName=object.tablename
        const deleted = await (prisma[tableName] as any).deleteMany({})
        response.push({"table": tableName, "count" : deleted.count})

    }))
    
    
    return NextResponse.json(response, {status: 201});

}