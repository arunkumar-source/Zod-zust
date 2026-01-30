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
    const data = await api.fetchWorks()
    set({ works: data, loading: false })
  },

  addWork: async (title, status) => {
    set({ loading: true })
    await api.addWork({ title, status })
    const data = await api.fetchWorks()
    set({ works: data, loading: false })
  },

  updateWork: async (id, updates) => {
    await api.updateWork(id, updates)
    const works = await api.fetchWorks()
    set({ works })
  },

  deleteWork: async (id) => {
    await api.deleteWork(id)
    const works = await api.fetchWorks()
    set({ works })
  }
}))
