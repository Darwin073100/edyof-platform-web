'use server'
import { RegisterBrandDTO } from "../application/dtos/register-brand.dto";
import { RegisterBrandUseCase } from "../application/use-case/register-brand.use-case";
import { BrandFetchRepositoryImpl } from "../infraestructure/brand-fetch-repository.impl";

export async function registerBrandAction(dto: RegisterBrandDTO){
    const brandFetchRepositoryImpl = new BrandFetchRepositoryImpl();
    const registerBrandUseCase = new RegisterBrandUseCase(brandFetchRepositoryImpl);

    const result = await registerBrandUseCase.execute(dto);
    return {
        ...result
    }
} 