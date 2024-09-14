import React from 'react'
import HistoryIssueTable from './HistoryIssueTable'

const IssuePage = () => {
    return (
        <div className="p-3">
            <section className="flex my-4 px-4">
                <HistoryIssueTable />
            </section>
        </div>
    )
}

export default IssuePage