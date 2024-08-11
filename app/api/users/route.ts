import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
   
    const user = await prisma.user.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
        }

    })
    
    return NextResponse.json(user, {status: 201});

}