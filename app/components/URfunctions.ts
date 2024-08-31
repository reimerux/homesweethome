import { Frequency } from "@prisma/client";


export function date_diff_indays(date1: Date, date2: Date) {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
    (1000 * 60 * 60 * 24)
  );
};

export function formatDateWithDiff(date: Date) {
  const dt = new Date(date);
  let response = dt.toDateString();
  let diff = date_diff_indays(new Date(), dt);

  if (diff === 0) { response += " (today)" } else
    if (diff === 1) { response += " (tomorrow)" } else
      if (diff === -1) { response += " (yesterday)" } else
        if (diff > 0) { response += " ( " + diff + " Days left)" } else
          if (diff < 0) { response += " ( " + Math.abs(diff) + " Days ago)" };

  return response;
}

export function dateColor(date: string) {
  var response = "text-slate-500"

  if (new Date(date) < new Date()) { response = "text-red-500" }

  return response
}

export function addDays(dt: Date, Days: number) {

  return new Date(dt.setDate(dt.getDate() + Days));
}

export function calcDueDate(frequency: Frequency, date: string) {
  const dt = new Date(date);

  let response = dt;
  console.log(frequency);

  switch (frequency) {
    case 'WEEKLY':
      response = addDays(dt, 7);
      break;
    case 'MONTHLY':
      response = addDays(dt, 30);
      break;
    case 'QUARTERLY':
      response = addDays(dt, 90);
      console.log("Quarter");
      break;
    case 'YEARLY':
      response = addDays(dt, 365);
      break;

    default:
      break;
  }

  return response
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

