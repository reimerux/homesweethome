"use client"
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface user {
     id: number, firstName: string | null, lastName: string , email: string
    }

  export const columns: ColumnDef<user>[] = [
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ cell, row }) => {
        return (<div className="join">
         <Link className="btn btn-sm join-item"  href={'/admin/users/' + row.original.id + '/edit'}>Edit</Link><Link className="btn btn-sm join-item"  href={'/admin/users/' + row.original.id + '/delete'}>Delete</Link>
        </div>)
      }
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      enableSorting: true
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email"}
  ]