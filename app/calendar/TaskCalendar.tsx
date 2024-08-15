"use client"
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    startOfToday
} from 'date-fns'
import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import { classNames } from '../components/URfunctions'


type Props = {
    tasks: any
}

const TaskCalendar =  ({tasks}: Props) => {
    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())


    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function thisMonth() {

        setCurrentMonth(format(today, 'MMM-yyyy'))
    }

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    let selectedDayTasks = tasks.filter((task: any) =>
        isSameDay(task.nextDueDate, selectedDay)
      )

    return (
        <>
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                <div className="md:pr-14">
                    <div className="flex items-center">
                        <h2 className="flex-auto font-semibold text-gray-900">
                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                            type="button"
                            onClick={thisMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span >Today</span>
                        </button>
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span >Previous</span>
                        </button>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span >Next</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    'py-1.5'
                                )}>
                                <button type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay) && 'text-white',
                                        !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        'text-red-500',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-900',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-400',
                                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                        isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        'bg-gray-900',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                        'font-semibold',
                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                    )}
                                >
                                    <time dateTime={format(day, 'yyy=MM-dd')}>{format(day, 'd')}</time>
                                </button>
                                <div className="w-1 h-1 mx-auto mt-1">
                                    {tasks.some((task: any) =>
                                        isSameDay(task.nextDueDate, day)
                                    ) && (
                                            <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                        )}
                                </div>
                            </div>
                        )
                        )}


                    </div>
                </div>
                <section className="mt-12 md:mt-0 md:pl-14">
                    <h2 className="font-semibold text-gray-900">
                        Schedule for{' '}
                        <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                            {format(selectedDay, 'MMM dd, yyy')}
                        </time>
                    </h2>
                    <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                        {selectedDayTasks.length > 0 ? (
                            selectedDayTasks.map((task: any) => (
                                <>
                                <TaskCard overflow={0} task={task} />
                                </>
                            ))
                        ) : (
                            <p>No meetings for today.</p>
                        )}
                    </ol>
                </section>
            </div>

        </>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

export default TaskCalendar