import { isSameDay } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import React from 'react'
import { Tooltip } from 'recharts'

type Props = {
  day: Date,
  items: any
}

const CalendarDayIndicator = ({ items, day }: Props) => {
  const count: number = items.filter((task: any) => isSameDay(toZonedTime(task.nextDueDate, 'Europe/London'), day)).length
  const IconNo: number = (count > 10) ? 10 : count;

  return (
    <div className="tooltip tooltip-right" data-tip={count + " task" + ((count>1)? "s":"")}>
      <progress className="progress w-4" value={IconNo * 10} max="100"></progress>
      </div>
    )
}

export default CalendarDayIndicator