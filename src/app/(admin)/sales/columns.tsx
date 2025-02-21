import { ISale } from "@/models/Sale";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ISale>[] = [
    {
        accessorKey: 'date_note',
        header: 'Fecha',
        cell: ({ row }) => {
            const date_note = new Date(row.getValue("date_note"))
            // Format the amount as a dollar amount
            const formatted = date_note.toLocaleDateString("es-MX")
            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'folio',
        header: 'Folio',
    },
    {
        accessorKey: 'amount',
        header: 'Importe',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'r_social',
        header: 'Razón Social',
        filterFn: 'includesString',
        meta: {
            filterVariant: 'text'
        }
    },
    {
        accessorKey: 'm_payment',
        header: 'Forma de Pago',
    },
    {
        accessorKey: 'factura',
        header: 'Factura',
    },
    {
        accessorKey: 'username',
        header: 'Usuario',
    },
    {
        accessorKey: 'tipo',
        header: 'Tipo',
        filterFn: (row, columnId, filterValue: string[]) => {
            return filterValue.includes(row.original.tipo);
        },
        meta: {
            filterVariant: 'array'
        }
    },
]