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
    updateBrand: (brand: BrandEntity) => void;
    removeBrand: (brandId: string) => void;
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
    })),
    updateBrand: (updatedBrand) => set((state) => ({
        brands: state.brands.map(brand => 
            brand.brandId === updatedBrand.brandId ? updatedBrand : brand
        )
    })),
    removeBrand: (brandId) => set((state) => ({
        brands: state.brands.filter(brand => brand.brandId !== brandId)
    }))
}));