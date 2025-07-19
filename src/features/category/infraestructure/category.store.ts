import { create } from "zustand";
import { CategoryEntity } from "../domain/entities/category.entity";


type State = {
    modalOpen: boolean;
    category: CategoryEntity | null;
    categories: CategoryEntity[];
    setCategory: (entity: CategoryEntity|null)=> void
    setModalOpen: (open: boolean) => void;
    setCategories: (categories: CategoryEntity[]) => void;
    addCategory: (category: CategoryEntity) => void;
}

export const useCategoryStore = create<State>()((set, get) => ({
    modalOpen: false,
    categories: [],
    category: null,
    setModalOpen: (open) => set(() => ({ modalOpen: open })),
    setCategories: (categories) => set(() => ({ categories })),
    addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
    })),
    setCategory: (category) => set(()=> ({
        category
    })),
}));