import { query } from "@/lib/db";
import { Customer } from "@/models/Customers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { id } = req.query;

        try {
            if (!id) {
                return res.status(400).json({ message: "`id` is required" });
            }

            const param = Number(id);

            const results = await query<Customer>(
                `
                select 
                    receipts.id,
                    notes.date_note,
                    notes.date_promised,
                    notes.folio,
                    CASE 
                        WHEN notes.invoiced AND notes.invoice_id IS NOT NULL THEN ic.folio
                        WHEN notes.invoiced AND ic1.nota_id IS NOT NULL THEN ic1.folio
                        ELSE ''
                    END factura,
                    receipts.amount,
                    COALESCE(t.payment, 0) abonos,
                    (receipts.amount - COALESCE(t.payment, 0)) saldo,
                    receipts.status,
                    case
                        WHEN receipts.status != 'PENDING'::status_receipt THEN '0'
                        else (now()::date - notes.date_promised)
                    end dias
                from receipts 
                join receivables ON receivables.receipt = receipts.id
                join notes ON notes.id = receivables.note
                LEFT JOIN invoice_cfdi ic ON notes.invoice_id = ic.id
                LEFT JOIN invoice_cfdi ic1 ON ic1.nota_id = notes.id
                join customers ON customers.id = notes.id_customer
                join (
                    select 
                        receivables2.note,
                        sum(receivables2.payment) payment
                    from receipts
                    join receivables receivables2 ON receivables2.receipt = receipts.id
                    group by receivables2.note
                ) t on receivables.note = t.note
                where tip='CREDIT'::receipt_tip
                and notes.active=true and status='PENDING'::status_receipt and customers.id=$1
                order by notes.date_note, notes.created_at
                `, [param]
            )

            return res.status(200).json({ rows: results.length, message: "Customer found", data: results });
        } catch (e) {
            res.status(500).json({ message: e });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}