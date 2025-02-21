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
                    so.id,
                    so.date_trx::text fecha,
                    extract(days from (now() - so.date_trx)) dias,
                    so.folio,
                    so.total importe,
                    coalesce(sqp.abono, 0) abonos,
                    so.total - coalesce(sqp.abono, 0) saldo,
                    bo."name" ubicacion,
                    ac.username usuario,
                    so.observations observaciones,
                    so.id_vehicle vehiculo,
                    so.solicita,
                    so.status
                from service_order so
                join customers cs on so.id_customer = cs.id
                join branch_office bo on so.id_ubx = bo.id
                join accounts ac on so.created_by = ac.id
                left join (
                    select COALESCE(sum(payment), 0) abono, service from receivables where type_r = 'PAGO_SERVICIO' and is_active group by service 
                ) sqp on so.id=sqp.service
                WHERE so.active and status='VIGENTE' and so.id_customer=$1
                order by so.id desc
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