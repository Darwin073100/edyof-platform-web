'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { ViewAllBrandsUseCase } from "../application/use-case/view-all-brands.use-case";
import { BrandRepositoryFactory } from '../infraestructure/factories/brand-repository.factory';

export async function viewAllBrandsAction(){
    noStore(); // Evitar que se cachée este server action
    
    const brandFetchRepositoryImpl = BrandRepositoryFactory.create();
    const viewAllBrandsUseCase = new ViewAllBrandsUseCase(brandFetchRepositoryImpl);

    const result = await viewAllBrandsUseCase.execute();
    
    return {
        ...result
    }
}