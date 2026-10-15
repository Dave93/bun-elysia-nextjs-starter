import { Elysia, t } from "elysia"
import { and, desc, eq } from "drizzle-orm"
import { db, schema } from "@starter/db"
import { authPlugin } from "../../auth-plugin"

const { notes } = schema

export const notesModule = new Elysia({ prefix: "/api/notes" })
  .use(authPlugin)
  .get(
    "/",
    ({ user }) =>
      db.select().from(notes).where(eq(notes.userId, user.id)).orderBy(desc(notes.createdAt)),
    { auth: true },
  )
  .post(
    "/",
    async ({ user, body, status }) => {
      const [note] = await db
        .insert(notes)
        .values({ userId: user.id, title: body.title, body: body.body ?? "" })
        .returning()
      return status(201, note!)
    },
    {
      auth: true,
      body: t.Object({
        title: t.String({ minLength: 1, maxLength: 200 }),
        body: t.Optional(t.String({ maxLength: 5000 })),
      }),
    },
  )
  .delete(
    "/:id",
    async ({ user, params, status }) => {
      // Scoped by owner: another user's id deletes nothing and reads as 404.
      const deleted = await db
        .delete(notes)
        .where(and(eq(notes.id, params.id), eq(notes.userId, user.id)))
        .returning({ id: notes.id })
      if (deleted.length === 0) return status(404, "Not found")
      return { id: deleted[0]!.id }
    },
    { auth: true, params: t.Object({ id: t.String() }) },
  )
