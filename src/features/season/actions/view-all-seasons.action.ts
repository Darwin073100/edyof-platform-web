'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { ViewAllSeasonsUseCase } from "../application/use-case/view-all-seasons.use-case";
import { SeasonFetchRepositoryImpl } from "../infraestructure/repositories/season-fetch-repository.impl";

export async function viewAllSeasonsAction(){
    noStore(); // Evitar que se cachée este server action
    
    const seasonFetchRepositoryImpl = new SeasonFetchRepositoryImpl();
    const viewAllSeasonsUseCase = new ViewAllSeasonsUseCase(seasonFetchRepositoryImpl);

    const result = await viewAllSeasonsUseCase.execute();

    return {
        ...result
    }
}