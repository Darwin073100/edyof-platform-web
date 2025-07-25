'use server'
import { RegisterSeasonDTO } from "../application/dtos/register-season.dto";
import { RegisterSeasonUseCase } from "../application/use-case/register-season.use-case";
import { SeasonFetchRepositoryImpl } from "../infraestructure/season-fetch-repository.impl";

export async function registerSeasonAction(dto: RegisterSeasonDTO){
    const seasonFetchRepositoryImpl = new SeasonFetchRepositoryImpl();
    const registerSeasonUseCase = new RegisterSeasonUseCase(seasonFetchRepositoryImpl);

    const result = await registerSeasonUseCase.execute(dto);
    
    return {
        ...result
    }
}