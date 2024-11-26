"use client"
import RoomPills from "@/app/components/Badge_Rooms";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { displayInventoryContent, parseInventoryContent } from "../components/URTypes";
import DimensionCard from "../components/DimensionCard";

interface inventory {
     invId: number, name: string , content: string | null , type: string; rooms: { invId: number;
      roomId: number;
      assignedAt: Date;
      assignedBy: string; room: { name: string; roomId: number; shortName: string; notes: string | null; houseId: number; }}[]
    }

  export const columns: ColumnDef<inventory>[] = [
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ cell, row }) => {
        return (<div className="join">
         <Link className="btn btn-sm join-item"  href={'/inventory/' + row.original.invId + '/edit'}>Edit</Link><Link className="btn btn-sm join-item"  href={'/inventory/' + row.original.invId + '/delete'}>Delete</Link>
        </div>)
      }
    },
    {
      accessorKey: "invId",
      header: "ID",
      enableSorting: true
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true
    },
    {
      accessorKey: "type",
      header: "Type",
      enableSorting: true
    },    
  {
    accessorKey: "id2",
    header: "Dimensions",
    cell: ({ row }) => {return (<DimensionCard content={row.original?.content} />) }
  },
  {
    accessorKey: "rooms",
    header: "Rooms",
    cell: ({ row }) => { return (<RoomPills rooms={row.original.rooms} />) }
  },
    // {
    //   accessorKey: "notes",
    //   header: "Notes",
    // }
  ]