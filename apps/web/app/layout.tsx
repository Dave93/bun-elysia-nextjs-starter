import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bun + Elysia + Next.js starter",
  description: "Elysia API on Bun, Next.js, Better Auth and Drizzle in one small monorepo.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <main className="mx-auto max-w-xl px-6 py-16">{children}</main>
      </body>
    </html>
  )
}
