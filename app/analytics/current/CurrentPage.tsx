import prisma from '@/prisma/client';
import { MaintenanceTask, taskSchedule } from '@prisma/client';
import { minutesToHours } from 'date-fns';
import React from 'react'

function calcAnnualEffort(scheduledTasks: Array<any>): number {
    let totalEffort = 0;
    scheduledTasks.forEach((task) => { (task.task.timeEstimate) ? 
        (task.task.frequency==="MONTHLY") ? totalEffort += task.task.timeEstimate * 12 : 
        (task.task.frequency==="QUARTERLY") ? totalEffort += task.task.timeEstimate * 4 : totalEffort += task.task.timeEstimate
        : null})
    return totalEffort
}

const CurrentPage = async () => {

    const scheduledTasks = await prisma.taskSchedule.findMany({include: {task: true}});
    const scheduledTaskCount = scheduledTasks.length;
    const currentIssues = await prisma.issue.count({
        where: { status: "PENDING" }
    });

    const totalEffort = calcAnnualEffort(scheduledTasks);

    return (
        <div className="p-3">
            <section className="flex my-4 px-4">
                <div className="stats stats-horizontal shadow w-46 mr-8">
                    <div className="stat">
                        <div className="stat-title">Scheduled Tasks</div>
                        <div className="stat-value">{scheduledTaskCount}</div>
                        <div className="stat-desc">Current</div>
                    </div>


                    <div className="stat">
                        <div className="stat-title">Open Issues</div>
                        <div className="stat-value">{currentIssues}</div>
                        <div className="stat-desc">Current</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Annual Scheduled Effort</div>
                        <div className="stat-value">{minutesToHours(totalEffort)} h</div>
                        <div className="stat-desc">Current</div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default CurrentPage