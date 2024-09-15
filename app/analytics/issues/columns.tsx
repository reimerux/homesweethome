"use client"
import ImportanceBadge from "@/app/components/Badge_Importance";
import { Importance, Issue, Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";

interface issues {
  issueId: number; title: string; description: string | null; createdAt: Date; updatedAt: Date; completedAt: Date ; createdBy: number | null; completedBy: number | null; notes: string | null; status: Status; priority: Importance
}

  export const columns: ColumnDef<Issue>[] = [
    {
      accessorKey: "completedAt",
      header: "Date",
      cell: ({ row }) => {return ((row.original.completedAt) ? <span>{formatInTimeZone(row.original.completedAt,'Europe/London', "MM/dd/yyyy")}</span> : <>No Date</>)}
    },
    {
      accessorKey: "issueId",
      header: "ID",
      enableSorting: true
    },
    {
      accessorKey: "title",
      header: "Task",
      enableSorting: true
    },
    {
      accessorKey: "priority",
      header: "Importance",
      cell: ({ row }) => {
        return (<><ImportanceBadge importance={row.original.priority} /></>)}
    },
    {
      accessorKey: "notes",
      header: "Notes",
      meta: "line-clamp-1"
    }
    
  ]