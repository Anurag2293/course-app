"use client"

import * as React from "react"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel, // pagination
    SortingState, // sorting
    getSortedRowModel, // sorting
    ColumnFiltersState, // filtering
    getFilteredRowModel, // filtering
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DashboardDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // pagination
        onSortingChange: setSorting, // sorting
        getSortedRowModel: getSortedRowModel(), // sorting
        onColumnFiltersChange: setColumnFilters, // filtering
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting, // sorting
            columnFilters // filtering
        }
    })

    return (
        <div>
            <div className="rounded-md border">
                {/* filtering */}
                <Card className="items-start justify-center flex flex-col">
                    <CardHeader>
                        <CardTitle>Search Courses</CardTitle>
                        <CardDescription>Search Courses by using course name or instructor</CardDescription>
                    </CardHeader>
                    <CardContent className="w-full md:max-w-md flex flex-col gap-y-4 md:flex-row md:gap-x-4">
                        <Input
                            placeholder="Enter course name"
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => {
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }}
                        />
                        <Input
                            placeholder="Enter instructor name"
                            value={(table.getColumn("instructor")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => {
                                table.getColumn("instructor")?.setFilterValue(event.target.value)
                            }}
                        />
                    </CardContent>
                </Card>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
