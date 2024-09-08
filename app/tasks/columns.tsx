"use client"
import { Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { MdCalendarMonth, MdCheck, MdRedo } from "react-icons/md";
import ImportanceBadge from "../components/Badge_Importance";
import RoomPills from "../components/Badge_Rooms";
import SeasonBadge from "../components/SeasonBadge";


interface taskSchedule {
  scheduleId: number; taskId: number; nextDueDate: Date; lastCompletedDate: Date | null; status: Status; notes: string | null;
  task: {
    rooms: ({
      room: {
        roomId: number;
        name: string;
        notes: string | null;
        houseId: number;
      };
    } & {
      taskId: number;
      roomId: number;
      assignedAt: Date;
      assignedBy: string;
    })[];
  } & {
    taskId: number; description: string | null; timeEstimate: number | null;
    frequency: string; importance: string;
    season: string | null;
  }
}

export const columns: ColumnDef<taskSchedule>[] = [
  {
    header: "Actions",
    accessorKey: "scheduleID",
    cell: ({ cell, row }) => {
      return (<>
        <Link aria-label="Complete" className='btn btn-sm btn-primary' href={'/schedule/' + row.original.scheduleId + '/complete'}><MdCheck /></Link><Link className='btn btn-sm' aria-label="Push" href={'/schedule/' + row.original.scheduleId + '/push/'}><MdRedo /></Link><Link className='btn btn-sm' aria-label="Unschedule" href={'/schedule/' + row.original.scheduleId + '/unschedule/'}><MdCalendarMonth /></Link>
      </>)
    }
  },
  {
    accessorKey: "task.taskName",
    header: "Task",
    enableSorting: true,
    meta: "line-clamp-2",
  },
  {
    accessorKey: "task.timeEstimate",
    header: "Estimated time",
    cell: ({ row }) => {
      return ((row.original.task.timeEstimate) ? <div>{row.original.task.timeEstimate} min</div> : null)
    },
    meta: "hidden sm:table-cell",
  },
  {
    accessorKey: "task.importance",
    header: "Importance",
    cell: ({ row }) => {
      return (<><ImportanceBadge importance={row.original.task.importance} /></>)
    },
    meta: "hidden sm:table-cell",
  },
  {
    accessorKey: "task.frequency",
    header: "Frequency",
    meta: "hidden md:table-cell",
  },
  {
    accessorKey: "task.season",
    header: "Season",
    cell: ({ row }) => {
      return (<><SeasonBadge season={row.original.task.season} /></>)
    },
    meta: "hidden md:table-cell",
  },
  {
    accessorKey: "task.rooms",
    header: "Rooms",
    cell: ({ row }) => { return (<RoomPills rooms={row.original.task.rooms} />) }
  },
  {
    accessorKey: "nextDueDate",
    header: "Scheduled Date",
    cell: ({ row }) => { return (<span>{format(row.original.nextDueDate, "MM/dd/yy")}</span>) }
  }
]