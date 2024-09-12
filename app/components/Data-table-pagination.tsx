
import { Table } from "@tanstack/react-table"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"


interface DataTablePaginationProps<TData> {
    table: Table<TData>,
    select: boolean
}

export function DataTablePagination<TData>({
    table,
    select
}: DataTablePaginationProps<TData>) {
    if (table.getFilteredRowModel().rows.length <= 10) return null

    return (
        <div className="flex items-center justify-between px-2 mt-2">
            {(select)?   <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>: <div className="flex-1" ></div> }
          
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>

                    <select value={table.getState().pagination.pageSize} onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                    }}>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                </div>

                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="join flex items-center">
                    <button
                        className="btn join-item btn-sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <MdOutlineKeyboardDoubleArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                        className="join-item  btn btn-sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <MdOutlineKeyboardArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                        className="join-item btn btn-sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <MdOutlineKeyboardArrowRight className="h-4 w-4" />
                    </button>
                    <button
                        className="join-item btn btn-sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <MdOutlineKeyboardDoubleArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
