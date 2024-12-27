import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string,
  data: unknown
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const data = req.body
    // Enviar datos a la base de datos
    res.status(200).json({ message: 'Hello from Next.js!', data })
    return
  }
}