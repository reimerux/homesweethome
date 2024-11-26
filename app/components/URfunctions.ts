import prisma from "@/prisma/client";
import { Frequency } from "@prisma/client";
import { add, differenceInDays, format, lightFormat } from "date-fns";
import {formatInTimeZone} from 'date-fns-tz';



export function formatDateWithDiff(date: Date) {
  
  let response = formatInTimeZone(date,'Europe/London', "EEE MMM dd yyyy");
  let diff = differenceInDays(new Date(), date);

  if (diff === 0) { response += " (today)" } else
    if (diff === 1) { response += " (tomorrow)" } else
      if (diff === -1) { response += " (yesterday)" } else
        if (diff < 0) { response += " (" + Math.abs(diff) + " Days left)" } else
          if (diff > 0) { response += " (" + Math.abs(diff) + " Days ago)" };

  return response;
}

export function dateColor(date: string) {
  var response = "text-slate-500"

  if (new Date(date) < new Date()) { response = "text-red-500" }

  return response
}

export function calcDueDate(frequency: Frequency, date: Date) {
  const dt = new Date(date);

  let response = dt;
  // console.log(frequency);

  switch (frequency) {
    case 'WEEKLY':
      response = add(dt, {days: 7});
      break;
    case 'MONTHLY':
      response = add(dt, {months: 1});
      break;
    case 'QUARTERLY':
      response = add(dt, {months: 3})
      break;
    case 'YEARLY':
      response = add(dt, {years: 1});
      break;

    default:
      break;
  }

  return response
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export function stripPrismaArray(fields: any, data: any) {
  let response = [] as any
  data.map((record: any) => {
    response.push(stripPrisma(fields, record))
  })
  return response
}

export function stripPrisma<T extends {}>(input: {fields:{}},data: T) : T {
    
  let validKeys = Object.keys(input.fields);
  let dataCopy: any = {...data};
  console.log(dataCopy)
  console.log(validKeys)
  for(let key of Object.keys(data)) {

      if(!(validKeys.includes(key))) {
          delete dataCopy[key];
      }
  }
  return dataCopy as T;
}

export async function metricCalc(metrics: any) {
  let results: any = []
    await Promise.all(metrics.map(async (metric: any, index: number) => {
        const tableName = metric.tablename
        const data = await (prisma[tableName] as any).findMany(metric.query)
        results.push({ id: index, title: metric.title, subtitle:metric.subtitle, name: metric.name, result: metric.postprocess(data) })
    }))

    return results
}

export function parseComments(data: any) {
if (!data) return []
try {
  return JSON.parse(data)
}
catch (error) {
  console.log(error)
  return []
}
}
