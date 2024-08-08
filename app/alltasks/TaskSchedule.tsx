import Link from 'next/link';
import React from 'react'
import ImportanceBadge from '../components/ImportanceBadge';
import { MdCheck, MdRedo } from 'react-icons/md';
import axios from 'axios';

interface taskSchedule {
    scheduleId: number;
    task: {
        taskName: string;
        description: string;
        importance: string;
    }
    nextDueDate: Date;
    status: string;
}

type Props = {
    parameter: string;
};

const TaskSchedule = async (props: Props) => {

    var URL = 'http://localhost:3000/api/schedules';
    if (props.parameter === "PENDING") URL += '/next30'
    const results = await axios(URL);
    const tasks: taskSchedule[] = await results.data;

    return (

        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr><td></td>
                        <td>Task Name</td>
                        <td>Description</td>
                        <td>Due Date</td>
                        <td>Importance</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => <tr key={task.scheduleId}>
                        <td><Link className='btn btn-sm btn-primary' href={'/schedule/' + task.scheduleId + '/complete'}><MdCheck /></Link><Link className='btn btn-sm' href={'/schedule/' + task.scheduleId + '/push/'}><MdRedo /></Link></td>
                        <td>{task.task.taskName}</td>
                        <td>{task.task.description}</td>
                        <td>{new Date(task.nextDueDate).toDateString()}</td>
                        <td><ImportanceBadge importance={task.task.importance} /></td>
                        <td>{task.status}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default TaskSchedule