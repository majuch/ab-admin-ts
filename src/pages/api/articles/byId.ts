import { query } from "@/lib/db";
import { Article } from "@/models/Article";
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

      console.time("QueryExecutionTime");
      const results = await query<Article>(
        `
        SELECT * FROM search_web
        WHERE id=$1
        `,
        [param]
      )

    console.timeEnd("QueryExecutionTime");

      return res.status(200).json({ rows: results.length, message: "Article found", data: results });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
