const BASE = import.meta.env.PROD ? "/api/works" : "http://localhost:3001"

export const fetchWorks = async () => {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error("fetch failed")
  return res.json()
}

export const addWork = async (data: {
  title: string
  status: string
}) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("add failed")
  return res.json()
}

export const updateWork = async (id: string, data: any) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("update failed")
  return res.json()
}

export const deleteWork = async (id: string) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("delete failed")
}
