const API = "/api/works"

export const fetchWorks = async () => {
  const res = await fetch(API)
  return res.json()
}

export const addWork = async (work: any) => {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(work),
  })
}

export const updateWork = async (id: string, data: any) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export const deleteWork = async (id: string) => {
  await fetch(`${API}/${id}`, { method: "DELETE" })
}
