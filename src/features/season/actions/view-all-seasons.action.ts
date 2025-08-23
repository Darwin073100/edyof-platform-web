'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { ViewAllSeasonsUseCase } from "../application/use-case/view-all-seasons.use-case";
import { SeasonRepositoryFactory } from '../infraestructure/factories/season-repository.factory';

export async function viewAllSeasonsAction(){
    noStore(); // Evitar que se cachée este server action
    
    const seasonFetchRepositoryImpl = SeasonRepositoryFactory.create();
    const viewAllSeasonsUseCase = new ViewAllSeasonsUseCase(seasonFetchRepositoryImpl);

    const result = await viewAllSeasonsUseCase.execute();

    return {
        ...result
    }
}