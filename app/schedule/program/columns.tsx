"use client"
import RoomPills from "@/app/components/Badge_Rooms";
import IndeterminateCheckbox from "@/app/components/IndeterminateCheckBox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import ImportanceBadge from "../../components/Badge_Importance";
import SeasonBadge from "../../components/SeasonBadge";

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
    accessorKey: "taskName",
    header: "Task",
    enableSorting: true
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