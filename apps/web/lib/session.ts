import { headers } from "next/headers"

type Session = { user: { id: string; name: string; email: string } } | null

/** Reads the session on the server by forwarding the request's cookies to the API. */
export async function getSession(): Promise<Session> {
  const cookie = (await headers()).get("cookie") ?? ""
  const res = await fetch(`${process.env.API_URL ?? "http://localhost:3001"}/api/auth/get-session`, {
    headers: { cookie },
    cache: "no-store",
  })
  if (!res.ok) return null
  return (await res.json()) as Session
}
