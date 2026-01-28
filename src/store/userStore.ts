import { create } from "zustand";
import {WorkSchema,type Work } from "@/../schema/schema";

interface userState{
    works:Work[];
    error:string | null;
    addWork: (work:Work) => void;
    removeWork: (id:number) => void;
    updateWork: (id:number, work:Work) => void;
    clearError: () => void;
}

export const userStoreState=create<userState>((set)=>({
    works:[],
    error:null,

    addWork:(data)=>{
        const result = WorkSchema.safeParse(data);
        if (!result.success) {
            set({ error: result.error.message });
            return;
        }
        set((state) => ({
            works: [...state.works, result.data],
            error: null,
        }));
    },
    
    removeWork:(id:number)=>{
        set((state) => ({
            works: state.works.filter((work) => work.id !== id),
        }));
    },

    updateWork:(id:number)=>{
        set((state) => ({
            works: state.works.map((work) => work.id === id ? {...work, checked: work.checked} : work),
        }));
    },
    clearError:()=>{
        set({error:null});
    }
}));

