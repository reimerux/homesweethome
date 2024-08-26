import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'; 
import prisma from "@/prisma/client";


export async function GET(request: NextRequest){
    const tasks = await prisma.issue.findMany();
    return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    // const validation = createTaskSchema.safeParse(body);
    // if (!validation.success)
    //     return NextResponse.json({error: 'Validation not successful!'},{status: 400}        ) 

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
            priority: body.priority,
            status: body.status,
            createdBy: 1,
            notes: body.notes
        }
    })

    // create new relationships
    let multiAdd: any = []
    body.rooms.map((selectedRoom: any) => {
        multiAdd.push(

            {
                issueId: newIssue.issueId,
                roomId: parseInt(selectedRoom),
                assignedAt: new Date(),
                assignedBy: "API"
            }
        )
    })

    if (multiAdd.length > 0) {
        await prisma.roomsOnIssues.createMany({
            data: multiAdd
        })
    }


    return NextResponse.json(newIssue, {status: 201})
}