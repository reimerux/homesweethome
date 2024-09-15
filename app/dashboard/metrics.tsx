import { minutesToHours } from "date-fns";

export const metrics = [
    {
        name: "scheduledTasksAllTime",
        title: "Scheduled Tasks",
        subtitle: "Current",
        tablename: "taskSchedule",
        query: { },
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
        name: "completedTasks",
        title: "Completed Tasks",
        subtitle: "all-time",
        tablename: "taskHistory",
        query: { where: { status: "COMPLETED" }},
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
        name: "allIssues",
        title: "All Issues",
        subtitle: "all-time",
        tablename: "issue",
        query:  {where: {status: {in: ["PENDING","COMPLETED"]}}},
        postprocess: function (data: any): number {
            return data.length
        }
    },
    
]