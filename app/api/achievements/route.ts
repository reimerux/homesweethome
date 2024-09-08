import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getWeek, getYear } from "date-fns";
import { stripPrismaArray } from "@/app/components/URfunctions";


// Types of achievements:
// total number - count of objects (can be evaluated when an event is triggered)
//   Issues completed
//   Tasks scheduled
// streaks - consecutive timeframe evaluations (is time dependent, only current & longest)
//  

async function calculateStreak(userId: number) {

  const allCompletedIssues = await prisma.issue.findMany({
    where: {
      AND: [
        { createdBy: userId }, { status: "COMPLETED" }]
    },
    orderBy: { completedAt: 'desc' }
  })

  if (allCompletedIssues.length === 0) return { "currentStreak": 0, "longestStreak": 0 }

  const currentWeek: number = getWeek(new Date()) + getYear(new Date()) * 100

  let weeksOfCompletedIssue: Array<number> = []

  allCompletedIssues.forEach((issue, i) => {
    const weekOfIssue = getWeek(issue.completedAt as Date) + getYear(issue.completedAt as Date) * 100;
    if (i === 0) { weeksOfCompletedIssue.push(weekOfIssue) }
    else
      if (weekOfIssue !== weeksOfCompletedIssue[i - 1]) weeksOfCompletedIssue.push(weekOfIssue)
  });


  let currentStreak = 0
  let currentStreakActive = true
  let longestStreak = 0
  let longestStreakCounter = 0
  weeksOfCompletedIssue.forEach((week, i, weeks) => {

    // ignore current week
    if (week === currentWeek) return
    // check whether streak is broken
    if (weeks[i - 1] - week != 1) {
      currentStreakActive = false;
      if (longestStreak < longestStreakCounter) longestStreak = longestStreakCounter
      longestStreakCounter = 0
    } else {
      if (currentStreakActive) currentStreak = currentStreak + 1
      ++longestStreakCounter
    }
    // account for last week including in longest streak
    if (i === weeksOfCompletedIssue.length - 1) { if (longestStreak < longestStreakCounter) longestStreak = longestStreakCounter }
  });

  return { "currentStreak": currentStreak, "longestStreak": longestStreak }


  //ToDo: Need to add Tasks
}

async function calculateTotal(userId: number) {

  const countIssues = await prisma.issue.count({
    where: {
      AND: [
        { createdBy: userId }, { status: "COMPLETED" }]
    }
  })
  const countTasks = await prisma.taskSchedule.count()

  return { "issues": countIssues, "tasks": countTasks }

}

async function evaluateAchievements(userId: number, streaks: any, count: any) {
  let newAchievements: any = [];

  const currentAchievements = await prisma.achievementOnUsers.findMany({
    where: { userId: userId }
  })

  const achievementsConditions = await prisma.achievement.findMany()

  // console.log('Current Achievements')
  // console.log(currentAchievements);

  achievementsConditions.forEach(condition => {
    if (!currentAchievements.find((element) => element.achievementId === condition.achievementId)) {

      if (condition.category === "ISSUES") {
        if (condition.target <= count.issues) {
          newAchievements.push({
            "achievementId": condition.achievementId,
            "userId": userId,
            "unlockedAt": new Date(),
            "name": condition.name
          })
        }
      };

      if (condition.category === "STREAK") {
        // console.log(condition.target + " vs " +streaks.currentStreak )
        if (condition.target <= streaks.currentStreak) {
          newAchievements.push({
            "achievementId": condition.achievementId,
            "userId": userId,
            "unlockedAt": new Date(),
            "name": condition.name
          })
        }
      }
    }
  })

  return newAchievements
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = parseInt(body.userId);

  const countTotals = await calculateTotal(userId)

  const streaks = await calculateStreak(userId)

  const newAchievements: any = await evaluateAchievements(userId, streaks, countTotals)
  const achievementData = stripPrismaArray(prisma.achievementOnUsers, newAchievements)
  // console.log(achievementData)
          const newAchievement = await prisma.achievementOnUsers.createMany({
        data: achievementData,
        skipDuplicates: true
      })

  return NextResponse.json(newAchievements, { status: 201 });

}

