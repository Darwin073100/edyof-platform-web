'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { ViewAllBrandsUseCase } from "../application/use-case/view-all-brands.use-case";
import { BrandFetchRepositoryImpl } from "../infraestructure/brand-fetch-repository.impl";

export async function viewAllBrandsAction(){
    noStore(); // Evitar que se cachée este server action
    
    const brandFetchRepositoryImpl = new BrandFetchRepositoryImpl();
    const viewAllBrandsUseCase = new ViewAllBrandsUseCase(brandFetchRepositoryImpl);

    const result = await viewAllBrandsUseCase.execute();
    
    return {
        ...result
    }
}