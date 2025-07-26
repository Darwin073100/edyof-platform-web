export interface RegisterSeasonDTO{
    name: string,
    description?: string | null,
    dateInit?: Date |null,
    dateFinish?: Date |null,
}