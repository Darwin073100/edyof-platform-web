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
    updateSeason: (updatedSeason: SeasonEntity) => void;
    removeSeason: (seasonId: bigint) => void;
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
    })),
    updateSeason: (updatedSeason) => set((state) => ({
        seasons: state.seasons.map(season => 
            season.seasonId === updatedSeason.seasonId ? updatedSeason : season
        )
    })),
    removeSeason: (seasonId) => set((state) => ({
        seasons: state.seasons.filter(season => season.seasonId !== seasonId)
    }))
}));