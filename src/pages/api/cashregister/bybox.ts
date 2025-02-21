import { query } from "@/lib/db";
import { Customer } from "@/models/Customers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { box } = req.query;

        try {
            if (!box) {
                return res.status(400).json({ message: "`box` is required" });
            }

            const param = Number(box);

            const results = await query<Customer>(
                `
                SELECT corte.* FROM (
                    SELECT 
                        CASE 
                            WHEN p.type_mov != 'CANCELACION' THEN p.document_no
                            ELSE n.folio
                        END "folio",
                        CASE 
                            WHEN n.invoiced AND n.invoice_id IS NOT NULL THEN ic.folio
                            WHEN n.invoiced AND ic1.nota_id IS NOT NULL THEN ic1.folio
                            ELSE ''
                        END "factura",
                        CASE 
                            WHEN p.is_canceled THEN 0
                            WHEN sq.devuelto AND p.type_mov = 'VENTA' THEN 0
                            WHEN sq.devuelto AND p.type_mov = 'DEVOLUCION' THEN 0
                            WHEN sq.devuelto AND p.type_mov = 'CAMBIO' THEN 0
                            WHEN sq.devuelto AND p.method_payment = 9 THEN 0
                            WHEN p.type_mov = 'CANCELACION' AND p.method_payment = 9 THEN 0
                            ELSE p.amount
                        END "importe",
                        mp.name "forma_pago",
                        CASE
                            WHEN n.is_canceled THEN  an.username || ' - ' || a1.username
                            WHEN p.type_mov = 'VENTA' THEN an.username
                            ELSE a.username 
                        END "usuario",
                        CASE 
                            WHEN p.id_note IS NOT NULL THEN c.r_social
                            WHEN p.type_mov = 'SERVICIO' THEN c1.r_social
                            ELSE ''
                        END "cliente",
                        CASE
                            WHEN n.is_canceled THEN 'CANCELADA - ' || n.cancel_concept
                            ELSE p.concept
                        END "concepto",
                        p.terminal "terminal",
                        p.date_trx "fecha",
                        p.payment_time "hora",
                        p.reference "referencia",
                        p.type_mov "tipo",
                        p.id_cash_audit "caja",
                        coalesce(p.id_note, 0) "id_nota",
                        p.id "id",
                        COALESCE(n.is_canceled, FALSE) "cancelada",
                        p.method_payment "id_pago"
                    FROM payments p
                    LEFT JOIN notes n ON p.id_note = n.id 
                    LEFT JOIN invoice_cfdi ic ON n.invoice_id = ic.id
                    LEFT JOIN invoice_cfdi ic1 ON ic1.nota_id = n.id
                    LEFT JOIN customers c ON n.id_customer = c.id
                    LEFT JOIN service_order so ON p.id_service = so.id
                    LEFT JOIN customers c1 ON so.id_customer=c1.id
                    JOIN accounts a ON p.id_user = a.id
                    LEFT JOIN accounts an ON n.seller = an.id
                    LEFT JOIN accounts a1 ON n.canceled_by = a1.id
                    JOIN methods_payment mp ON p.method_payment = mp.id
                    LEFT JOIN (
                        SELECT id, payments.id_note, TRUE devuelto FROM payments
                        JOIN( 
                            (SELECT id_note, 'devolucion' FROM payments WHERE id_cash_audit=$1 AND (type_mov = 'CANCELACION') GROUP BY id_note)
                            INTERSECT
                            (SELECT id_note, 'devolucion' FROM payments WHERE id_cash_audit=$1 AND type_mov = 'VENTA' GROUP BY id_note)
                        ) devs ON payments.id_note = devs.id_note
                        WHERE payments.id_note IS NOT NULL
                    ) sq ON p.id_note = sq.id_note AND p.id=sq.id
                    WHERE p.id_cash_audit=$1 ORDER BY p.id
                ) corte
                LEFT JOIN (
                    SELECT id, payments.id_note FROM payments
                    JOIN( 
                        (SELECT id_note, 'devolucion' FROM payments WHERE id_cash_audit=$1 AND (type_mov = 'CANCELACION' OR type_mov = 'VENTA') GROUP BY id_note)
                        INTERSECT
                        (SELECT id_note, 'devolucion' FROM payments WHERE id_cash_audit=$1 AND type_mov = 'VENTA' GROUP BY id_note)
                    ) devs ON payments.id_note = devs.id_note
                    WHERE payments.type_mov='CANCELACION'
                ) devoluciones ON corte."id" = devoluciones.id
                WHERE devoluciones.id IS NULL
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