"use client"
import { Frequency, Importance, Room, Season } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import ImportanceBadge from "../../components/ImportanceBadge";
import SeasonBadge from "../../components/SeasonBadge";
import RoomPills from "@/app/components/RoomPills";

interface task {
  taskId: number; description: string | null; timeEstimate: number | null;
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
      accessorKey: "task.timeEstimate",
      header: "Estimated time",
      cell: ({ row }) => {
        return ((row.original.timeEstimate) ? <div>{row.original.timeEstimate} min</div>: null)}
    },
    {
      accessorKey: "frequency",
      header: "Frequency",
    },{
      accessorKey: "season",
      header: "Season",
      cell: ({ row }) => {
        return (<><SeasonBadge season={row.original.season} /></>)}
    },
    {
      accessorKey: "task.rooms",
      header: "Rooms",
      cell: ({ row }) => {return (<RoomPills rooms={row.original.rooms}/>)}
      // cell: ({ row }) => {return (<span>{JSON.stringify(row.original.rooms)}</span>)}
    }
  ]