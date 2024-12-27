import jwt  from 'jsonwebtoken';
import { query } from "@/lib/db";
import werkzeugSecurity from "@/utils/werkzeugSecurity";
import { IUser } from "@/models/User";
import { messages } from "@/utils/messages";
// import { createSession } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
// import { encrypt } from '@/lib/edsession';


export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.json(
          { message: messages.error.needProps, status: 400 }
        );
      }

      const users = await query<IUser>(
        "SELECT id, username, password FROM accounts WHERE lower(username) = lower($1)",
        [username]
      );

      if (users.length === 0) {
        return res.json(
          { message: messages.error.userNotFound , status: 401 }
        );
      }

      const isCorrect:boolean = werkzeugSecurity(password, users[0].password);

      if (!isCorrect) {
        return res.json(
          { message: messages.error.incorrectPassword , status: 402 }
        );
      }

      const user:IUser = {
        id: users[0].id,
        username: users[0].username,
        password: ''
      };

      // await createSession(user);
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      // console.log(token);

      return res.json(
        { token, message: messages.success.userLogged, status: 200 }
      );

    } catch (error) {
      return res.json(
        { message: messages.error.default, ERROR: error, status: 404 }
      );
    }
  } else {
    return res.json(
      { message: messages.error.default, status: 405 }
    );
  }
}
