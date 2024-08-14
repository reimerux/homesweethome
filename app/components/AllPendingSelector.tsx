import Link from 'next/link'
import React from 'react'
import { classNames } from './URfunctions';

type Props = {
    selection: string | null;
}

const IssueSelector = ({selection}: Props) => {
    return (
        <div className='join'>
            <Link className= {classNames(
                                    (selection === "all") ? 'btn-active':null,
                                    "btn btn-xs join-item"
                                )}
                                 href="./all">All</Link>
            <Link className={classNames(
                                    (selection === "pending") ? 'btn-active':null,
                                    "btn btn-xs join-item"
                                )} href="./pending">Pending</Link>
        </div>
    )
}

export default IssueSelector