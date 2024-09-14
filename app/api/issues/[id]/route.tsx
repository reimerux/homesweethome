import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({

        where: { issueId: parseInt(params.id) }
    })
    if (!issue)
        return NextResponse.json({ error: "Issue not found" }, { status: 404 })


    return NextResponse.json(issue);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const body = await request.json();
    const issue = await prisma.issue.findUnique({

        where: { issueId: parseInt(params.id) }
    })
    
    if (!issue)
        return NextResponse.json({ error: "Room not found" }, { status: 404 })

    let completedBy = null;
    let completedAt = null;
    if (body.status === "COMPLETED" && issue.status!="COMPLETED") {completedBy=parseInt(body.userId); completedAt=new Date()}

// console.log(completedBy)

    const updatedIssue = await prisma.issue.update({
        where: { issueId: parseInt(params.id) },
        data: 
        {
        title: body.title,
        description: body.description,
        priority: body.priority,
        status: body.status,
        updatedAt: new Date(),
        completedAt: completedAt,
        completedBy: completedBy,
        notes: body.notes
        }
    })

    const assignedRooms = await prisma.roomsOnIssues.findMany({
        where: { issueId: parseInt(params.id) }
    }
    )

    // delete removed relationships
    let multiRemove: any = { "issueId_roomId": [] }
    assignedRooms.map((existingRoom: any) => {
        (body.rooms.find((el: any) => parseInt(el) === existingRoom.roomId)) ? "" : multiRemove.issueId_roomId.push(

            {
                issueId: parseInt(params.id),
                roomId: parseInt(existingRoom.roomId)
            }
        )
    })

    // create new relationships
    let multiAdd: any = []
    body.rooms.map((selectedRoom: any) => {
        (assignedRooms.find((el: any) => el.roomId === parseInt(selectedRoom))) ? "" : multiAdd.push(

            {
                issueId: parseInt(params.id),
                roomId: parseInt(selectedRoom),
                assignedAt: new Date(),
                assignedBy: "API"
            }
        )
    })

    
    multiRemove?.issueId_roomId.forEach(async (roomOnIssue : any) => {

        await prisma.roomsOnIssues.delete({
            where: {
                issueId_roomId: {
                    issueId: roomOnIssue.issueId,
                    roomId: roomOnIssue.roomId
                }
        }})
    }    
    );


    if (multiAdd.length > 0) {
        await prisma.roomsOnIssues.createMany({
            data: multiAdd
        })
    }

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({

        where: { issueId: parseInt(params.id) }
    })
    if (!issue)
        return NextResponse.json({ error: "Issue not found" }, { status: 404 })

    const updatedIssue = await prisma.issue.delete({
        where: { issueId: parseInt(params.id) }
    })

    await prisma.roomsOnIssues.deleteMany({
        where:
            { issueId: parseInt(params.id) }
    })

    return NextResponse.json(updatedIssue);
}