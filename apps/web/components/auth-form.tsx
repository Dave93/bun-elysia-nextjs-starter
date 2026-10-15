"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(form: FormData) {
    setPending(true)
    setError(null)
    const email = String(form.get("email"))
    const password = String(form.get("password"))
    const { error } =
      mode === "sign-up"
        ? await authClient.signUp.email({ email, password, name: String(form.get("name")) })
        : await authClient.signIn.email({ email, password })
    setPending(false)
    if (error) return setError(error.message ?? "Something went wrong")
    router.push("/dashboard")
    router.refresh()
  }

  const input = "w-full rounded-md border border-zinc-300 bg-white px-3 py-2"
  return (
    <form action={onSubmit} className="space-y-3">
      {mode === "sign-up" && <input name="name" placeholder="Name" required className={input} />}
      <input name="email" type="email" placeholder="Email" required className={input} />
      <input
        name="password"
        type="password"
        placeholder="Password (8+ characters)"
        minLength={8}
        required
        className={input}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {mode === "sign-up" ? "Create account" : "Sign in"}
      </button>
    </form>
  )
}
