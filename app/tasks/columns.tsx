"use client"
import { Frequency, Importance, Prisma, Season, Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MdCheck, MdRedo } from "react-icons/md";
import ImportanceBadge from "../components/ImportanceBadge";
import SeasonBadge from "../components/SeasonBadge";
import RoomPills from "../components/RoomPills";
import { format } from "date-fns";


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
}  & {
  taskId: number; description: string | null; timeEstimate: number | null;
  frequency: string; importance: string;
  season: string | null;
}}

  export const columns: ColumnDef<taskSchedule>[] = [
    {
      header: "Actions",
      accessorKey: "scheduleID",
      cell: ({ cell, row }) => {
        return (<>
         <Link className='btn btn-sm btn-primary' href={'/schedule/' + row.original.scheduleId + '/complete'}><MdCheck /></Link><Link className='btn btn-sm' href={'/schedule/' + row.original.scheduleId + '/push/'}><MdRedo /></Link>
        </>)
      }
    },
    {
      accessorKey: "task.taskName",
      header: "Task",
      enableSorting: true
    },
    {
      accessorKey: "task.timeEstimate",
      header: "Estimated time",
      cell: ({ row }) => {
        return ((row.original.task.timeEstimate) ? <div>{row.original.task.timeEstimate} min</div>: null)}
    },
    {
      accessorKey: "task.importance",
      header: "Importance",
      cell: ({ row }) => {
        return (<><ImportanceBadge importance={row.original.task.importance} /></>)}
    },
    {
      accessorKey: "task.frequency",
      header: "Frequency",
    },
    {
      accessorKey: "task.season",
      header: "Season",
      cell: ({ row }) => {
        return (<><SeasonBadge season={row.original.task.season} /></>)}
    },
    {
      accessorKey: "task.rooms",
      header: "Rooms",
      cell: ({ row }) => {return (<RoomPills rooms={row.original.task.rooms}/>)}
    },
    {
      accessorKey: "nextDueDate",
      header: "Scheduled Date",
      cell: ({ row }) => {return (<span>{format(row.original.nextDueDate,"MM/dd/yy")}</span>)}
    }
  ]