"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table"
import axios from "axios"
import React from "react"
import { DataTablePagination } from "./Data-table-pagination"
import { classNames } from "./URfunctions"
import { useRouter } from "next/navigation"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  customCount?: number,
  actionName: string,
  actionURL: string
}

export function SelectDataTable<TData, TValue>({
  columns,
  data,
  customCount,
  actionName,
  actionURL,
}: DataTableProps<TData, TValue>) {

  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection, sorting
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel()
  })

  async function onClickAction(data: any) {
    
    try {
      await axios.put(actionURL, data);
      router.refresh();
    } catch (error) {

      console.error(error);

    }
  }

  return (<>
    <button className="btn btn-sm mb-2" disabled={(table.getSelectedRowModel().rows.length === 0)} onClick={(e) => { onClickAction(table.getSelectedRowModel().rows)}}>{actionName}</button>
    <p className="text-xs ml-2 mb-1">{customCount || data.length} items</p>
    <div className="rounded-md border">
      <table className="table">
        <thead >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {

                const breakpoints: any = header.column.columnDef.meta;

                return (
                  <th key={header.id} className={classNames(header.column.columnDef.meta)}>
                    {header.isPlaceholder
                      ? null
                      :
                      (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </>
                      )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                aria-label={row.id}
                data-state={row.getIsSelected() && "selected"}

              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}
                      className={classNames(cell.column.columnDef.meta)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                }
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    {/* Pagination */}
    <DataTablePagination table={table} select={true}/>
  </>
  )
}