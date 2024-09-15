"use client"
import { Frequency, Importance, Prisma, Season, Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MdCheck, MdRedo } from "react-icons/md";
import ImportanceBadge from "@/app/components/Badge_Importance";
import SeasonBadge from "@/app/components/SeasonBadge";
import { formatInTimeZone } from "date-fns-tz";
import StatusIndicator from "@/app/components/StatusIndicator";

interface taskHistory {
     task: { taskId: number, taskName: string, description: string | null, frequency: Frequency, importance: Importance, season: Season | null}
     historyId: number; taskId: number; datePerformed: Date; monthPerformed: number; yearPerformed: number; status: Status; notes: string | null; 
    }

  export const columns: ColumnDef<taskHistory>[] = [
    {
      accessorKey: "datePerformed",
      header: "Date",
      cell: ({ row }) => {return (<span>{formatInTimeZone(row.original.datePerformed,'Europe/London', "MM/dd/yyyy")}</span>)}
    },
    {
      accessorKey: "task.taskName",
      header: "Task",
      enableSorting: true
    },
    {
      accessorKey: "task.frequency",
      header: "Frequency",
      enableSorting: true
    },

    {
      accessorKey: "task.importance",
      header: "Importance",
      cell: ({ row }) => {
        return (<><ImportanceBadge importance={row.original.task.importance} /></>)}
    },
    {
      accessorKey: "notes",
      header: "Notes",
      meta: "line-clamp-1"
    }
    
  ]