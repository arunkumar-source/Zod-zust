const BASE_URL = "/api/works"

export async function fetchWorks() {
  const res = await fetch(BASE_URL)
  return res.json()
}

export async function addWork(data: { title: string; status: string }) {
  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export async function updateWork(id: string, data: any) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export async function deleteWork(id: string) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
}
