"use client"
import RoomPills from "@/app/components/Badge_Rooms";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { HTMLProps } from "react";
import ImportanceBadge from "../../components/Badge_Importance";
import SeasonBadge from "../../components/SeasonBadge";
import IndeterminateCheckbox from "@/app/components/IndeterminateCheckBox";

interface task {
  taskId: number; description: string | null; timeEstimate: number | null;scheduleId: number;
  frequency: string; importance: string;
  season: string | null;
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
}

export const columns: ColumnDef<task>[] = [
 
  {
    header: "Actions",
    accessorKey: "scheduleID",
    cell: ({ cell, row }) => {
      return (<div className="join">
        <Link className="btn btn-sm join-item" href={'/admin/tasks/' + row.original.taskId + '/edit'}>Edit</Link>
        {(!row.original.scheduleId) ? <Link className="btn btn-sm join-item" href={'/admin/tasks/' + row.original.taskId + '/delete'}>Delete</Link> : null}
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
    meta: "whitespace-pre-line hidden sm:table-cell"
  },
  {
    accessorKey: "importance",
    header: "Importance",
    cell: ({ row }) => {
      return (<><ImportanceBadge importance={row.original.importance} /></>)
    },
    meta: "hidden sm:table-cell",
  },
  {
    accessorKey: "task.timeEstimate",
    header: "Estimated time",
    cell: ({ row }) => {
      return ((row.original.timeEstimate) ? <div>{row.original.timeEstimate} min</div> : null)
    }
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "scheduleId",
    header: "Scheduled",
    cell: ({ row }) => {
      return ((row.original.scheduleId) ? <Link className="link-hover" href={'/schedule/'+ row.original.scheduleId +'/unschedule'}>YES</Link> : null)
    },
  },
  {
    accessorKey: "season",
    header: "Season",
    cell: ({ row }) => {
      return (<><SeasonBadge season={row.original.season} /></>)
    },
    
  },
  {
    accessorKey: "task.rooms",
    header: "Rooms",
    cell: ({ row }) => { return (<RoomPills rooms={row.original.rooms} />) }
  }
]