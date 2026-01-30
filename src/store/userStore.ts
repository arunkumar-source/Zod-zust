import { create } from "zustand"
import type { Work } from "@/Schema/validateSchema"
import * as api from "@/lib/apiStore"

interface WorkState {
  works: Work[]
  loading: boolean

  loadWorks: () => Promise<void>
  addWork: (title: string, status: Work["status"]) => Promise<void>
  updateWork: (id: string, updates: Partial<Work>) => Promise<void>
  deleteWork: (id: string) => Promise<void>
}

export const useWorkState = create<WorkState>((set) => ({
  works: [],
  loading: false,

  loadWorks: async () => {
    set({ loading: true })
    try {
      const works = await api.fetchWorks()
      set({ works, loading: false })
    } catch (error) {
      console.error("Failed to load works:", error)
      set({ works: [], loading: false })
      throw error
    }
  },

  addWork: async (title, status) => {
    const work = await api.createWork({
      id: crypto.randomUUID(),
      title,
      status,
    })
    set((s) => ({ works: [...s.works, work] }))
  },

  updateWork: async (id, updates) => {
    const updated = await api.updateWork(id, updates)
    set((s) => ({
      works: s.works.map((w) => (w.id === id ? updated : w)),
    }))
  },

  deleteWork: async (id) => {
    await api.deleteWork(id)
    set((s) => ({
      works: s.works.filter((w) => w.id !== id),
    }))
  },
}))
