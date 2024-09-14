import { formatInTimeZone } from 'date-fns-tz'
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { MdCalendarMonth, MdCheckCircle } from 'react-icons/md'



type Props = {
    Date: Date,
    register: UseFormRegisterReturn,
    fieldName: string,
    start: boolean,
    children: ReactNode
}

const DateCompletionEntry = ({ Date, register,fieldName,start, children }: Props): ReactElement => {
    
    return (
        <li>
            <hr className={(start) ? "bg-primary":""} />
            <div className="timeline-start sm:w-64 text-center">{fieldName}</div>
            <div className="timeline-middle">{(start) ? <MdCheckCircle className="text-primary h-7 w-7"/> : <MdCalendarMonth className="text-ghost h-7 w-7"/>}</div>
            <div className='timeline-end'>
                <input type="date" aria-label={fieldName} className='w-200 border border-gray-300 rounded-md' value={formatInTimeZone(Date,'Europe/London', "yyyy-MM-dd")} {...register}></input>
            {children}
            </div>
            <hr />
        </li>
    )
}

export default DateCompletionEntry