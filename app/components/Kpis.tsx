import prisma from '@/prisma/client';

interface KPIs {
  ScheduledTasks: number,
  OverdueTasks: number,
  TasksCompleted: number
  CurrentIssues: number,
  allIssues: number,

}

const Kpis = async () => {
  const CurrentKPIs: KPIs =
  {
    ScheduledTasks: 0,
    OverdueTasks: 0,
    TasksCompleted: 0,
    CurrentIssues: 0,
    allIssues: 0
  };
  CurrentKPIs.ScheduledTasks = await prisma.taskSchedule.count({});
  CurrentKPIs.OverdueTasks = await prisma.taskSchedule.count({
    where: {
      nextDueDate: { lte: new Date() }
    }
  });
  CurrentKPIs.TasksCompleted = await prisma.taskHistory.count({});
  CurrentKPIs.CurrentIssues = await prisma.issue.count({
    where: {status: "PENDING"}
  });
  CurrentKPIs.allIssues = await prisma.issue.count({where: {status: {in: ["PENDING","COMPLETED"]}}});

  return (
    <div className="stats stats-vertical shadow w-46 mr-8">
      <div className="stat">
        <div className="stat-title">Scheduled Tasks</div>
        <div className="stat-value">{CurrentKPIs.ScheduledTasks}</div>
        <div className="stat-desc">Current</div>
      </div>

      <div className="stat">
        <div className="stat-title">Overdue Tasks</div>
        <div className={(CurrentKPIs.OverdueTasks > 0) ? "stat-value text-red-500" : "stat-value"}>{CurrentKPIs.OverdueTasks}</div>
        <div className="stat-desc">Current</div>
      </div>

      <div className="stat">
        <div className="stat-title">Tasks Completed</div>
        <div className="stat-value">{CurrentKPIs.TasksCompleted}</div>
        <div className="stat-desc">all-time</div>
      </div>
      <div className="stat">
        <div className="stat-title">Open Isssues</div>
        <div className="stat-value">{CurrentKPIs.CurrentIssues}</div>
        <div className="stat-desc">current</div>
      </div>
      <div className="stat">
        <div className="stat-title">All Issues</div>
        <div className="stat-value">{CurrentKPIs.allIssues}</div>
        <div className="stat-desc">all-time</div>
      </div>
    </div>
  )
}

export default Kpis