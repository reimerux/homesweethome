import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest){
    const house = await prisma.house.findFirst();
    return NextResponse.json(house);
}

export async function PUT(
    request: NextRequest){
        const body = await request.json();
    const house = await prisma.house.findFirst()
        if (!house)
        return NextResponse.json({error: "House not found"}, {status: 404})
        
    const updatedHouse = await prisma.house.update({
        where: { houseId: 1},
        data: {
            street: body.street,
            city: body.city
        }
    })

    return NextResponse.json(updatedHouse);
}