import { app } from "./app"

const port = Number(process.env.API_PORT ?? 3001)
app.listen(port)
console.log(`API on http://localhost:${port} — docs at /api/docs`)
