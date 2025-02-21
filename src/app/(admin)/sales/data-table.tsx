"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  RowData
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/DataTable/pagination"
import { ISale } from "@/models/Sale"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
interface DataTableProps<TData extends ISale, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

type Checked = DropdownMenuCheckboxItemProps['checked'];

declare module '@tanstack/react-table' {
    //allows us to define custom properties for our columns
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
      filterVariant?: 'text' | 'range' | 'array'
    }
  }
  

export function DataTable<TData extends ISale, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumFilter] = useState<ColumnFiltersState>([])

    const [showCanceled, setShowCanceled] = useState<Checked>(false);
    const [showInvoiced, setShowInvoiced] = useState<Checked>(true);
    const [showNotes, setShowNotes] = useState<Checked>(true);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
        pagination: {
            pageIndex: 0,
            pageSize: 25
        }
    },
    filterFns: {
    }
  })

    useEffect(() => {
        const newList = [];
        if (showCanceled)  newList.push('CANCELADA');
        if (showInvoiced)  newList.push('FACTURADA');
        if (showNotes)  newList.push('NOTA');

        if (newList.length > 0) {
            table.getColumn("tipo")?.setFilterValue(newList);
        }
    }, [showCanceled, showInvoiced, showNotes, table]);

  return (
    <div className="w-full">
        <div className="flex items-center py-4">
            <Input
            placeholder="Filtrar cliente..."
            value={(table.getColumn("r_social")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("r_social")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">Opciones ...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Mostrar</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div>
                        <DropdownMenuCheckboxItem
                            checked={showCanceled}
                            onCheckedChange={() => setShowCanceled(prev => !prev)}
                        >
                            Canceladas
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showInvoiced}
                            onCheckedChange={() => setShowInvoiced(prev => !prev)}
                        >
                            Facturadas
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showNotes}
                            onCheckedChange={() => setShowNotes(prev => !prev)}
                        >
                            Notas
                        </DropdownMenuCheckboxItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
    </div>
        <div className="rounded-md border">
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
        <div className="flex flex-col gap-2.5">
            <DataTablePagination table={table}/>
        </div>
    </div>
  )
}
