import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PUT(request: NextRequest) {
    const body = await request.json();

console.log(body)

    let objects: any = []
    body.map((element: any) => {
        objects.push({ "tablename": element.original.tableName })
    })

    console.log(objects)

    const response = [] as any
    await Promise.all(objects.map(async(object: any, i: number) =>  {
        const tableName=object.tablename
        const deleted = await (prisma[tableName] as any).deleteMany({})
        response.push({"table": tableName, "count" : deleted.count})

    }))

    return NextResponse.json("OK", { status: 201 });

}

export async function POST(request: NextRequest) {
    const objects = [
        { "tablename": "achievementOnUsers" },
        { "tablename": "issue" },
        { "tablename": "label" },
        { "tablename": "labelsonIssues" },
        { "tablename": "room" },
        { "tablename": "roomsOnIssues" },
        { "tablename": "roomsOnTasks" },
        { "tablename": "taskHistory" },
        { "tablename": "maintenanceTask" },
        { "tablename": "taskSchedule" }
    ]

    const response = [] as any
    await Promise.all(objects.map(async (object: any, i: number) => {
        const tableName = object.tablename
        const deleted = await (prisma[tableName] as any).deleteMany({})
        response.push({ "table": tableName, "count": deleted.count })

    }))


    return NextResponse.json("OK", { status: 201 });

}