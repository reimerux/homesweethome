import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number}
}

export async function GET(
    request: NextRequest,
    {params}: {params: { id: string}}){
    const issue = await prisma.issue.findUnique({

        where: {issueId: parseInt(params.id)}
    })
        if (!issue)
        return NextResponse.json({error: "Issue not found"}, {status: 404})
        
    
    return NextResponse.json(issue);
}

export async function PUT(
    request: NextRequest,
    {params}: {params: { id: string}}){
        const body = await request.json();
    const issue = await prisma.issue.findUnique({

        where: {issueId: parseInt(params.id)}
    })
        if (!issue)
        return NextResponse.json({error: "Room not found"}, {status: 404})
        
    const updatedIssue = await prisma.issue.update({
        where: { issueId: parseInt(params.id)},
        data: body
    })

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    {params} : {params: {id: string}}){
    const issue = await prisma.issue.findUnique({

        where: {issueId: parseInt(params.id)}
    })
        if (!issue)
        return NextResponse.json({error: "Issue not found"}, {status: 404})
        
    const updatedIssue = await prisma.issue.delete({
        where: { issueId: parseInt(params.id)}
        })

        return NextResponse.json(updatedIssue);
    }