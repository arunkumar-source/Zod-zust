import { create } from "zustand";
import { WorkSchema, type Work } from "@/../schema/schema";

interface userState {
    works: Work[];
    error: string | null;
    addWork: (task: Omit<Work, "id">) => void;
    updateWork: (id: number, updates: Partial<Omit<Work, "id">>) => void,
    removeWork: (id: number) => void

}

export const userStore = create<userState>((set, get) => ({
    works: [],
    error: null,
    
    addWork: (taskInput: Omit<Work, "id">) => {
        const parse = WorkSchema.omit({ id: true }).safeParse(taskInput);
        if(!parse.success){
            set({error:parse.error.message})
            return;
        }
        const lastId = get().works.length > 0 ? get().works[get().works.length - 1].id : 0;
        const newWork: Work = { ...parse.data, id: lastId + 1 };

        set((state) => ({
            works: [...state.works, newWork],
            error:null
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