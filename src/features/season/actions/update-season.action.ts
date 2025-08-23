'use server'
import { UpdateSeasonDTO } from "../application/dtos/update-season.dto";
import { UpdateSeasonUseCase } from "../application/use-case/update-season.use-case";
import { SeasonFetchRepositoryImpl } from "../infraestructure/repositories/season-fetch-repository.impl";

export async function updateSeasonAction(dto: UpdateSeasonDTO){
    const seasonFetchRepositoryImpl = new SeasonFetchRepositoryImpl();
    const updateSeasonUseCase = new UpdateSeasonUseCase(seasonFetchRepositoryImpl);

    const result = await updateSeasonUseCase.execute(dto);

    return {
        ...result
    }
}