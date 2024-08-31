import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import achievementsConditions from './achievementsConditions.json'

export async function POST(request: NextRequest) {
    const body = await request.json();
   
    const countIssues = await prisma.issue.count({
        where: {
          AND: [
            { createdBy: parseInt(body.userId) }, { status: "COMPLETED" }]
        }
      })
    
      let newAchievements: any = []
    
      achievementsConditions.forEach(condition => {
        if (condition.category != "ISSUES") return null
        if (condition.target < countIssues) {
          newAchievements.push({
            "achievementId": condition.achievement,
                  "userId": parseInt(body.userId),
                   "unlockedAt": new Date()
                })
        
        }
        
      });
    
      console.log(newAchievements)
              const newAchievement = await prisma.achievementOnUsers.createMany({
            data: newAchievements,
            skipDuplicates: true
          })

    return NextResponse.json(newAchievement, {status: 201});

}