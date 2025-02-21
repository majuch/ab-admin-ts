import { query } from "@/lib/db";
import { Customer } from "@/models/Customers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {

        try {;

            const results = await query<Customer>(
                `
                select 
                    id,
                    name nombre
                from branch_office
                where active;
                `, []
            )

            return res.status(200).json({ rows: results.length, message: "Stores found", data: results });
        } catch (e) {
            res.status(500).json({ message: e });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}