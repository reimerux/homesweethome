import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";

export async function GET(request: NextRequest){
    // const data = await prisma.taskHistory.groupBy(
    //     {by: ["datePerformed","taskId"],
    //     _count: {
    //         taskId: true,
    //       },}
    // );
    const data = await prisma.taskHistory.groupBy({
        by: ["monthPerformed","yearPerformed","status"],
        _count: { taskId: true, historyId: true},
        having: {
            status: { in: ['COMPLETED']}
        }
    }
            )
    return NextResponse.json(data);
}