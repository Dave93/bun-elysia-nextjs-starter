import { treaty } from "@elysiajs/eden"
import type { App } from "@starter/api"

// Typed client for the Elysia API: routes, bodies and responses come from the
// API's own definitions. Browser-only — it uses the page's origin.
export const api = treaty<App>(typeof window === "undefined" ? "http://localhost:3000" : window.location.origin)
