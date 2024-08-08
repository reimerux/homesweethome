import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest){
    const tasks = await prisma.house.findFirst();
    return NextResponse.json(tasks);
}
