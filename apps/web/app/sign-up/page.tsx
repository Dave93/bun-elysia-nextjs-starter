import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export default function SignUp() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <AuthForm mode="sign-up" />
      <p className="text-sm text-zinc-600">
        Have one already? <Link href="/sign-in" className="underline">Sign in</Link>
      </p>
    </div>
  )
}
