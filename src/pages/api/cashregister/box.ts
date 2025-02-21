import { query } from "@/lib/db";
import { Customer } from "@/models/Customers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { store } = req.query;

        try {
            if (!store) {
                return res.status(400).json({ message: "`store` is required" });
            }

            const param = Number(store);

            const results = await query<Customer>(
                `
                select 
                    ca.id id_cash_register,
                    b.name nombre
                from cash_audit ca
                join boxes b on ca.box_id=b.id
                where not ca.processed and ca.branch_id=$1;
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