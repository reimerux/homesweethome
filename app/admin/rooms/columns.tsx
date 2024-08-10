"use client"
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface room {
     roomId: number, name: string , notes: string | null , houseId: number
    }

  export const columns: ColumnDef<room>[] = [
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ cell, row }) => {
        return (<div className="join">
         <Link className="btn btn-sm join-item"  href={'/admin/rooms/' + row.original.roomId + '/edit'}>Edit</Link><Link className="btn btn-sm join-item"  href={'/admin/rooms/' + row.original.roomId + '/delete'}>Delete</Link>
        </div>)
      }
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true
    },
    {
      accessorKey: "notes",
      header: "Notes",
    }
  ]