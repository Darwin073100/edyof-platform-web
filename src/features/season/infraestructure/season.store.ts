import { create } from "zustand";
import { SeasonEntity } from "../domain/entities/season.entity";


type State = {
    modalOpen: boolean;
    seasons: SeasonEntity[];
    season: SeasonEntity | null;
    setSeason: (season: SeasonEntity|null)=>void;
    setModalOpen: (open: boolean) => void;
    setSeasons: (seasons: SeasonEntity[]) => void;
    addSeason: (season: SeasonEntity) => void;
}

export const useSeasonStore = create<State>()((set, get) => ({
    modalOpen: false,
    seasons: [],
    season: null,
    setSeason: (season)=> set(()=>({season})),
    setModalOpen: (open) => set(() => ({ modalOpen: open })),
    setSeasons: (seasons) => set(() => ({ seasons: seasons })),
    addSeason: (season) => set((state) => ({
        seasons: [...state.seasons, season]
    }))
}));