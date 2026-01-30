import { Hono } from "hono"
import { cors } from "hono/cors"

export type Status = "todo" | "inprogress" | "done"

export type Work = {
  id: string
  title: string
  status: Status
  createdAt: string
}

/* ---------- SERVER MEMORY ---------- */
let works: Work[] = []

const app = new Hono()

app.use("*", cors())

app.get("/", (c) => {
  return c.json(works)
})

app.post("/", async (c) => {
  const { title, status } = await c.req.json()
  const work: Work = {
    id: crypto.randomUUID(),
    title,
    status,
    createdAt: new Date().toISOString(),
  }
  works.push(work)
  return c.json(work, 201)
})

app.patch("/:id", async (c) => {
  const id = c.req.param("id")
  const updates = await c.req.json()

  const work = works.find((w) => w.id === id)
  if (!work) return c.notFound()

  Object.assign(work, updates)
  return c.json(work)
})

app.delete("/:id", (c) => {
  const id = c.req.param("id")
  works = works.filter((w) => w.id !== id)
  return c.body(null, 204)
})

export default app
