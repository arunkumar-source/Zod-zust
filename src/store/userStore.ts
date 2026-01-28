import { create } from "zustand";
import { WorkSchema, type Work } from "@/../schema/schema";

interface userState {
    works: Work[];
    error: string | null;
    isSuccess:string|null;
    addWork: (task: Omit<Work, "id">) => void;
    updateWork: (id: number, updates: Partial<Omit<Work, "id">>) => void,
    removeWork: (id: number) => void

}

const checkStoredWorks = (): Work[] => {
    try { 
        const isStored=localStorage.getItem('works')
        return isStored? JSON.parse(isStored):[];;
    } catch { return []; }
    return [];
}

export const userStore = create<userState>((set, get) => ({
    works: checkStoredWorks(),
    error: null,
    isSuccess: null,

    addWork: (taskInput: Omit<Work, "id">) => {
        const parse = WorkSchema.omit({ id: true }).safeParse(taskInput);
        if (!parse.success) {
            set({ error: parse.error.message })
            return;
        }
        const lastId = get().works.length > 0 ? get().works[get().works.length - 1].id : 0;
        const newWork: Work = { ...parse.data, id: lastId + 1 };

        set((state) => ({
            works: [...state.works, newWork],
            error: null,
            isSuccess:"Works have ben stored"
        }));
    },

    updateWork: (id: number, updates: Partial<Omit<Work, "id">>) => {
        const updatedWorks = get().works.map((task) =>
            task.id === id ? { ...task, ...updates } : task
        );
        set({ works: updatedWorks });
    },

    removeWork: (id: number) => {
        set((state) => ({
            works: state.works.filter(task => task.id !== id)
        }));
    }
}));