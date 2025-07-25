
import { create } from "zustand";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductWithLotInventoryItemDTO } from "../../application/dtos/product-with-lot-inventory-item.dto";

type State = {
    searchCharacter: string,
    setSearchCharacter: (value: string) => void,
    products: ProductWithLotInventoryItemDTO[]|[],
    productsFiltered: ProductWithLotInventoryItemDTO[]|[],
    setProducts: (value: ProductWithLotInventoryItemDTO[])=> void,
    setProductsFiltered: (value: ProductWithLotInventoryItemDTO[])=> void,
    product: ProductEntity|null,
    setProduct: (product: ProductEntity|null)=> void,
    openModal: boolean,
    setOpenModal: (value:boolean)=> void
};

export const useProductStore = create<State>()((set, get)=>({
    searchCharacter: "",
    setSearchCharacter: (value) => set(() => ({ searchCharacter: value })),
    product: null,
    products:[],
    productsFiltered:[],
    setProducts(value) {
        set(()=> ({products: value}))
    },
    setProductsFiltered(value) {
        set(()=> ({productsFiltered: value}))
    },
    setProduct: (product)=> set(()=> ({product})),
    openModal: false,
    setOpenModal(value) {
        set(()=> ({openModal: value}))
    },
}));