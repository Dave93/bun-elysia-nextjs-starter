import { redirect } from "next/navigation"
import { Notes } from "@/components/notes"
import { SignOut } from "@/components/sign-out"
import { getSession } from "@/lib/session"

export const dynamic = "force-dynamic"

export default async function Dashboard() {
  const session = await getSession()
  if (!session) redirect("/sign-in")

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Hi, {session.user.name}</h1>
        <SignOut />
      </div>
      <Notes />
    </div>
  )
}
