"use client"
import { Importance, Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { MdCheck, MdEdit } from "react-icons/md";
import ImportanceBadge from "../components/Badge_Importance";
import RoomPills from "../components/Badge_Rooms";


interface issues {
  issueId: number; title: string; description: string | null;
  created_at:  Date;
  updated_at:  Date;
  status:      Status;
  priority:    Importance;
  rooms: Array<any>;
}

  export const columns: ColumnDef<issues>[] = [
    {
      header: "Actions",
      accessorKey: "issueId",
      cell: ({ cell, row }) => {
        return (<>
         <Link className='btn btn-sm btn-primary' href={'/issues/' + row.original.issueId + '/edit'}><MdEdit /></Link>
        </>)
      }
    },
    {
      accessorKey: "issueId",
      header: "ID",
      enableSorting: true
    },
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: true
    },
    {
      accessorKey: "description",
      header: "Description",
      meta: "hidden md:table-cell",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        return (<ImportanceBadge importance={row.original.priority}/>)}
    },
    {
      accessorKey: "status",
      header: "Status"
    },
    {
      accessorKey: "task.rooms",
      header: "Rooms",
      cell: ({ row }) => { return (<RoomPills rooms={row.original.rooms} />) }
    },
    {
      accessorKey: "created_at",
      header: "Created On",
      cell: ({ row }) => {
        return (<>{format(row.original.created_at, "MM/dd/yyyy")}</>)}
    }
  ]