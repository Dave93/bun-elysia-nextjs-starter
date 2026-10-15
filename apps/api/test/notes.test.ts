// Runs against the database in .env (`bun run setup` first). Every run signs
// up a fresh user, so tests never collide with each other or with your data.
import { describe, expect, it } from "bun:test"
import { app } from "../src/app"

const origin = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
const url = (path: string) => `http://localhost${path}`

async function signUp(): Promise<string> {
  const email = `test-${crypto.randomUUID()}@example.com`
  const res = await app.handle(
    new Request(url("/api/auth/sign-up/email"), {
      method: "POST",
      headers: { "content-type": "application/json", origin },
      body: JSON.stringify({ email, password: "correct-horse-battery", name: "Test" }),
    }),
  )
  expect(res.status).toBe(200)
  const cookie = res.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ")
  expect(cookie).toContain("session_token")
  return cookie
}

describe("api", () => {
  it("answers health without a session", async () => {
    const res = await app.handle(new Request(url("/api/health")))
    expect(await res.json()).toEqual({ ok: true })
  })

  it("refuses notes without a session", async () => {
    const res = await app.handle(new Request(url("/api/notes")))
    expect(res.status).toBe(401)
  })

  it("creates, lists and deletes the caller's own notes", async () => {
    const cookie = await signUp()
    const headers = { cookie, origin, "content-type": "application/json" }

    const created = await app.handle(
      new Request(url("/api/notes"), {
        method: "POST",
        headers,
        body: JSON.stringify({ title: "First note" }),
      }),
    )
    expect(created.status).toBe(201)
    const note = (await created.json()) as { id: string; title: string }
    expect(note.title).toBe("First note")

    const list = await app.handle(new Request(url("/api/notes"), { headers }))
    expect(((await list.json()) as { id: string }[]).map((n) => n.id)).toEqual([note.id])

    const removed = await app.handle(
      new Request(url(`/api/notes/${note.id}`), { method: "DELETE", headers }),
    )
    expect(removed.status).toBe(200)
  })

  it("rejects an empty title", async () => {
    const cookie = await signUp()
    const res = await app.handle(
      new Request(url("/api/notes"), {
        method: "POST",
        headers: { cookie, origin, "content-type": "application/json" },
        body: JSON.stringify({ title: "" }),
      }),
    )
    expect(res.status).toBe(422)
  })

  it("does not let one user delete another user's note", async () => {
    const owner = await signUp()
    const created = await app.handle(
      new Request(url("/api/notes"), {
        method: "POST",
        headers: { cookie: owner, origin, "content-type": "application/json" },
        body: JSON.stringify({ title: "Private" }),
      }),
    )
    const { id } = (await created.json()) as { id: string }

    const stranger = await signUp()
    const res = await app.handle(
      new Request(url(`/api/notes/${id}`), {
        method: "DELETE",
        headers: { cookie: stranger, origin },
      }),
    )
    expect(res.status).toBe(404)
  })
})
