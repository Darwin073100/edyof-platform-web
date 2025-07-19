import { create } from "zustand";
import { InventoryItemEntity } from "../domain/entities/inventory.entity";
import { useEffect } from "react";

type State = {
    searchCharacter: string,
    // filterInventary: InventoryItemEntity[]|[],
    items: InventoryItemEntity[]|[],
    setItems: (value: InventoryItemEntity[])=> void,
    item: InventoryItemEntity|null,
    openModal: boolean,
    setOpenModal: (value:boolean)=> void
};

export const useInventoryItemStore = create<State>()((set, get)=>({
    searchCharacter: "",
    item: null,
    items:[],
    setItems(value) {
        set(()=> ({items: value}))
    },
    openModal: false,
    setOpenModal(value) {
        set(()=> ({openModal: value}))
    },
}));