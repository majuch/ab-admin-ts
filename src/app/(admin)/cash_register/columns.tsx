import { ICashRegister } from "@/models/CashRegister";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';

export const columns: ColumnDef<ICashRegister>[] = [
    {
        accessorKey: 'folio',
        header: 'Folio',
    },
    {
        accessorKey: 'factura',
        header: 'Factura',
    },
    {
        accessorKey: 'importe',
        header: 'Importe',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("importe"))
            const formatted = new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'forma_pago',
        header: 'Forma de Pago',
    },
    {
        accessorKey: 'usuario',
        header: 'Usuario',
    },
    {
        accessorKey: 'cliente',
        header: 'Cliente',
    },
    {
        accessorKey: 'concepto',
        header: 'Concepto',
    },
    {
        accessorKey: 'terminal',
        header: 'Terminal',
    },
    {
        accessorKey: 'fecha',
        header: 'Fecha',
        cell: ({ row }) => {
            const date_note = new Date(row.getValue("fecha"))
            // Format the amount as a dollar amount
            const formatted = date_note.toLocaleDateString("es-MX")
            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'hora',
        header: 'Hora',
        cell: ({ row }) => {
            const date_note = new Date(`2025/02/02 ${row.getValue("hora")}`)
            // Format the amount as a dollar amount
            const formatted = format(date_note, "hh:mm aaa")
            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'referencia',
        header: 'Referencia',
    },
]