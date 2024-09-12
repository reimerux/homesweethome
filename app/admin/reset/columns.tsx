"use client"
import RoomPills from "@/app/components/Badge_Rooms";
import IndeterminateCheckbox from "@/app/components/IndeterminateCheckBox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import ImportanceBadge from "../../components/Badge_Importance";
import SeasonBadge from "../../components/SeasonBadge";

interface deleteTable {
  tableName: string; name: string
}

export const columns: ColumnDef<deleteTable>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "name",
    header: "Table",
    enableSorting: true
  },
  {
    accessorKey: "notes",
    header: "Notes",
    enableSorting: true
  },
  {
    accessorKey: "count",
    header: "Count",
    enableSorting: true
  }
]