import { Elysia } from "elysia"
import { auth } from "./auth"

/**
 * Mounts Better Auth's handler (it serves /api/auth/*) and adds an `auth`
 * macro. A route with `{ auth: true }` answers 401 without a valid session and
 * otherwise receives `user` and `session` in its context, typed.
 */
export const authPlugin = new Elysia({ name: "auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const result = await auth.api.getSession({ headers })
        if (!result) return status(401, "Unauthorized")
        return { user: result.user, session: result.session }
      },
    },
  })
