"use client"
import { Importance, Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { MdCheck, MdEdit } from "react-icons/md";
import ImportanceBadge from "../components/ImportanceBadge";


interface issues {
  issueId: number; title: string; description: string | null;
  created_at:  Date;
  updated_at:  Date;
  status:      Status
  priority:    Importance
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
      header: "Description"
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
      accessorKey: "created_at",
      header: "Created On",
      cell: ({ row }) => {
        return (<>{format(row.original.created_at, "MM/dd/yyyy")}</>)}
    }
  ]