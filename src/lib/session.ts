import 'server-only'
import { cookies } from "next/headers";
import { decrypt } from "./edsession";

export async function createSession (token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // const session = await encrypt({user, expiresAt});
    const cookiesStore = await cookies();

    cookiesStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)
   
    if (!session || !payload) {
      return null
    }
   
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
   
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    })
  }

export async function getSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
  return payload
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}