import { create } from "zustand";
import { BrandEntity } from "../domain/entities/brand.entity";


type State = {
    modalOpen: boolean;
    brands: BrandEntity[];
    brand: BrandEntity| null;
    setBrand: (brand: BrandEntity|null) => void;
    setModalOpen: (open: boolean) => void;
    setBrands: (brands: BrandEntity[]) => void;
    addBrand: (brand: BrandEntity) => void;
}

export const useBrandStore = create<State>()((set, get) => ({
    modalOpen: false,
    brands: [],
    brand: null,
    setBrand:(brand)=> set(()=>({brand})),
    setModalOpen: (open) => set(() => ({ modalOpen: open })),
    setBrands: (brands) => set(() => ({ brands })),
    addBrand: (brand) => set((state) => ({
        brands: [...state.brands, brand]
    }))
}));