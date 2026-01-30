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

export const useWorkState = create((set) => ({
  works: [],

  loadWorks: async () => {
    const data = await api.fetchWorks()
    set({ works: data })
  },

  addWork: async (title: string, status: Work["status"]) => {
    await api.addWork({ title, status })
    const data = await api.fetchWorks()
    set({ works: data })
  },

  updateWork: async (id: string, data: Partial<Work>) => {
    await api.updateWork(id, data)
    const works = await api.fetchWorks()
    set({ works })
  },

  removeWork: async (id: string) => {
    await api.deleteWork(id)
    const works = await api.fetchWorks()
    set({ works })
  }
}))
