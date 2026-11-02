import { treaty } from "@elysiajs/eden"
import type { App } from "@starter/api"

// Typed client for the Elysia API: routes, bodies and responses come from the
// API's own definitions. Call it from client components: in the browser it
// uses the page's origin, and the localhost fallback only lets the module load
// during server rendering.
export const api = treaty<App>(typeof window === "undefined" ? "http://localhost:3000" : window.location.origin)
