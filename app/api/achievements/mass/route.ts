import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();

console.log(body)

    const newAchievements = await prisma.achievement.createMany({
        data: body
    })
    return NextResponse.json(newAchievements, {status: 201})
}