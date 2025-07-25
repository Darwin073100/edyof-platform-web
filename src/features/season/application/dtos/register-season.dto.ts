export interface RegisterSeasonDTO{
    name: string,
    description: string | null,
    dateInit: Date |string |null,
    dateFinish: Date | string |null,
}