'use server';

import { createSession, deleteSession } from "@/lib/session";

// import { removeSession, setSession } from '@/session';

export const signIn = async (username: string) => {
  await createSession(username);
};

export const signOut = async () => {
  await deleteSession();
};