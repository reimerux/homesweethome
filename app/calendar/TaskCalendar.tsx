"use client"
import axios from 'axios'
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
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import TaskCardDraggable from '../components/TaskCardDraggable'
import { classNames } from '../components/URfunctions'
import CalendarDayIndicator from '../components/CalendarDayIndicator'


type Props = {
    tasks: any
}

const TaskCalendar = ({ tasks }: Props) => {
    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    const [items, setItems] = useState(tasks);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dropIndex, setDropIndex] = useState<number | null>(null);
    const router = useRouter()

    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    const handleDragStart = (e: any) => {
        setDraggedIndex(e);
    };

    const handleDragOver = (event: any) => {
        setDropIndex(event.target.id);
        event.preventDefault();
    };

    const handleDrop = async () => {
        // console.log("Dropped: " + draggedIndex + " to " + dropIndex)
        const saveMonth = currentMonth;
        setDropIndex(null);
        try {
            await axios.put("/api/schedules/" + draggedIndex + "/push", { calcDueDate: dropIndex, notes: "pushed via calendar" })
            toast.success("Task has been moved");
            router.refresh();
        }
        catch (error) { console.log(error) }
    };

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
        isSameDay(toZonedTime(task.nextDueDate, 'Europe/London'), selectedDay)
    )

    return (
        <>
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                <div className="md:pr-14">
                    <div className="flex items-center">
                        <h2 className="flex-auto font-semibold text-gray-900">
                            {formatInTimeZone(firstDayCurrentMonth, 'Europe/London', 'MMMM yyyy')}
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
                        {days.map((day, dayIdx) => {
                            day = toZonedTime(day, "Europe/London");
                            return (
                                <div key={day.toString()} id={day.toString()} onDrop={handleDrop} onDragOver={(e) => handleDragOver(e)}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5 mt-2'
                                    )}>
                                    <button type="button" id={day.toString()}
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
                                        <time id={day.toString()} dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                                    </button>
                                    <div className="w-1 h-1 mx-5 mb-1" id={day.toString()}>
                                        {items.some((task: any) =>
                                            isSameDay(toZonedTime(task.nextDueDate, 'Europe/London'), day)
                                        ) && (
                                                <CalendarDayIndicator items={items} day={day}/>
                                            )}
                                    </div>
                                </div>
                            )
                        }
                        )}


                    </div>
                </div>
                <section className="mt-12 md:mt-0 md:pl-14">
                    <h2 className="font-semibold text-gray-900">
                        Schedule for{' '}
                        <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                            {format(selectedDay, 'EE MMM dd, yyy')}
                        </time>
                    </h2>
                    <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                        {selectedDayTasks.length > 0 ? (
                            selectedDayTasks.map((task: any, index: number) => (
                                <TaskCardDraggable task={task} key={task.scheduleId}
                                    color={task.color}
                                    index={task.scheduleId}
                                    onDragStart={handleDragStart} />

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