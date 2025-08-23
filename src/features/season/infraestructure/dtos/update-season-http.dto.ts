export interface UpdateSeasonHttpDTO{
    seasonId: string;
    name: string;
    description?: string | null;
    dateInit?: string |null;
    dateFinish?: string |null;
}