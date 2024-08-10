"use client"
import { Frequency, Importance, Prisma, Season, Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MdCheck, MdRedo } from "react-icons/md";
import ImportanceBadge from "../../components/ImportanceBadge";
import SeasonBadge from "../../components/SeasonBadge";

interface task {
     taskId: number, taskName: string, description: string | null, frequency: Frequency, importance: Importance, season: Season | null
    }

  export const columns: ColumnDef<task>[] = [
    {
      header: "Actions",
      accessorKey: "scheduleID",
      cell: ({ cell, row }) => {
        return (<div className="join">
         <Link className="btn btn-sm join-item"  href={'/admin/tasks/' + row.original.taskId + '/edit'}>Edit</Link><Link className="btn btn-sm join-item"  href={'/admin/tasks/' + row.original.taskId + '/delete'}>Delete</Link>
        </div>)
      }
    },
    {
      accessorKey: "taskName",
      header: "Task",
      enableSorting: true
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "importance",
      header: "Importance",
      cell: ({ row }) => {
        return (<><ImportanceBadge importance={row.original.importance} /></>)}
    },
    {
      accessorKey: "frequency",
      header: "Frequency",
    },
    {
      accessorKey: "season",
      header: "Season",
      cell: ({ row }) => {
        return (<><SeasonBadge season={row.original.season} /></>)}
    }
  ]