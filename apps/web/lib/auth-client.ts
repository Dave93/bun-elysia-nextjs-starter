import { createAuthClient } from "better-auth/react"

// No baseURL: the browser calls /api/auth/* on its own origin, which Next.js
// rewrites to the API.
export const authClient = createAuthClient()
