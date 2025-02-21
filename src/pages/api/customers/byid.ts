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
                    cr.id,
                    cr.r_social,
                    cr.rfc,
                    cr.phone,
                    cr.email,
                    cr.pincode address,
                    coalesce(r.amount, 0) + coalesce(s.amount, 0) balance,	
                    coalesce(r.amount, 0) credits, 
                    coalesce(s.amount, 0) services	
                from customers cr
                left join (
                    select customer_id, sum(amount-t.payment) amount
                    from receipts r
                    join receivables rb ON rb.receipt = r.id
                    join (
                        select 
                            receivables2.note,
                            sum(receivables2.payment) payment
                        from receipts
                        join receivables receivables2 ON receivables2.receipt = receipts.id
                        group by receivables2.note
                    ) t on rb.note = t.note
                    where tip='CREDIT'::receipt_tip
                    group by customer_id
                ) r on cr.id=r.customer_id
                left join(
                    select 
                        so.id_customer,
                        sum(so.total-rb1.payment) amount
                    from service_order so
                    join receivables rb1 on so.id=rb1.service
                    where type_r in ('SERVICIO', 'PAGO_SERVICIO') and so.status='VIGENTE'
                    group by so.id_customer
                ) s on cr.id=s.id_customer
                WHERE cr.id=$1
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