import { create } from "zustand";
import { type Work } from "@/Schema/validateSchema";
import { storage } from "@/lib/storage ";

interface WorkState {
    works: Work[],
    addwork: (title: string, status: Work["status"]) => void,
    updatework: (id: string, updates: Partial<Work>) => void,
    deletework: (id: string) => void
}
export const useWorkState = create<WorkState>((set) => ({
    works: storage.get(),
    addwork: (title: string, status: Work["status"]) => {
        set((state) => {
            let ids = crypto.randomUUID()
            const newWork: Work = {
                id: ids,
                title,
                status,
                createdAt: new Date().toISOString()
            }
            const update = [...state.works, newWork]
            storage.set(update)
            return { works: update }
        })
    },
    updatework: (id: string, updates: Partial<Work>) => {
        set((state) => {
            const update = state.works.map(w => w.id === id ? { ...w, ...updates } : w)
            storage.set(update)
            return { works: update }
        })
    },
    deletework: (id: string) => {
        set((state) => {
            const update = state.works.filter(w => w.id !== id)
            storage.set(update)
            return { works: update }
        })
    }

}))




