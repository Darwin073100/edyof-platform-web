import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface Establishment {
    establishmentId?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface State{
    establishment?: Establishment
    setEstablishment: (data: Establishment) => void;
    clearEstablishment:()=> void;
}

export const useEstablishmentStore = create<State>()(
    persist(
      (set) => ({
        establishment: undefined,
        setEstablishment: (data) => set({ establishment: data }),
        clearEstablishment: () => set({ establishment: undefined }),
      }),
      {
        name: 'establishment-storage', // clave que usará en localStorage
      }
    )
  );