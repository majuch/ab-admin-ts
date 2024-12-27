import { query } from "@/lib/db";
import { Article } from "@/models/Article";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { search } = req.query;

    try {
      if (!search) {
        return res.status(400).json({ message: "`search` is required" });
      }

      const searchStr = (Array.isArray(search) ? search.join('') : search).replace(/-/g, "");

      console.time("QueryExecutionTime");
      const results = await query<Article>(
        `
        SELECT * FROM search_web
        WHERE id in (select id from search_articles($1))
        `,
        [searchStr]
      )

    console.timeEnd("QueryExecutionTime");

      return res.status(200).json({ rows: results.length, message: "Articles found", data: results });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
