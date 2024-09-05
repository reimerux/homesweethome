import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();

    const newIssue = await prisma.issue.createMany({
        data: body
    })
    return NextResponse.json(newIssue, {status: 201})
}