export interface UpdateSeasonDTO{
    seasonId: bigint;
    name: string,
    description?: string | null,
    dateInit?: Date |null,
    dateFinish?: Date |null,
}