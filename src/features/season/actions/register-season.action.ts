'use server'
import { revalidatePath } from 'next/cache';
import { RegisterSeasonDTO } from "../application/dtos/register-season.dto";
import { RegisterSeasonUseCase } from "../application/use-case/register-season.use-case";
import { SeasonRepositoryFactory } from '../infraestructure/factories/season-repository.factory';

export async function registerSeasonAction(dto: RegisterSeasonDTO){
    const seasonFetchRepositoryImpl = SeasonRepositoryFactory.create();
    const registerSeasonUseCase = new RegisterSeasonUseCase(seasonFetchRepositoryImpl);

    const result = await registerSeasonUseCase.execute(dto);
    
    // Invalidar el caché de la página de productos para que se actualicen los datos
    if (result?.ok) {
        revalidatePath('/products');
    }
    
    return {
        ...result
    }
}