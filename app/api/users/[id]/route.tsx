import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params: { id: number}
}

export async function GET(
    request: NextRequest,
    {params}: {params: { id: string}}){
    const user = await prisma.user.findUnique({

        where: {id: parseInt(params.id)}
    })
        if (!user)
        return NextResponse.json({error: "User not found"}, {status: 404})
        
    
    return NextResponse.json(user);
}

export async function PUT(
    request: NextRequest,
    {params}: {params: { id: string}}){
        const body = await request.json();
    const user = await prisma.user.findUnique({

        where: {id: parseInt(params.id)}
    })
        if (!user)
        return NextResponse.json({error: "User not found"}, {status: 404})
        
    const updatedUser = await prisma.user.update({
        where: { id: user.id},
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email

        }
    })

    return NextResponse.json(updatedUser);
}

export async function DELETE(
    request: NextRequest,
    {params} : {params: {id: string}}){
        const body = await request.json();
    const user = await prisma.user.findUnique({

        where: {id: parseInt(params.id)}
    })
        if (!user)
        return NextResponse.json({error: "User not found"}, {status: 404})
        
    const updatedUser = await prisma.user.delete({
        where: { id: user.id}
        })

        return NextResponse.json(updatedUser);
    }