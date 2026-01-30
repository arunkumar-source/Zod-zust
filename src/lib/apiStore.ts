const BASE = "/api/works"

export const fetchWorks = async () => {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error("fetch failed")
  return res.json()
}

export const addWork = async (data: any) => {
  await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export const updateWork = async (id: string, data: any) => {
  await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export const deleteWork = async (id: string) => {
  await fetch(`${BASE}/${id}`, { method: "DELETE" })
}
