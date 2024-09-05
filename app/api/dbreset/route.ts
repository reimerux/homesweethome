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
    
    objects.map(async(object: any, i: number) =>  {
        const tableName=object.tablename
        const deleted = await (prisma[tableName] as any).deleteMany({})

        console.log(tableName + " : " + deleted.count)

    })

    
    return NextResponse.json({}, {status: 201});

}