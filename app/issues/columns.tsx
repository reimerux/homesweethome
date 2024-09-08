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
  createdAt:  Date;
  updatedAt:  Date;
  status:      Status;
  priority:    Importance;
  rooms: Array<any>;
}

  export const columns: ColumnDef<issues>[] = [
    {
      header: "Actions",
      accessorKey: "",
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
      meta: "hidden md:table-cell md:whitespace-pre-line",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        return (<ImportanceBadge importance={row.original.priority}/>)},
        meta: "hidden md:table-cell",
    },
    {
      accessorKey: "status",
      header: "Status"
    },
    {
      accessorKey: "task.rooms",
      header: "Rooms",
      cell: ({ row }) => { return (<RoomPills rooms={row.original.rooms} />) },
      meta: "hidden md:table-cell"
    },
    {
      accessorKey: "created_at",
      header: "Created On",
      cell: ({ row }) => {
        return (<>{format(row.original.createdAt, "MM/dd/yyyy")}</>)}
    }
  ]