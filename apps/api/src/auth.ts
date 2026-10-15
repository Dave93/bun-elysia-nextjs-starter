import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db, schema } from "@starter/db"

const webOrigin = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  // The browser reaches the API through the Next.js rewrite, so the public
  // origin of /api/auth/* is the web app's origin, not the API's port.
  baseURL: webOrigin,
  trustedOrigins: [webOrigin],
  emailAndPassword: { enabled: true },
})
