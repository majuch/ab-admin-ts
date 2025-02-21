"use client"

import { Button } from "@/components/ui/button"
import { ICreditCustomer } from "@/models/Customers"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<ICreditCustomer>[] = [
  {
    accessorKey: "folio",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Folio
                <ArrowUpDown />
            </Button>
        )
    },
    cell: ({ row }) => <div>{row.getValue("folio")}</div>
  },
  {
    accessorKey: "saldo",
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
      const amount = parseFloat(row.getValue("saldo"))
 
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
      accessorKey: "date_note",
      header: "Fecha",
      cell: ({ row }) => {
          const date_note = new Date(row.getValue("date_note"))
          // Format the amount as a dollar amount
          const formatted = date_note.toLocaleDateString("es-MX")
          return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
      accessorKey: "factura",
      header: "Factura",
      cell: ({ row }) => <div>{row.getValue("factura")}</div>
    },
  {
    accessorKey: "dias",
    header: "Dias Vencido",
    cell: ({ row }) => {
        const dias = parseInt(row.getValue("dias"))
        // Format the amount as a dollar amount
        return <div className="text-right font-medium">{dias}</div>
    }
  },
  {
    accessorKey: "amount",
    header: "Importe",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
 
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "abonos",
    header: "Abonos",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("abonos"))
 
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  
]
