import { Elysia } from "elysia"
import { openapi } from "@elysiajs/openapi"
import { authPlugin } from "./auth-plugin"
import { notesModule } from "./modules/notes"

export const app = new Elysia()
  .use(openapi({ path: "/api/docs" }))
  .use(authPlugin)
  .get("/api/health", () => ({ ok: true }))
  .use(notesModule)

// Imported as a type by apps/web for the Eden client.
export type App = typeof app
