import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export default function SignIn() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <AuthForm mode="sign-in" />
      <p className="text-sm text-zinc-600">
        New here? <Link href="/sign-up" className="underline">Create an account</Link>
      </p>
    </div>
  )
}
