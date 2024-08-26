"use client"
import RoomPills from "@/app/components/Badge_Rooms";
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
      accessorKey: "shortName",
      header: "Short Name",
      enableSorting: true
    }
    ,
  {
    accessorKey: "task.rooms",
    header: "Badge Preview",
    cell: ({ row }) => { return (<RoomPills rooms={[{"room" : row.original}]} />) }
  },
    {
      accessorKey: "notes",
      header: "Notes",
    }
  ]