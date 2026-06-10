import { cookies } from "next/headers";
import { createToken, verifyToken } from "./session";

const SESSION_COOKIE_NAME = "srs_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return false;
  }
  return password === adminPassword;
}

export async function createSession(): Promise<string> {
  return createToken("admin", SESSION_MAX_AGE);
}

export async function validateSession(token: string): Promise<boolean> {
  return verifyToken(token);
}

export async function deleteSession(token: string): Promise<void> {
  // Stateless token: no server-side delete action required
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;
  return verifyToken(token);
}
