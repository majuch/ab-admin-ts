import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware (request: NextRequest) {
  try {
    const token = request.cookies.get('session')

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const res = await fetch('http://localhost:3000/api/auth/check', {
      headers: {
        token: token.value
      }
    })

    const data = await res.json()
    console.log(data)

    if (!data.isAuthorized) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/admin'
}