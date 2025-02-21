"use client"

import { Button } from "@/components/ui/button"
import { ICustomer } from "@/models/Customers"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "r_social",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nombre
                <ArrowUpDown />
            </Button>
        )
    },
    cell: ({ row }) => <div>{row.getValue("r_social")}</div>
  },
  {
    accessorKey: "credit",
    header: ({ column }) => {
        return (
            <div className="flex items-center justify-end">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Saldo
                    <ArrowUpDown />
                </Button>
            </div>
        )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("credit"))
 
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]
