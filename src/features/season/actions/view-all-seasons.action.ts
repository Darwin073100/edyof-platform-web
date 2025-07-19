'use server'
import { ViewAllSeasonsUseCase } from "../application/use-case/view-all-seasons.use-case";
import { SeasonFetchRepositoryImpl } from "../infraestructure/season-fetch-repository.impl";

export async function viewAllSeasonsAction(){
    const seasonFetchRepositoryImpl = new SeasonFetchRepositoryImpl();
    const viewAllSeasonsUseCase = new ViewAllSeasonsUseCase(seasonFetchRepositoryImpl);

    const result = await viewAllSeasonsUseCase.execute();

    return {
        ...result
    }
}