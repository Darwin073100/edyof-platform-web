import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CategoryEntity } from "../domain/entities/category.entity";


type State = {
    modalOpen: boolean;
    categories: CategoryEntity[];
    setModalOpen: (open: boolean) => void;
    setCategories: (categories: CategoryEntity[]) => void;
    addCategory: (category: CategoryEntity) => void;
}

export const useCategoryStore = create<State>()((set, get) => ({
    modalOpen: false,
    categories: [],
    setModalOpen: (open) => set(() => ({ modalOpen: open })),
    setCategories: (categories) => set(() => ({ categories })),
    addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
    }))
}));