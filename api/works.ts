import { Hono } from "hono"

type Work = {
  id: string
  title: string
  status: "todo" | "inprogress" | "done"
  createdAt: string
}

// ⚠️ In-memory (resets on reload — OK for now)
const works: Work[] = []

const app = new Hono()

app.get("/api/works", (c) => {
  return c.json(works)
})

app.post("/api/works", async (c) => {
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

app.put("/api/works/:id", async (c) => {
  const id = c.req.param("id")
  const body = await c.req.json()

  const index = works.findIndex(w => w.id === id)
  if (index === -1) return c.notFound()

  works[index] = { ...works[index], ...body }
  return c.json(works[index])
})

app.delete("/api/works/:id", (c) => {
  const id = c.req.param("id")
  const index = works.findIndex(w => w.id === id)

  if (index === -1) return c.notFound()

  works.splice(index, 1)
  return c.json({ ok: true })
})

export default app
