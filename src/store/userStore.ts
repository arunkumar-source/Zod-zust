import { create } from "zustand"

export type Work = {
  id: string
  title: string
  status: "todo" | "inprogress" | "done"
  createdAt: string
}

type WorkState = {
  works: Work[]
  loading: boolean
  error: string | null

  loadWorks: () => Promise<void>
  addWork: (data: Omit<Work, "id" | "createdAt">) => Promise<void>
  updateWork: (id: string, data: Partial<Work>) => Promise<void>
  deleteWork: (id: string) => Promise<void>
}

const BASE = "/api/works"

export const useWorkState = create<WorkState>((set) => ({
  works: [],
  loading: false,
  error: null,

  loadWorks: async () => {
    set({ loading: true })
    try {
      const res = await fetch(BASE)
      if (!res.ok) throw new Error("Fetch failed")
      const data = await res.json()
      set({ works: data, loading: false })
    } catch {
      set({ error: "Failed to load data", loading: false })
    }
  },

  addWork: async (data) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const work = await res.json()
    set((s) => ({ works: [...s.works, work] }))
  },

  updateWork: async (id, data) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const updated = await res.json()
    set((s) => ({
      works: s.works.map(w => w.id === id ? updated : w),
    }))
  },

  deleteWork: async (id) => {
    await fetch(`${BASE}/${id}`, { method: "DELETE" })
    set((s) => ({
      works: s.works.filter(w => w.id !== id),
    }))
  },
}))
