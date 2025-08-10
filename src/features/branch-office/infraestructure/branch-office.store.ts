import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BranchOfficeEntity } from '../domain/entities/branch-office.entity';

interface State{
    branchOffice?: BranchOfficeEntity
    setBranchOffice: (data: BranchOfficeEntity) => void;
    clearBranchOffice:()=> void;
}

export const useBranchOfficeStore = create<State>()(
    persist(
      (set) => ({
        branchOffice: undefined,
        setBranchOffice: (data) => set({ branchOffice: data }),
        clearBranchOffice: () => set({ branchOffice: undefined }),
      }),
      {
        name: 'branch-office-storage', // clave que usará en localStorage
      }
    )
  );