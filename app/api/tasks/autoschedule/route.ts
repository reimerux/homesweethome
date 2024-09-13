import { calcDueDate } from "@/app/components/URfunctions";
import prisma from "@/prisma/client";
import { Frequency, Season } from "@prisma/client";
import { add, eachWeekendOfMonth, endOfQuarter, endOfYear, getYear, isPast, nextSaturday } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

function nextDate(date: Date, frequency: Frequency, season: Season) {
  let response = date;

  switch (frequency) {
    case 'WEEKLY':
      //next Saturday
      response = nextSaturday(date);
      break;
    case 'MONTHLY':
      // first Saturday next month
      response = eachWeekendOfMonth(add(date, { months: 1 }))[0];
      break;
    case 'QUARTERLY':
      // first Saturday next qurater
      response = eachWeekendOfMonth(add(endOfQuarter(date), { days: 1 }))[0];
      break;
    case 'YEARLY':
      // based on season
      let seasonDate = new Date(getYear(date), 3, 1, 0, 0);
      (season === 'SUMMER') ? seasonDate = add(seasonDate, { months: 3 }) :
        (season === 'FALL') ? seasonDate = add(seasonDate, { months: 6 }) :
          (season === 'WINTER') ? seasonDate = add(seasonDate, { months: 9 }) : null;
      if (isPast(seasonDate)) seasonDate = add(seasonDate, { years: 1 })
      response = eachWeekendOfMonth(seasonDate)[0];
      break;

    default:
      break;
  }

  return response;
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  await Promise.all(body.map(async (element: any) => {

  const task = element.original
  // based on frequency select new date
  console.log(task)
  
    await prisma.taskSchedule.create({
      data: {
        taskId: task.taskId,
        nextDueDate: nextDate(new Date(), task.frequency, task.season).toISOString(),
        notes: "auto-scheduled"
      }
    })
  }
  )
  )

  return NextResponse.json("new", { status: 201 })
}