import { minutesToHours } from "date-fns";

export const metrics = [
    {
        name: "scheduledTasksAllTime",
        title: "Scheduled Tasks",
        subtitle: "Current",
        tablename: "taskSchedule",
        query: { include: { task: true } },
        postprocess: function (data: any): number {
            return data.length
        }
    },
    {
        name: "openIssues",
        title: "Open Issues",
        subtitle: "Current",
        tablename: "issue",
        query: { where: { status: "PENDING" } },
        postprocess: function (data: any): number {
            return data.length
        }
    },
    {
        name: "overdueTasks",
        title: "Overdue Tasks",
        subtitle: "Current",
        tablename: "taskSchedule",
        query: { where: { nextDueDate: { lt: new Date()  } }},
        postprocess: function (data: any): number {
            return data.length
        }
    },
    {
        name: "totalEffort",
        title: "Annual Scheduled Effort",
        subtitle: "in hours",
        tablename: "taskSchedule",
        query: { include: { task: true } },
        postprocess: function (data: any): number {
            let totalEffort = 0;
            data.forEach((task: any) => {
                (task.task.timeEstimate) ?
                (task.task.frequency === "MONTHLY") ? totalEffort += task.task.timeEstimate * 12 :
                    (task.task.frequency === "QUARTERLY") ? totalEffort += task.task.timeEstimate * 4 : totalEffort += task.task.timeEstimate
                : null
            })
            return minutesToHours(totalEffort)
        }
    },
]