import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Work } from "@/Schema/validateSchema"
import { fetchWorks, addWork, updateWork, deleteWork } from "@/lib/api"

interface WorkState {
  works: Work[]
  loading: boolean
  error: string | null

  loadWorks: () => Promise<void>
  addWork: (title: string, status: Work["status"]) => Promise<void>
  updateWork: (id: string, updates: Partial<Work>) => Promise<void>
  deleteWork: (id: string) => Promise<void>
}

export const useWorkStore = create<WorkState>()(
  persist(
    (set, get) => ({
      works: [],
      loading: false,
      error: null,

      loadWorks: async () => {
        set({ loading: true, error: null })
        try {
          const works = await fetchWorks()

          const currentWorks = get().works
          if (works.length === 0 && currentWorks.length > 0) {
            console.log('Server returned empty data, keeping local data')
            set({ loading: false })
            return
          }
          set({ works, loading: false })
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Failed to load works', loading: false })
        }
      },

      addWork: async (title, status) => {
        const work = await addWork({
          title,
          status,
        })
        set((s) => ({ works: [...s.works, work] }))
      },

      updateWork: async (id, updates) => {
        const updated = await updateWork(id, updates)
        set((s) => ({
          works: s.works.map((w) => (w.id === id ? updated : w)),
        }))
      },

      deleteWork: async (id) => {
        await deleteWork(id)
        set((s) => ({
          works: s.works.filter((w) => w.id !== id),
        }))
      },
    }),
    {
      name: 'workdash-storage', // localStorage key
      partialize: (state: WorkState): { works: Work[] } => ({ works: state.works }), 
    }
  )
)
