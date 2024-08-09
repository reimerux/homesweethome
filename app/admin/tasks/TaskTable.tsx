import ImportanceBadge from '@/app/components/ImportanceBadge';
import SeasonBadge from '@/app/components/SeasonBadge';
import prisma from '@/prisma/client';
import { Frequency, Importance } from '@prisma/client';
import Link from 'next/link';
import React, { cache } from 'react'

interface Task {
    taskId: number;
    taskName: string;
    description: string;
    importance: Importance;
    frequency: Frequency;
}

const TaskTable = async () => {
    const tasks =  await prisma.maintenanceTask.findMany(); 
    return (
        <div className="rounded-md border">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Importance</th>
                        <th>Frequency</th>
                        <th>Season</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => <tr key={task.taskId}>
                        <td><Link className="btn btn-sm"  href={'/admin/tasks/' + task.taskId + '/edit'}>Edit</Link></td>
                        <td>{task.taskName}</td>
                        <td>{task.description}</td>
                        <td><ImportanceBadge importance={task.importance} /></td>
                        <td>{task.frequency}</td>
                        <td><SeasonBadge season={task.season}/></td>
                    </tr>)}
                </tbody>
            </table>

        </div>
    )
}

export default TaskTable