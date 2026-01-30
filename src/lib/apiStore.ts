import type { Work } from "@/Schema/validateSchema"

const BASE_URL = "/api/works"

export async function fetchWorks(): Promise<Work[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch works: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function createWork(work: Pick<Work, "id" | "title" | "status">) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(work),
  })
  return res.json()
}

export async function updateWork(
  id: string,
  updates: Partial<Work>
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
  return res.json()
}

export async function deleteWork(id: string) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
}
