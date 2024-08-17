"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table"
import { classNames } from "./URfunctions"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  customCount?: number
}


export function DataTable<TData, TValue>({
  columns,
  data,
  customCount,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })


  return (<>
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
                              // classNames(breakpoints),
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
                data-state={row.getIsSelected() && "selected"}
                
              >
                {row.getVisibleCells().map((cell) => {return (
                  <td key={cell.id}
                  className={classNames(cell.column.columnDef.meta)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )}
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
    </>
  )
}