// api/works.ts
import { Hono } from "hono"

type Work = {
  id: string
  title: string
  status: "todo" | "inprogress" | "done"
}

const works: Work[] = [] // ⚠️ in-memory (resets on redeploy)

const app = new Hono()

app.get("/", (c) => c.json(works))

app.post("/", async (c) => {
  const body = await c.req.json()
  works.push(body)
  return c.json(body, 201)
})

app.put("/:id", async (c) => {
  const id = c.req.param("id")
  const body = await c.req.json()
  const index = works.findIndex(w => w.id === id)
  if (index !== -1) works[index] = { ...works[index], ...body }
  return c.json(works[index])
})

app.delete("/:id", (c) => {
  const id = c.req.param("id")
  const index = works.findIndex(w => w.id === id)
  if (index !== -1) works.splice(index, 1)
  return c.json({ ok: true })
})

export default app
