import { query } from "@/lib/db";
import { Customer } from "@/models/Customers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { store, from, to } = req.query;

        try {
            if (!store) {
                return res.status(400).json({ message: "`store` is required" });
            }
            if (!from) {
                return res.status(400).json({ message: "`from` is required" });
            }
            if (!to) {
                return res.status(400).json({ message: "`to` is required" });
            }

            const param = Number(store);
            const from_date = String(from);
            const to_date = String(to);

            const results = await query<Customer>(
                `
                select 
                    n.id,
                    n.date_note,
                    n.folio,
                    n.amount,
                    cr.r_social,
                    mp.name m_payment,
                    COALESCE(
                        invoice.folio,
                        (SELECT inv.folio FROM invoice_cfdi inv WHERE inv.nota_id = n.id ORDER BY inv.id DESC LIMIT 1),
                        ''
                    ) AS factura,
                    ac.username,
                    CASE
                        WHEN n.is_canceled THEN 'CANCELADA'
                        WHEN n.invoiced THEN 'FACTURADA'
                        ELSE 'NOTA'
                    END AS tipo
                    from notes n
                    join customers cr on n.id_customer=cr.id
                    left join (
                        SELECT 
                            p.id_note,
                            p.method_payment id_method
                        FROM 
                            payments p
                        JOIN 
                            (SELECT 
                                id_note,
                                MAX(amount) as max_amount
                            FROM 
                                payments
                            WHERE 
                                is_canceled = false AND type_mov = 'VENTA'
                            GROUP BY 
                                id_note
                            ) as max_payments
                        ON 
                            p.id_note = max_payments.id_note AND p.amount = max_payments.max_amount
                        WHERE 
                            p.is_canceled = false AND p.type_mov = 'VENTA'
                    ) pm on n.id=pm.id_note
                    left join methods_payment mp on pm.id_method=mp.id
                    left join invoice_cfdi invoice on n.invoice_id=invoice.id
                    left join accounts ac on n.seller=ac.id
                    join folios f on n.id_folio=f.id
                    WHERE f.id_branch_office=$1 and date_note between $2 and $3
                `, [param, from_date, to_date]
            )

            return res.status(200).json({ rows: results.length, message: "Notes found", data: results });
        } catch (e) {
            res.status(500).json({ message: e });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}