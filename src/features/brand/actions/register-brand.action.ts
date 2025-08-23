'use server'
import { revalidatePath } from 'next/cache';
import { RegisterBrandDTO } from "../application/dtos/register-brand.dto";
import { RegisterBrandUseCase } from "../application/use-case/register-brand.use-case";
import { BrandRepositoryFactory } from '../infraestructure/factories/brand-repository.factory';

export async function registerBrandAction(dto: RegisterBrandDTO){
    const brandFetchRepositoryImpl = BrandRepositoryFactory.create();
    const registerBrandUseCase = new RegisterBrandUseCase(brandFetchRepositoryImpl);

    const result = await registerBrandUseCase.execute(dto);

    // Invalidar el caché de la página de productos para que se actualicen los datos
    if (result?.ok) {
        revalidatePath('/products');
    }
    
    return {
        ...result
    }
} 