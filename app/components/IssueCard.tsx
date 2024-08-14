import { Importance, Status } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react'
import { MdArrowForwardIos, MdWarningAmber } from 'react-icons/md';
import ImportanceBadge from './ImportanceBadge';

type Props = {
    issue: any
}

const IssueCard = ({ issue }: Props) => {
    return (
        <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100"  >
            <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900"            >
                <MdWarningAmber />
            </span>
            <div className="flex flex-col flex-1">
                <h3 className="text-md font-medium">{issue.title}</h3>
                <div className="divide-x divide-gray-200 mt-auto">
                    <span
                        className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                    ><ImportanceBadge importance={issue.priority}/></span                    >
                    <span                        className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                    >{format(issue.created_at, "MM/dd/yy")}</span                    >
                </div>
            </div>
            <MdArrowForwardIos />
        </div>
    )
}

export default IssueCard