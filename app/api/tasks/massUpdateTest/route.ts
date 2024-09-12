import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest) {
    const body = await request.json();

    console.log(body);

    let UpdateData : any= [] 
    body.forEach((element: any) => {
      UpdateData.push(
        element.original.taskId        
      )  
    });
    console.log(UpdateData)

    const newTask = await prisma.maintenanceTask.updateMany({
        where: {
            taskId: {
                in: UpdateData}},
                data: {
                    "taskName": "new"
                }
    })
    return NextResponse.json(newTask, {status: 201})
}