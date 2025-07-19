
import { create } from "zustand";
import { ProductEntity } from "../domain/entities/product.entity";

type State = {
    searchCharacter: string,
    // filterInventary: ProductEntity[]|[],
    products: ProductEntity[]|[],
    setProducts: (value: ProductEntity[])=> void,
    product: ProductEntity|null,
    openModal: boolean,
    setOpenModal: (value:boolean)=> void
};

export const useProductStore = create<State>()((set, get)=>({
    searchCharacter: "",
    product: null,
    products:[],
    setProducts(value) {
        set(()=> ({products: value}))
    },
    openModal: false,
    setOpenModal(value) {
        set(()=> ({openModal: value}))
    },
}));