"use client"
import { Frequency, Importance, Prisma, Season, Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MdCheck, MdRedo } from "react-icons/md";
import ImportanceBadge from "../components/ImportanceBadge";
import SeasonBadge from "../components/SeasonBadge";

interface taskSchedule {
     task: { taskId: number, taskName: string, description: string | null, frequency: Frequency, importance: Importance, season: Season | null}
     scheduleId: number; taskId: number; nextDueDate: Date; lastCompletedDate: Date | null; status: Status; notes: string | null; 
    }

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
      accessorKey: "task.description",
      header: "Description",
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
      accessorKey: "nextDueDate",
      header: "Scheduled Date",
      cell: ({ row }) => {return (<span>{new Date(row.original.nextDueDate).toLocaleDateString()}</span>)}
    }
  ]