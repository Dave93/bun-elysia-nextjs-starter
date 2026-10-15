"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function SignOut() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await authClient.signOut()
        router.push("/")
        router.refresh()
      }}
      className="text-sm text-zinc-600 underline"
    >
      Sign out
    </button>
  )
}
