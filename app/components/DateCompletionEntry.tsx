import { format } from 'date-fns'
import React, { ReactElement } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { classNames } from './URfunctions'
import { MdCalendarMonth, MdCheckCircle } from 'react-icons/md'


type Props = {
    Date: Date,
    register: UseFormRegisterReturn,
    fieldName: string,
    start: boolean

}

const DateCompletionEntry = ({ Date, register,fieldName,start }: Props): ReactElement => {
    return (
        <li>
            <hr className={(start) ? "bg-primary":""} />
            <div className="timeline-start sm:w-64 text-center">{fieldName}</div>
            <div className="timeline-middle">{(start) ? <MdCheckCircle className="text-primary h-7 w-7"/> : <MdCalendarMonth className="text-ghost h-7 w-7"/>}</div>
            <input type="date" aria-label={fieldName} className='timeline-end w-200 border border-gray-300 rounded-md' value={format(Date, 'yyyy-MM-dd')} {...register}></input>
            <hr />
        </li>
    )
}

export default DateCompletionEntry