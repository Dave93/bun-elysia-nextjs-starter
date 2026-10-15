import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Bun + Elysia + Next.js</h1>
      <p className="text-zinc-600">
        An Elysia API on Bun behind a Next.js app, with Better Auth sessions and Drizzle on
        PostgreSQL. Sign up, then add a note: the dashboard talks to the API through a typed Eden
        client.
      </p>
      <div className="flex gap-3">
        <Link href="/sign-up" className="rounded-md bg-zinc-900 px-4 py-2 text-white">
          Sign up
        </Link>
        <Link href="/sign-in" className="rounded-md border border-zinc-300 px-4 py-2">
          Sign in
        </Link>
        <a href="/api/docs" className="rounded-md px-4 py-2 text-zinc-600 underline">
          API docs
        </a>
      </div>
    </div>
  )
}
