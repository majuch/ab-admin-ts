import { messages } from "@/utils/messages";
import jwt from "jsonwebtoken";
import { query } from "@/lib/db";
import { IUser } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";


export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = Array.isArray(req.headers.token) ? req.headers.token[0] : req.headers.token || cookies.session;
    // Valido que haya token
    if (!token) {
      return res.json(
        { message: messages.error.notAuthorized, status: 400 }
      );
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.json(
          { message: 'Secret', status: 400 }
        );
      }
      const decoded = jwt.verify(token, secret);
      // console.log(decoded);

      //@ts-expect-error: decoded may not have a 'data' property
      const { data } = decoded;
        // Buscamos el usuario
        const userFind = await query<IUser>(
            "SELECT id, username, password FROM accounts WHERE id = $1",
            [data.id]
        );

      // Verificamos que exista el usuario
      if (!userFind) {
        return res.json(
          { message: messages.error.userNotFound , status: 400 }
        );
      }

      return res.json(
        { isAuthorized: true, message: messages.success.authorized, status: 200 }
      );
    } catch (error) {
      return res.json(
        { message: messages.error.tokenNotValid, error, status: 400 }
      );
    }
  } catch (error) {
    return res.json(
      { message: messages.error.default, error, status: 400 }
    );
  }
}