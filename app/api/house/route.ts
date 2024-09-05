import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import preloadData from '../../seed.json'
import { House } from "@prisma/client";



export async function GET(request: NextRequest){
    const house = await prisma.house.findFirst().then((response) => {if (!response) prisma.house.create({
        data: preloadData.home as House
    })}) ;
    
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
export async function POST(
    request: NextRequest){
        console.log("POST HOuse")
    const house = await prisma.house.findFirst()
        if (!house)
        return NextResponse.json({error: "House not found"}, {status: 404})
        
    const newHouse = await prisma.house.create({
        data: preloadData.home as House
    })

    return NextResponse.json(newHouse);
}